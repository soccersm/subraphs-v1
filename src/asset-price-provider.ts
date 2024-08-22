import {
  AssetPriceProvided as AssetPriceProvidedEvent,
  AssetPriceRequested as AssetPriceRequestedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  ProviderAdded as ProviderAddedEvent,
  ProviderRemoved as ProviderRemovedEvent,
  ReaderAdded as ReaderAddedEvent,
  ReaderRemoved as ReaderRemovedEvent,
} from "../generated/AssetPriceProvider/AssetPriceProvider"
import {
  AssetPriceProvided,
  AssetPriceRequested,
  OwnershipTransferred,
  ProviderAdded,
  ProviderRemoved,
  ReaderAdded,
  ReaderRemoved,
} from "../generated/schema"

export function handleAssetPriceProvided(event: AssetPriceProvidedEvent): void {
  let entity = new AssetPriceProvided(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity._provider = event.params._provider
  entity._assetSymbol = event.params._assetSymbol
  entity._date = event.params._date
  entity._price = event.params._price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAssetPriceRequested(
  event: AssetPriceRequestedEvent,
): void {
  let entity = new AssetPriceRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity._reader = event.params._reader
  entity._assetSymbol = event.params._assetSymbol
  entity._date = event.params._date

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
