import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  CancelChallengePool,
  ClosedChallengePool,
  JoinChallengePool,
  ManualChallengePool,
  NewChallengePool,
  OwnershipTransferred,
  StakeTokenAdded,
  StaleChallengePool,
  WinningsWithdrawn
} from "../generated/ChallengePool/ChallengePool"

export function createCancelChallengePoolEvent(
  challengeId: BigInt,
  canceller: Address,
  state: i32
): CancelChallengePool {
  let cancelChallengePoolEvent = changetype<CancelChallengePool>(newMockEvent())

  cancelChallengePoolEvent.parameters = new Array()

  cancelChallengePoolEvent.parameters.push(
    new ethereum.EventParam(
      "challengeId",
      ethereum.Value.fromUnsignedBigInt(challengeId)
    )
  )
  cancelChallengePoolEvent.parameters.push(
    new ethereum.EventParam("canceller", ethereum.Value.fromAddress(canceller))
  )
  cancelChallengePoolEvent.parameters.push(
    new ethereum.EventParam(
      "state",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(state))
    )
  )

  return cancelChallengePoolEvent
}

export function createClosedChallengePoolEvent(
  challengeId: BigInt,
  closer: Address,
  state: i32,
  result: i32
): ClosedChallengePool {
  let closedChallengePoolEvent = changetype<ClosedChallengePool>(newMockEvent())

  closedChallengePoolEvent.parameters = new Array()

  closedChallengePoolEvent.parameters.push(
    new ethereum.EventParam(
      "challengeId",
      ethereum.Value.fromUnsignedBigInt(challengeId)
    )
  )
  closedChallengePoolEvent.parameters.push(
    new ethereum.EventParam("closer", ethereum.Value.fromAddress(closer))
  )
  closedChallengePoolEvent.parameters.push(
    new ethereum.EventParam(
      "state",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(state))
    )
  )
  closedChallengePoolEvent.parameters.push(
    new ethereum.EventParam(
      "result",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(result))
    )
  )

  return closedChallengePoolEvent
}

export function createJoinChallengePoolEvent(
  challengeId: BigInt,
  participant: Address,
  stake: BigInt,
  fee: BigInt,
  yesParticipants: BigInt,
  noParticipants: BigInt,
  state: i32
): JoinChallengePool {
  let joinChallengePoolEvent = changetype<JoinChallengePool>(newMockEvent())

  joinChallengePoolEvent.parameters = new Array()

  joinChallengePoolEvent.parameters.push(
    new ethereum.EventParam(
      "challengeId",
      ethereum.Value.fromUnsignedBigInt(challengeId)
    )
  )
  joinChallengePoolEvent.parameters.push(
    new ethereum.EventParam(
      "participant",
      ethereum.Value.fromAddress(participant)
    )
  )
  joinChallengePoolEvent.parameters.push(
    new ethereum.EventParam("stake", ethereum.Value.fromUnsignedBigInt(stake))
  )
  joinChallengePoolEvent.parameters.push(
    new ethereum.EventParam("fee", ethereum.Value.fromUnsignedBigInt(fee))
  )
  joinChallengePoolEvent.parameters.push(
    new ethereum.EventParam(
      "yesParticipants",
      ethereum.Value.fromUnsignedBigInt(yesParticipants)
    )
  )
  joinChallengePoolEvent.parameters.push(
    new ethereum.EventParam(
      "noParticipants",
      ethereum.Value.fromUnsignedBigInt(noParticipants)
    )
  )
  joinChallengePoolEvent.parameters.push(
    new ethereum.EventParam(
      "state",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(state))
    )
  )

  return joinChallengePoolEvent
}

export function createManualChallengePoolEvent(
  challengeId: BigInt,
  closer: Address,
  state: i32
): ManualChallengePool {
  let manualChallengePoolEvent = changetype<ManualChallengePool>(newMockEvent())

  manualChallengePoolEvent.parameters = new Array()

  manualChallengePoolEvent.parameters.push(
    new ethereum.EventParam(
      "challengeId",
      ethereum.Value.fromUnsignedBigInt(challengeId)
    )
  )
  manualChallengePoolEvent.parameters.push(
    new ethereum.EventParam("closer", ethereum.Value.fromAddress(closer))
  )
  manualChallengePoolEvent.parameters.push(
    new ethereum.EventParam(
      "state",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(state))
    )
  )

  return manualChallengePoolEvent
}

