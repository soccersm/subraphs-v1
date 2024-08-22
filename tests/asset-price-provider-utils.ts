import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AssetPriceProvided,
  AssetPriceRequested,
  OwnershipTransferred,
  ProviderAdded,
  ProviderRemoved,
  ReaderAdded,
  ReaderRemoved
} from "../generated/AssetPriceProvider/AssetPriceProvider"

export function createAssetPriceProvidedEvent(
  _provider: Address,
  _assetSymbol: string,
  _date: BigInt,
  _price: BigInt
): AssetPriceProvided {
  let assetPriceProvidedEvent = changetype<AssetPriceProvided>(newMockEvent())

  assetPriceProvidedEvent.parameters = new Array()

  assetPriceProvidedEvent.parameters.push(
    new ethereum.EventParam("_provider", ethereum.Value.fromAddress(_provider))
  )
  assetPriceProvidedEvent.parameters.push(
    new ethereum.EventParam(
      "_assetSymbol",
      ethereum.Value.fromString(_assetSymbol)
    )
  )
  assetPriceProvidedEvent.parameters.push(
    new ethereum.EventParam("_date", ethereum.Value.fromUnsignedBigInt(_date))
  )
  assetPriceProvidedEvent.parameters.push(
    new ethereum.EventParam("_price", ethereum.Value.fromUnsignedBigInt(_price))
  )

  return assetPriceProvidedEvent
}

export function createAssetPriceRequestedEvent(
  _reader: Address,
  _assetSymbol: string,
  _date: BigInt
): AssetPriceRequested {
  let assetPriceRequestedEvent = changetype<AssetPriceRequested>(newMockEvent())

  assetPriceRequestedEvent.parameters = new Array()

  assetPriceRequestedEvent.parameters.push(
    new ethereum.EventParam("_reader", ethereum.Value.fromAddress(_reader))
  )
  assetPriceRequestedEvent.parameters.push(
    new ethereum.EventParam(
      "_assetSymbol",
      ethereum.Value.fromString(_assetSymbol)
    )
  )
  assetPriceRequestedEvent.parameters.push(
    new ethereum.EventParam("_date", ethereum.Value.fromUnsignedBigInt(_date))
  )

  return assetPriceRequestedEvent
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

export function createProviderAddedEvent(_provider: Address): ProviderAdded {
  let providerAddedEvent = changetype<ProviderAdded>(newMockEvent())

  providerAddedEvent.parameters = new Array()

  providerAddedEvent.parameters.push(
    new ethereum.EventParam("_provider", ethereum.Value.fromAddress(_provider))
  )

  return providerAddedEvent
}

export function createProviderRemovedEvent(
  _provider: Address
): ProviderRemoved {
  let providerRemovedEvent = changetype<ProviderRemoved>(newMockEvent())

  providerRemovedEvent.parameters = new Array()

  providerRemovedEvent.parameters.push(
    new ethereum.EventParam("_provider", ethereum.Value.fromAddress(_provider))
  )

  return providerRemovedEvent
}

export function createReaderAddedEvent(_reader: Address): ReaderAdded {
  let readerAddedEvent = changetype<ReaderAdded>(newMockEvent())

  readerAddedEvent.parameters = new Array()

  readerAddedEvent.parameters.push(
    new ethereum.EventParam("_reader", ethereum.Value.fromAddress(_reader))
  )

  return readerAddedEvent
}

export function createReaderRemovedEvent(_reader: Address): ReaderRemoved {
  let readerRemovedEvent = changetype<ReaderRemoved>(newMockEvent())

  readerRemovedEvent.parameters = new Array()

  readerRemovedEvent.parameters.push(
    new ethereum.EventParam("_reader", ethereum.Value.fromAddress(_reader))
  )

  return readerRemovedEvent
}
