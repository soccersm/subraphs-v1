import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { GeneralStatementProvided } from "../generated/schema"
import { GeneralStatementProvided as GeneralStatementProvidedEvent } from "../generated/GeneralStatementProvider/GeneralStatementProvider"
import { handleGeneralStatementProvided } from "../src/general-statement-provider"
import { createGeneralStatementProvidedEvent } from "./general-statement-provider-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _provider = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let _statementId = BigInt.fromI32(234)
    let _statement = "Example string value"
    let _results = 123
    let newGeneralStatementProvidedEvent = createGeneralStatementProvidedEvent(
      _provider,
      _statementId,
      _statement,
      _results
    )
    handleGeneralStatementProvided(newGeneralStatementProvidedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("GeneralStatementProvided created and stored", () => {
    assert.entityCount("GeneralStatementProvided", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "GeneralStatementProvided",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_provider",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "GeneralStatementProvided",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_statementId",
      "234"
    )
    assert.fieldEquals(
      "GeneralStatementProvided",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_statement",
      "Example string value"
    )
    assert.fieldEquals(
      "GeneralStatementProvided",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_results",
      "123"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
