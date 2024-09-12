import { BigInt } from "@graphprotocol/graph-ts";
import {
  CancelChallengePool as CancelChallengePoolEvent,
  ClosedChallengePool as ClosedChallengePoolEvent,
  JoinChallengePool as JoinChallengePoolEvent,
  ManualChallengePool as ManualChallengePoolEvent,
  NewChallengePool as NewChallengePoolEvent,
  StaleChallengePool as StaleChallengePoolEvent,
  WinningsWithdrawn as WinningsWithdrawnEvent,
} from "../generated/ChallengePool/ChallengePool";
import {
  ChallengeParticipant,
  ChallengePool,
  ChallengeStateUpdate,
  WinningsWithdrawn,
} from "../generated/schema";
import { predictionStr, saveEvents, stateStr } from "./helpers";

export function handleNewChallengePool(event: NewChallengePoolEvent): void {
  const challenge = new ChallengePool(event.params.challengeId.toString());
  challenge.challengeId = event.params.challengeId;
  challenge.baller = event.params.creator;
  challenge.createdAt = event.params.createdAt;
  challenge.maturity = event.params.maturity;
  challenge.result = predictionStr(event.params.result);
  challenge.stake = event.params.stake;
  challenge.fee = event.params.fee;
  challenge.yesParticipants = event.params.yesParticipants;
  challenge.noParticipants = event.params.noParticipants;
  challenge.nextCloseTime = event.params.maturity;
  challenge.staleRetries = BigInt.fromI32(0);
  challenge.state = "open";
  challenge.blockNumber = event.block.number;
  challenge.blockTimestamp = event.block.timestamp;
  challenge.transactionHash = event.transaction.hash;

  challenge.save();

  saveEvents(event.params.challengeId, event.params.events);

  const participant = new ChallengeParticipant(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  participant.challenge = challenge.id;
  participant.baller = challenge.baller;
  participant.stake = challenge.stake;
  if (event.params.yesParticipants.gt(BigInt.fromI32(0))) {
    participant.prediction = "yes";
  } else {
    participant.prediction = "no";
  }
  participant.fee = event.params.fee;

  participant.blockNumber = event.block.number;
  participant.blockTimestamp = event.block.timestamp;
  participant.transactionHash = event.transaction.hash;
  participant.save();

  const stateUpdate = new ChallengeStateUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  stateUpdate.challenge = challenge.id;
  stateUpdate.baller = challenge.baller;
  stateUpdate.state = challenge.state;

  stateUpdate.blockNumber = event.block.number;
  stateUpdate.blockTimestamp = event.block.timestamp;
  stateUpdate.transactionHash = event.transaction.hash;
  stateUpdate.save();
}

export function handleJoinChallengePool(event: JoinChallengePoolEvent): void {
  const challenge = ChallengePool.load(event.params.challengeId.toString());
  if (!challenge) {
    return;
  }
  let prediction = "no";
  if (event.params.yesParticipants.gt(challenge.yesParticipants)) {
    prediction = "yes";
  }
  challenge.yesParticipants = event.params.yesParticipants;
  challenge.noParticipants = event.params.noParticipants;
  challenge.save();

  const participant = new ChallengeParticipant(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  participant.challenge = challenge.id;
  participant.baller = event.params.participant;
  participant.stake = event.params.stake;
  participant.prediction = prediction;
  participant.fee = event.params.fee;

  participant.blockNumber = event.block.number;
  participant.blockTimestamp = event.block.timestamp;
  participant.transactionHash = event.transaction.hash;
  participant.save();
}

export function handleCancelChallengePool(
  event: CancelChallengePoolEvent
): void {
  const challenge = ChallengePool.load(event.params.challengeId.toString());
  if (!challenge) {
    return;
  }
  challenge.state = stateStr(event.params.state);

  challenge.save();

  const stateUpdate = new ChallengeStateUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  stateUpdate.challenge = challenge.id;
  stateUpdate.baller = event.params.canceller;
  stateUpdate.state = stateStr(event.params.state);

  stateUpdate.blockNumber = event.block.number;
  stateUpdate.blockTimestamp = event.block.timestamp;
  stateUpdate.transactionHash = event.transaction.hash;
  stateUpdate.save();
}

export function handleClosedChallengePool(
  event: ClosedChallengePoolEvent
): void {
  const challenge = ChallengePool.load(event.params.challengeId.toString());
  if (!challenge) {
    return;
  }
  challenge.state = stateStr(event.params.state);
  challenge.result = predictionStr(event.params.result);

  challenge.save();

  const stateUpdate = new ChallengeStateUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  stateUpdate.challenge = challenge.id;
  stateUpdate.baller = event.params.closer;
  stateUpdate.state = stateStr(event.params.state);

  stateUpdate.blockNumber = event.block.number;
  stateUpdate.blockTimestamp = event.block.timestamp;
  stateUpdate.transactionHash = event.transaction.hash;
  stateUpdate.save();
}

export function handleManualChallengePool(
  event: ManualChallengePoolEvent
): void {
  const challenge = ChallengePool.load(event.params.challengeId.toString());
  if (!challenge) {
    return;
  }
  challenge.state = stateStr(event.params.state);

  challenge.save();

  const stateUpdate = new ChallengeStateUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  stateUpdate.challenge = challenge.id;
  stateUpdate.baller = event.params.closer;
  stateUpdate.state = stateStr(event.params.state);

  stateUpdate.blockNumber = event.block.number;
  stateUpdate.blockTimestamp = event.block.timestamp;
  stateUpdate.transactionHash = event.transaction.hash;
  stateUpdate.save();
}

export function handleStaleChallengePool(event: StaleChallengePoolEvent): void {
  const challenge = ChallengePool.load(event.params.challengeId.toString());
  if (!challenge) {
    return;
  }
  challenge.state = stateStr(event.params.state);
  challenge.nextCloseTime = event.params.nextCloseTime;
  challenge.staleRetries = event.params.staleRetries;

  challenge.save();

  const stateUpdate = new ChallengeStateUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  stateUpdate.challenge = challenge.id;
  stateUpdate.baller = event.params.closer;
  stateUpdate.state = stateStr(event.params.state);

  stateUpdate.blockNumber = event.block.number;
  stateUpdate.blockTimestamp = event.block.timestamp;
  stateUpdate.transactionHash = event.transaction.hash;
  stateUpdate.save();
}

export function handleWinningsWithdrawn(event: WinningsWithdrawnEvent): void {
  let entity = new WinningsWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.baller = event.params.participant;
  entity.challenge = event.params.challengeId.toString();
  entity.amountWithdrawn = event.params.amountWithdrawn;
  entity.amountWon = event.params.amountWon;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
