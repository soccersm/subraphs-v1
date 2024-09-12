import {
  FootballScoreProvided as FootballScoreProvidedEvent,
  FootballScoreRequested as FootballScoreRequestedEvent
} from "../generated/FootballScoreProvider/FootballScoreProvider"
import {
  FootballScoreProvided,
  FootballScoreRequested
} from "../generated/schema"

export function handleFootballScoreProvided(
  event: FootballScoreProvidedEvent,
): void {
  let entity = new FootballScoreProvided(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.provider = event.params._provider
  entity.matchId = event.params._matchId
  entity.homeScore = event.params._homeScore
  entity.awayScore = event.params._awayScore

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
  entity.reader = event.params._reader
  entity.matchId = event.params._matchId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
