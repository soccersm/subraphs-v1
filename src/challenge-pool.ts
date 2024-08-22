import {
  CancelChallengePool as CancelChallengePoolEvent,
  ClosedChallengePool as ClosedChallengePoolEvent,
  JoinChallengePool as JoinChallengePoolEvent,
  ManualChallengePool as ManualChallengePoolEvent,
  NewChallengePool as NewChallengePoolEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  StakeTokenAdded as StakeTokenAddedEvent,
  StaleChallengePool as StaleChallengePoolEvent,
  WinningsWithdrawn as WinningsWithdrawnEvent
} from "../generated/ChallengePool/ChallengePool"
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
} from "../generated/schema"

export function handleCancelChallengePool(
  event: CancelChallengePoolEvent
): void {
  let entity = new CancelChallengePool(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.challengeId = event.params.challengeId
  entity.canceller = event.params.canceller
  entity.state = event.params.state

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleClosedChallengePool(
  event: ClosedChallengePoolEvent
): void {
  let entity = new ClosedChallengePool(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.challengeId = event.params.challengeId
  entity.closer = event.params.closer
  entity.state = event.params.state
  entity.result = event.params.result

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleJoinChallengePool(event: JoinChallengePoolEvent): void {
  let entity = new JoinChallengePool(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.challengeId = event.params.challengeId
  entity.participant = event.params.participant
  entity.stake = event.params.stake
  entity.fee = event.params.fee
  entity.yesParticipants = event.params.yesParticipants
  entity.noParticipants = event.params.noParticipants
  entity.state = event.params.state

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleManualChallengePool(
  event: ManualChallengePoolEvent
): void {
  let entity = new ManualChallengePool(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.challengeId = event.params.challengeId
  entity.closer = event.params.closer
  entity.state = event.params.state

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewChallengePool(event: NewChallengePoolEvent): void {
  let entity = new NewChallengePool(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.challengeId = event.params.challengeId
  entity.creator = event.params.creator
  entity.createdAt = event.params.createdAt
  entity.maturity = event.params.maturity
  entity.result = event.params.result
  entity.stake = event.params.stake
  entity.fee = event.params.fee
  entity.yesParticipants = event.params.yesParticipants
  entity.noParticipants = event.params.noParticipants
  // entity.events = event.params.events.map((e) => )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleStakeTokenAdded(event: StakeTokenAddedEvent): void {
  let entity = new StakeTokenAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.token = event.params.token

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleStaleChallengePool(event: StaleChallengePoolEvent): void {
  let entity = new StaleChallengePool(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.challengeId = event.params.challengeId
  entity.closer = event.params.closer
  entity.nextCloseTime = event.params.nextCloseTime
  entity.staleRetries = event.params.staleRetries
  entity.state = event.params.state

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWinningsWithdrawn(event: WinningsWithdrawnEvent): void {
  let entity = new WinningsWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.participant = event.params.participant
  entity.challengeId = event.params.challengeId
  entity.amountWithdrawn = event.params.amountWithdrawn
  entity.amountWon = event.params.amountWon

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
