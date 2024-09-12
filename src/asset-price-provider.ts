import {
  AssetPriceProvided as AssetPriceProvidedEvent,
  AssetPriceRequested as AssetPriceRequestedEvent
} from "../generated/AssetPriceProvider/AssetPriceProvider"
import {
  AssetPriceProvided,
  AssetPriceRequested,
} from "../generated/schema"

export function handleAssetPriceProvided(event: AssetPriceProvidedEvent): void {
  let entity = new AssetPriceProvided(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.provider = event.params._provider
  entity.assetSymbol = event.params._assetSymbol
  entity.date = event.params._date
  entity.price = event.params._price

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
  entity.reader = event.params._reader
  entity.assetSymbol = event.params._assetSymbol
  entity.date = event.params._date

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
