import {
  FootballScoreProvided as FootballScoreProvidedEvent,
  FootballScoreRequested as FootballScoreRequestedEvent,
} from "../generated/FootballScoreProvider/FootballScoreProvider";
import {
  FootballScoreProvided,
  FootballScoreRequested,
} from "../generated/schema";

export function handleFootballScoreProvided(
  event: FootballScoreProvidedEvent
): void {
  const id = event.params._matchId.toString();
  if (FootballScoreProvided.load(id)) {
    return;
  }
  let entity = new FootballScoreProvided(id);
  entity.provider = event.params._provider;
  entity.matchId = event.params._matchId;
  entity.homeScore = event.params._homeScore;
  entity.awayScore = event.params._awayScore;
  entity.request = id;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let requested = FootballScoreRequested.load(id);
  if (requested) {
    requested.provided = id;
    requested.save();
  }
}

export function handleFootballScoreRequested(
  event: FootballScoreRequestedEvent
): void {
  const id = event.params._matchId.toString();
  if (FootballScoreRequested.load(id)) {
    return;
  }
  let entity = new FootballScoreRequested(id);
  entity.reader = event.params._reader;
  entity.matchId = event.params._matchId;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}
