import {
  GeneralStatementProvided as GeneralStatementProvidedEvent,
  GeneralStatementRequested as GeneralStatementRequestedEvent
} from "../generated/GeneralStatementProvider/GeneralStatementProvider"
import {
  GeneralStatementProvided,
  GeneralStatementRequested
} from "../generated/schema"

export function handleGeneralStatementProvided(
  event: GeneralStatementProvidedEvent,
): void {
  let entity = new GeneralStatementProvided(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.provider = event.params._provider
  entity.statementId = event.params._statementId
  entity.statement = event.params._statement
  entity.results = event.params._results

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGeneralStatementRequested(
  event: GeneralStatementRequestedEvent,
): void {
  let entity = new GeneralStatementRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.reader = event.params._reader
  entity.statementId = event.params._statementId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
