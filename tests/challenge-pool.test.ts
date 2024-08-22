import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { CancelChallengePool } from "../generated/schema"
import { CancelChallengePool as CancelChallengePoolEvent } from "../generated/ChallengePool/ChallengePool"
import { handleCancelChallengePool } from "../src/challenge-pool"
import { createCancelChallengePoolEvent } from "./challenge-pool-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let challengeId = BigInt.fromI32(234)
    let canceller = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let state = 123
    let newCancelChallengePoolEvent = createCancelChallengePoolEvent(
      challengeId,
      canceller,
      state
    )
    handleCancelChallengePool(newCancelChallengePoolEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CancelChallengePool created and stored", () => {
    assert.entityCount("CancelChallengePool", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CancelChallengePool",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "challengeId",
      "234"
    )
    assert.fieldEquals(
      "CancelChallengePool",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "canceller",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "CancelChallengePool",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "state",
      "123"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
