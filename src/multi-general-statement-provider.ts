import {
  MultiGeneralStatementProvided as MultiGeneralStatementProvidedEvent,
  MultiGeneralStatementRequested as MultiGeneralStatementRequestedEvent,
} from "../generated/MultiGeneralStatementProvider/MultiGeneralStatementProvider"
import {
  MultiGeneralStatementProvided,
  MultiGeneralStatementRequested,
} from "../generated/schema"

export function handleMultiGeneralStatementProvided(
  event: MultiGeneralStatementProvidedEvent,
): void {
  const id = event.params._statementId.toString();
  if (MultiGeneralStatementProvided.load(id)) {
    return;
  }
  let entity = new MultiGeneralStatementProvided(id);
  entity.provider = event.params._provider;
  entity.statementId = event.params._statementId;
  entity.statement = event.params._statement;
  entity.result = event.params._result;
  entity.request = id;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let requested = MultiGeneralStatementRequested.load(id);
  if (requested) {
    requested.provided = id;
    requested.save();
  }
}

export function handleMultiGeneralStatementRequested(
  event: MultiGeneralStatementRequestedEvent,
): void {
  const id = event.params._statementId.toString();
  if (MultiGeneralStatementRequested.load(id)) {
    return;
  }
  let entity = new MultiGeneralStatementRequested(id);
  entity.reader = event.params._reader;
  entity.statementId = event.params._statementId;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}
