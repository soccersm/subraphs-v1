import {
  MultiFootballScoreProvided as MultiFootballScoreProvidedEvent,
  MultiFootballScoreRequested as MultiFootballScoreRequestedEvent,
} from "../generated/MultiFootballScoreProvider/MultiFootballScoreProvider"
import {
  MultiFootballScoreProvided,
  MultiFootballScoreRequested,
} from "../generated/schema"

export function handleMultiFootballScoreProvided(
  event: MultiFootballScoreProvidedEvent,
): void {
  const id = event.params._matchId.toString();
  if (MultiFootballScoreProvided.load(id)) {
    return;
  }
  let entity = new MultiFootballScoreProvided(id);
  entity.provider = event.params._provider;
  entity.matchId = event.params._matchId;
  entity.homeScore = event.params._homeScore;
  entity.awayScore = event.params._awayScore;
  entity.request = id;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let requested = MultiFootballScoreRequested.load(id);
  if (requested) {
    requested.provided = id;
    requested.save();
  }
}

export function handleMultiFootballScoreRequested(
  event: MultiFootballScoreRequestedEvent,
): void {
  const id = event.params._matchId.toString();
  if (MultiFootballScoreRequested.load(id)) {
    return;
  }
  let entity = new MultiFootballScoreRequested(id);
  entity.reader = event.params._reader;
  entity.matchId = event.params._matchId;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}
