import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  FootballScoreProvided,
  FootballScoreRequested,
  OwnershipTransferred,
  ProviderAdded,
  ProviderRemoved,
  ReaderAdded,
  ReaderRemoved
} from "../generated/FootballScoreProvider/FootballScoreProvider"

export function createFootballScoreProvidedEvent(
  _provider: Address,
  _matchId: BigInt,
  _homeScore: BigInt,
  _awayScore: BigInt
): FootballScoreProvided {
  let footballScoreProvidedEvent = changetype<FootballScoreProvided>(
    newMockEvent()
  )

  footballScoreProvidedEvent.parameters = new Array()

  footballScoreProvidedEvent.parameters.push(
    new ethereum.EventParam("_provider", ethereum.Value.fromAddress(_provider))
  )
  footballScoreProvidedEvent.parameters.push(
    new ethereum.EventParam(
      "_matchId",
      ethereum.Value.fromUnsignedBigInt(_matchId)
    )
  )
  footballScoreProvidedEvent.parameters.push(
    new ethereum.EventParam(
      "_homeScore",
      ethereum.Value.fromUnsignedBigInt(_homeScore)
    )
  )
  footballScoreProvidedEvent.parameters.push(
    new ethereum.EventParam(
      "_awayScore",
      ethereum.Value.fromUnsignedBigInt(_awayScore)
    )
  )

  return footballScoreProvidedEvent
}

export function createFootballScoreRequestedEvent(
  _reader: Address,
  _matchId: BigInt
): FootballScoreRequested {
  let footballScoreRequestedEvent = changetype<FootballScoreRequested>(
    newMockEvent()
  )

  footballScoreRequestedEvent.parameters = new Array()

  footballScoreRequestedEvent.parameters.push(
    new ethereum.EventParam("_reader", ethereum.Value.fromAddress(_reader))
  )
  footballScoreRequestedEvent.parameters.push(
    new ethereum.EventParam(
      "_matchId",
      ethereum.Value.fromUnsignedBigInt(_matchId)
    )
  )

  return footballScoreRequestedEvent
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
