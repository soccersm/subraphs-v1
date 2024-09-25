import {
  AssetPriceProvided as AssetPriceProvidedEvent,
  AssetPriceRequested as AssetPriceRequestedEvent,
} from "../generated/AssetPriceProvider/AssetPriceProvider";
import { AssetPriceProvided, AssetPriceRequested } from "../generated/schema";

export function handleAssetPriceProvided(event: AssetPriceProvidedEvent): void {
  const id = event.params._assetSymbol
    .concat("_")
    .concat(event.params._date.toString());
  if (AssetPriceProvided.load(id)) {
    return;
  }
  let entity = new AssetPriceProvided(id);
  entity.provider = event.params._provider;
  entity.assetSymbol = event.params._assetSymbol;
  entity.date = event.params._date;
  entity.price = event.params._price;
  entity.request = id;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
  let requested = AssetPriceRequested.load(id);
  if (requested) {
    requested.provided = id;
    requested.save();
  }
}

export function handleAssetPriceRequested(
  event: AssetPriceRequestedEvent
): void {
  const id = event.params._assetSymbol
    .concat("_")
    .concat(event.params._date.toString());
  if (AssetPriceRequested.load(id)) {
    return;
  }
  let entity = new AssetPriceRequested(id);
  entity.reader = event.params._reader;
  entity.assetSymbol = event.params._assetSymbol;
  entity.date = event.params._date;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}