export function createNewChallengePoolEvent(
  challengeId: BigInt,
  creator: Address,
  createdAt: BigInt,
  maturity: BigInt,
  result: i32,
  stake: BigInt,
  fee: BigInt,
  yesParticipants: BigInt,
  noParticipants: BigInt,
  events: Array<ethereum.Tuple>
): NewChallengePool {
  let newChallengePoolEvent = changetype<NewChallengePool>(newMockEvent())

  newChallengePoolEvent.parameters = new Array()

  newChallengePoolEvent.parameters.push(
    new ethereum.EventParam(
      "challengeId",
      ethereum.Value.fromUnsignedBigInt(challengeId)
    )
  )
  newChallengePoolEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  newChallengePoolEvent.parameters.push(
    new ethereum.EventParam(
      "createdAt",
      ethereum.Value.fromUnsignedBigInt(createdAt)
    )
  )
  newChallengePoolEvent.parameters.push(
    new ethereum.EventParam(
      "maturity",
      ethereum.Value.fromUnsignedBigInt(maturity)
    )
  )
  newChallengePoolEvent.parameters.push(
    new ethereum.EventParam(
      "result",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(result))
    )
  )
  newChallengePoolEvent.parameters.push(
    new ethereum.EventParam("stake", ethereum.Value.fromUnsignedBigInt(stake))
  )
  newChallengePoolEvent.parameters.push(
    new ethereum.EventParam("fee", ethereum.Value.fromUnsignedBigInt(fee))
  )
  newChallengePoolEvent.parameters.push(
    new ethereum.EventParam(
      "yesParticipants",
      ethereum.Value.fromUnsignedBigInt(yesParticipants)
    )
  )
  newChallengePoolEvent.parameters.push(
    new ethereum.EventParam(
      "noParticipants",
      ethereum.Value.fromUnsignedBigInt(noParticipants)
    )
  )
  newChallengePoolEvent.parameters.push(
    new ethereum.EventParam("events", ethereum.Value.fromTupleArray(events))
  )

  return newChallengePoolEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createStakeTokenAddedEvent(token: Address): StakeTokenAdded {
  let stakeTokenAddedEvent = changetype<StakeTokenAdded>(newMockEvent())

  stakeTokenAddedEvent.parameters = new Array()

  stakeTokenAddedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )

  return stakeTokenAddedEvent
}

export function createStaleChallengePoolEvent(
  challengeId: BigInt,
  closer: Address,
  nextCloseTime: BigInt,
  staleRetries: BigInt,
  state: i32
): StaleChallengePool {
  let staleChallengePoolEvent = changetype<StaleChallengePool>(newMockEvent())

  staleChallengePoolEvent.parameters = new Array()

  staleChallengePoolEvent.parameters.push(
    new ethereum.EventParam(
      "challengeId",
      ethereum.Value.fromUnsignedBigInt(challengeId)
    )
  )
  staleChallengePoolEvent.parameters.push(
    new ethereum.EventParam("closer", ethereum.Value.fromAddress(closer))
  )
  staleChallengePoolEvent.parameters.push(
    new ethereum.EventParam(
      "nextCloseTime",
      ethereum.Value.fromUnsignedBigInt(nextCloseTime)
    )
  )
  staleChallengePoolEvent.parameters.push(
    new ethereum.EventParam(
      "staleRetries",
      ethereum.Value.fromUnsignedBigInt(staleRetries)
    )
  )
  staleChallengePoolEvent.parameters.push(
    new ethereum.EventParam(
      "state",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(state))
    )
  )

  return staleChallengePoolEvent
}

export function createWinningsWithdrawnEvent(
  participant: Address,
  challengeId: BigInt,
  amountWithdrawn: BigInt,
  amountWon: BigInt
): WinningsWithdrawn {
  let winningsWithdrawnEvent = changetype<WinningsWithdrawn>(newMockEvent())

  winningsWithdrawnEvent.parameters = new Array()

  winningsWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "participant",
      ethereum.Value.fromAddress(participant)
    )
  )
  winningsWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "challengeId",
      ethereum.Value.fromUnsignedBigInt(challengeId)
    )
  )
  winningsWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "amountWithdrawn",
      ethereum.Value.fromUnsignedBigInt(amountWithdrawn)
    )
  )
  winningsWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "amountWon",
      ethereum.Value.fromUnsignedBigInt(amountWon)
    )
  )

  return winningsWithdrawnEvent
}
