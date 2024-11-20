import {
  MultiAssetPriceProvided as MultiAssetPriceProvidedEvent,
  MultiAssetPriceRequested as MultiAssetPriceRequestedEvent,
} from "../generated/MultiAssetPriceProvider/MultiAssetPriceProvider"
import {
  MultiAssetPriceProvided,
  MultiAssetPriceRequested,
} from "../generated/schema"

export function handleMultiAssetPriceProvided(
  event: MultiAssetPriceProvidedEvent,
): void {
  const id = event.params._assetSymbol
    .concat("_")
    .concat(event.params._date.toString());
  if (MultiAssetPriceProvided.load(id)) {
    return;
  }
  let entity = new MultiAssetPriceProvided(id);
  entity.provider = event.params._provider;
  entity.assetSymbol = event.params._assetSymbol;
  entity.date = event.params._date;
  entity.price = event.params._price;
  entity.request = id;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
  let requested = MultiAssetPriceRequested.load(id);
  if (requested) {
    requested.provided = id;
    requested.save();
  }
}

export function handleMultiAssetPriceRequested(
  event: MultiAssetPriceRequestedEvent,
): void {
  const id = event.params._assetSymbol
    .concat("_")
    .concat(event.params._date.toString());
  if (MultiAssetPriceRequested.load(id)) {
    return;
  }
  let entity = new MultiAssetPriceRequested(id);
  entity.reader = event.params._reader;
  entity.assetSymbol = event.params._assetSymbol;
  entity.date = event.params._date;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}
