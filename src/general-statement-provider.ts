import {
  GeneralStatementProvided as GeneralStatementProvidedEvent,
  GeneralStatementRequested as GeneralStatementRequestedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  ProviderAdded as ProviderAddedEvent,
  ProviderRemoved as ProviderRemovedEvent,
  ReaderAdded as ReaderAddedEvent,
  ReaderRemoved as ReaderRemovedEvent,
} from "../generated/GeneralStatementProvider/GeneralStatementProvider"
import {
  GeneralStatementProvided,
  GeneralStatementRequested,
  OwnershipTransferred,
  ProviderAdded,
  ProviderRemoved,
  ReaderAdded,
  ReaderRemoved,
} from "../generated/schema"

export function handleGeneralStatementProvided(
  event: GeneralStatementProvidedEvent,
): void {
  let entity = new GeneralStatementProvided(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity._provider = event.params._provider
  entity._statementId = event.params._statementId
  entity._statement = event.params._statement
  entity._results = event.params._results

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGeneralStatementRequested(
  event: GeneralStatementRequestedEvent,
): void {
  let entity = new GeneralStatementRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity._reader = event.params._reader
  entity._statementId = event.params._statementId

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
