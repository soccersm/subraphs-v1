import {
  GeneralStatementProvided as GeneralStatementProvidedEvent,
  GeneralStatementRequested as GeneralStatementRequestedEvent,
} from "../generated/GeneralStatementProvider/GeneralStatementProvider";
import {
  GeneralStatementProvided,
  GeneralStatementRequested,
} from "../generated/schema";

export function handleGeneralStatementProvided(
  event: GeneralStatementProvidedEvent
): void {
  const id = event.params._statementId.toString();
  if (GeneralStatementProvided.load(id)) {
    return;
  }
  let entity = new GeneralStatementProvided(id);
  entity.provider = event.params._provider;
  entity.statementId = event.params._statementId;
  entity.statement = event.params._statement;
  entity.results = event.params._results;
  entity.request = id;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let requested = GeneralStatementRequested.load(id);
  if (requested) {
    requested.provided = id;
    requested.save();
  }
}

export function handleGeneralStatementRequested(
  event: GeneralStatementRequestedEvent
): void {
  const id = event.params._statementId.toString();
  if (GeneralStatementRequested.load(id)) {
    return;
  }
  let entity = new GeneralStatementRequested(id);
  entity.reader = event.params._reader;
  entity.statementId = event.params._statementId;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}
