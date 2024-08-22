import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  GeneralStatementProvided,
  GeneralStatementRequested,
  OwnershipTransferred,
  ProviderAdded,
  ProviderRemoved,
  ReaderAdded,
  ReaderRemoved
} from "../generated/GeneralStatementProvider/GeneralStatementProvider"

export function createGeneralStatementProvidedEvent(
  _provider: Address,
  _statementId: BigInt,
  _statement: string,
  _results: i32
): GeneralStatementProvided {
  let generalStatementProvidedEvent = changetype<GeneralStatementProvided>(
    newMockEvent()
  )

  generalStatementProvidedEvent.parameters = new Array()

  generalStatementProvidedEvent.parameters.push(
    new ethereum.EventParam("_provider", ethereum.Value.fromAddress(_provider))
  )
  generalStatementProvidedEvent.parameters.push(
    new ethereum.EventParam(
      "_statementId",
      ethereum.Value.fromUnsignedBigInt(_statementId)
    )
  )
  generalStatementProvidedEvent.parameters.push(
    new ethereum.EventParam("_statement", ethereum.Value.fromString(_statement))
  )
  generalStatementProvidedEvent.parameters.push(
    new ethereum.EventParam(
      "_results",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_results))
    )
  )

  return generalStatementProvidedEvent
}

export function createGeneralStatementRequestedEvent(
  _reader: Address,
  _statementId: BigInt
): GeneralStatementRequested {
  let generalStatementRequestedEvent = changetype<GeneralStatementRequested>(
    newMockEvent()
  )

  generalStatementRequestedEvent.parameters = new Array()

  generalStatementRequestedEvent.parameters.push(
    new ethereum.EventParam("_reader", ethereum.Value.fromAddress(_reader))
  )
  generalStatementRequestedEvent.parameters.push(
    new ethereum.EventParam(
      "_statementId",
      ethereum.Value.fromUnsignedBigInt(_statementId)
    )
  )

  return generalStatementRequestedEvent
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
