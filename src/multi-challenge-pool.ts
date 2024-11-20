import { BigInt } from "@graphprotocol/graph-ts";
import {
  CancelChallengePool as CancelChallengePoolEvent,
  ClosedChallengePool as ClosedChallengePoolEvent,
  JoinChallengePool as JoinChallengePoolEvent,
  ManualChallengePool as ManualChallengePoolEvent,
  NewChallengePool as NewChallengePoolEvent,
  StaleChallengePool as StaleChallengePoolEvent,
  WinningsWithdrawn as WinningsWithdrawnEvent,
} from "../generated/MultiChallengePool/MultiChallengePool";
import {
  MultiChallengeOption,
  MultiChallengeParticipant,
  MultiChallengePool,
  MultiWinningsWithdrawn,
} from "../generated/schema";
import { saveOptions, stateStr } from "./helpers";

export function handleNewChallengePool(event: NewChallengePoolEvent): void {
  const challenge = new MultiChallengePool(event.params.challengeId.toString());
  challenge.challengeId = event.params.challengeId;
  challenge.baller = event.params.creator;
  challenge.createdAt = event.params.createdAt;
  challenge.maturity = event.params.maturity;
  challenge.result = event.params.result;
  challenge.pollParam = event.params.poll.pollParam;
  challenge.pollTopic = event.params.poll.topicId;
  challenge.stake = event.params.stake;
  challenge.fee = event.params.fee;
  challenge.totalParticipants = event.params.totalParticipants;
  challenge.totalTickets = event.params.totalTickets;
  challenge.nextCloseTime = event.params.maturity;
  challenge.staleRetries = BigInt.fromI32(0);
  challenge.state = "open";
  challenge.blockNumber = event.block.number;
  challenge.blockTimestamp = event.block.timestamp;
  challenge.transactionHash = event.transaction.hash;

  challenge.save();

  saveOptions(event.params.challengeId, event.params.poll.options);

  const participant = new MultiChallengeParticipant(
    event.params.challengeId
      .toString()
      .concat("_")
      .concat(event.params.creator.toHexString())
  );

  participant.challenge = challenge.id;
  participant.baller = challenge.baller;
  participant.stake = event.params.totalTickets.times(challenge.stake);
  participant.fee = event.params.fee;
  participant.prediction = event.params.result;
  participant.blockNumber = event.block.number;
  participant.blockTimestamp = event.block.timestamp;
  participant.transactionHash = event.transaction.hash;
  participant.save();
}

export function handleJoinChallengePool(event: JoinChallengePoolEvent): void {
  const challenge = MultiChallengePool.load(
    event.params.challengeId.toString()
  );
  if (!challenge) {
    return;
  }
  challenge.save();

  const participant = new MultiChallengeParticipant(
    event.params.challengeId
      .toString()
      .concat("_")
      .concat(event.params.participant.toHexString())
  );

  participant.challenge = challenge.id;
  participant.baller = event.params.participant;
  participant.stake = event.params.ticketQuantity.times(challenge.stake);

  participant.fee = event.params.fee;
  participant.prediction = event.params.choice;

  participant.blockNumber = event.block.number;
  participant.blockTimestamp = event.block.timestamp;
  participant.transactionHash = event.transaction.hash;
  participant.save();

  const optionId = challenge.id
    .toString()
    .concat("_")
    .concat(event.params.choice.toString());

  const option = MultiChallengeOption.load(optionId);
  if (option) {
    option.total = option.total.plus(event.params.ticketQuantity);
    option.save();
  }
}

export function handleCancelChallengePool(
  event: CancelChallengePoolEvent
): void {
  const challenge = MultiChallengePool.load(
    event.params.challengeId.toString()
  );
  if (!challenge) {
    return;
  }
  challenge.state = stateStr(event.params.state);

  challenge.save();
}

export function handleClosedChallengePool(
  event: ClosedChallengePoolEvent
): void {
  const challenge = MultiChallengePool.load(
    event.params.challengeId.toString()
  );
  if (!challenge) {
    return;
  }
  challenge.state = stateStr(event.params.state);
  challenge.result = event.params.result;

  challenge.save();
}

export function handleManualChallengePool(
  event: ManualChallengePoolEvent
): void {
  const challenge = MultiChallengePool.load(
    event.params.challengeId.toString()
  );
  if (!challenge) {
    return;
  }
  challenge.state = stateStr(event.params.state);

  challenge.save();
}

export function handleStaleChallengePool(event: StaleChallengePoolEvent): void {
  const challenge = MultiChallengePool.load(
    event.params.challengeId.toString()
  );
  if (!challenge) {
    return;
  }
  challenge.state = stateStr(event.params.state);
  challenge.nextCloseTime = event.params.nextCloseTime;
  challenge.staleRetries = event.params.staleRetries;

  challenge.save();
}

export function handleWinningsWithdrawn(event: WinningsWithdrawnEvent): void {
  let entity = new MultiWinningsWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString()
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
