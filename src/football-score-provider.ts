import {
  FootballScoreProvided as FootballScoreProvidedEvent,
  FootballScoreRequested as FootballScoreRequestedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  ProviderAdded as ProviderAddedEvent,
  ProviderRemoved as ProviderRemovedEvent,
  ReaderAdded as ReaderAddedEvent,
  ReaderRemoved as ReaderRemovedEvent,
} from "../generated/FootballScoreProvider/FootballScoreProvider"
import {
  FootballScoreProvided,
  FootballScoreRequested,
  OwnershipTransferred,
  ProviderAdded,
  ProviderRemoved,
  ReaderAdded,
  ReaderRemoved,
} from "../generated/schema"

export function handleFootballScoreProvided(
  event: FootballScoreProvidedEvent,
): void {
  let entity = new FootballScoreProvided(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity._provider = event.params._provider
  entity._matchId = event.params._matchId
  entity._homeScore = event.params._homeScore
  entity._awayScore = event.params._awayScore

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFootballScoreRequested(
  event: FootballScoreRequestedEvent,
): void {
  let entity = new FootballScoreRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity._reader = event.params._reader
  entity._matchId = event.params._matchId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent,
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProviderAdded(event: ProviderAddedEvent): void {
  let entity = new ProviderAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity._provider = event.params._provider

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProviderRemoved(event: ProviderRemovedEvent): void {
  let entity = new ProviderRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity._provider = event.params._provider

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleReaderAdded(event: ReaderAddedEvent): void {
  let entity = new ReaderAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity._reader = event.params._reader

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleReaderRemoved(event: ReaderRemovedEvent): void {
  let entity = new ReaderRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity._reader = event.params._reader

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
