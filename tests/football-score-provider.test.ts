import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { FootballScoreProvided } from "../generated/schema"
import { FootballScoreProvided as FootballScoreProvidedEvent } from "../generated/FootballScoreProvider/FootballScoreProvider"
import { handleFootballScoreProvided } from "../src/football-score-provider"
import { createFootballScoreProvidedEvent } from "./football-score-provider-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _provider = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let _matchId = BigInt.fromI32(234)
    let _homeScore = BigInt.fromI32(234)
    let _awayScore = BigInt.fromI32(234)
    let newFootballScoreProvidedEvent = createFootballScoreProvidedEvent(
      _provider,
      _matchId,
      _homeScore,
      _awayScore
    )
    handleFootballScoreProvided(newFootballScoreProvidedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("FootballScoreProvided created and stored", () => {
    assert.entityCount("FootballScoreProvided", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "FootballScoreProvided",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_provider",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "FootballScoreProvided",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_matchId",
      "234"
    )
    assert.fieldEquals(
      "FootballScoreProvided",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_homeScore",
      "234"
    )
    assert.fieldEquals(
      "FootballScoreProvided",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_awayScore",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
