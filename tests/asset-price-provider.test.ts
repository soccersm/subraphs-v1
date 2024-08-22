import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { AssetPriceProvided } from "../generated/schema"
import { AssetPriceProvided as AssetPriceProvidedEvent } from "../generated/AssetPriceProvider/AssetPriceProvider"
import { handleAssetPriceProvided } from "../src/asset-price-provider"
import { createAssetPriceProvidedEvent } from "./asset-price-provider-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _provider = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let _assetSymbol = "Example string value"
    let _date = BigInt.fromI32(234)
    let _price = BigInt.fromI32(234)
    let newAssetPriceProvidedEvent = createAssetPriceProvidedEvent(
      _provider,
      _assetSymbol,
      _date,
      _price
    )
    handleAssetPriceProvided(newAssetPriceProvidedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AssetPriceProvided created and stored", () => {
    assert.entityCount("AssetPriceProvided", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AssetPriceProvided",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_provider",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AssetPriceProvided",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_assetSymbol",
      "Example string value"
    )
    assert.fieldEquals(
      "AssetPriceProvided",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_date",
      "234"
    )
    assert.fieldEquals(
      "AssetPriceProvided",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_price",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
