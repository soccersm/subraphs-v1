import { BigInt, ethereum } from "@graphprotocol/graph-ts";
import { NewChallengePoolEventsStruct } from "../generated/ChallengePool/ChallengePool";
import {
  AssetPriceBoundedEvent,
  AssetPriceTargetEvent,
  FootballCorrectScoreEvent,
  FootballOutcomeEvent,
  FootballOverUnderEvent,
  GeneralStatementEvent,
} from "../generated/schema";

export function predictionStr(val: i32): string {
  switch (val) {
    case 0:
      return "zero";
    case 1:
      return "yes";
    case 2:
      return "no";
    default:
      return "zero";
  }
}

export function stateStr(val: i32): string {
  switch (val) {
    case 0:
      return "open";
    case 1:
      return "closed";
    case 2:
      return "stale";
    case 3:
      return "manual";
    case 4:
      return "cancelled";
    case 5:
      return "locked";
    case 6:
      return "mature";
    default:
      return "open";
  }
}

export function saveEvents(
  challengeId: BigInt,
  events: NewChallengePoolEventsStruct[]
): void {
  for (let i = 0; i < events.length; i++) {
    const e = events[i];
    const eventId = challengeId.toString().concat("_").concat(i.toString());

    switch (e.topicId.toI32()) {
      case 0: // FootBallOutcome
        let footballOutcome = FootballOutcomeEvent.load(eventId);
        if (!footballOutcome) {
          footballOutcome = new FootballOutcomeEvent(eventId);
          footballOutcome.maturity = e.maturity;
          footballOutcome.topicId = e.topicId;
          footballOutcome.challenge = challengeId.toString();
          footballOutcome.result = predictionStr(e.result);

          const decodedParams = ethereum
            .decode('(uint256,string)', e.eventParam)!
            .toTuple();
          footballOutcome.matchId = decodedParams[0].toBigInt();
          footballOutcome.outcome = decodedParams[1].toString();
          footballOutcome.save();
        }
        break;
      case 1: // FootBallOverUnder
        let footballOverUnder = FootballOverUnderEvent.load(eventId);
        if (!footballOverUnder) {
          footballOverUnder = new FootballOverUnderEvent(eventId);
          footballOverUnder.maturity = e.maturity;
          footballOverUnder.topicId = e.topicId;
          footballOverUnder.challenge = challengeId.toString();
          footballOverUnder.result = predictionStr(e.result);

          const decodedParams = ethereum
            .decode('(uint256,uint256,string)', e.eventParam)!
            .toTuple();
          footballOverUnder.matchId = decodedParams[0].toBigInt();
          footballOverUnder.totalGoals = decodedParams[1].toBigInt();
          footballOverUnder.outcome = decodedParams[2].toString();
          footballOverUnder.save();
        }
        break;
      case 2: // FootBallCorrectScore
        let footballCorrectScore = FootballCorrectScoreEvent.load(eventId);
        if (!footballCorrectScore) {
          footballCorrectScore = new FootballCorrectScoreEvent(eventId);
          footballCorrectScore.maturity = e.maturity;
          footballCorrectScore.topicId = e.topicId;
          footballCorrectScore.challenge = challengeId.toString();
          footballCorrectScore.result = predictionStr(e.result);

          const decodedParams = ethereum
            .decode('(uint256,uint256,uint256)', e.eventParam)!
            .toTuple();
          footballCorrectScore.matchId = decodedParams[0].toBigInt();
          footballCorrectScore.homeScore = decodedParams[1].toBigInt();
          footballCorrectScore.awayScore = decodedParams[2].toBigInt();
          footballCorrectScore.save();
        }
        break;
      case 3: // AssetPriceBounded
        let assetPriceBounded = AssetPriceBoundedEvent.load(eventId);
        if (!assetPriceBounded) {
          assetPriceBounded = new AssetPriceBoundedEvent(eventId);
          assetPriceBounded.maturity = e.maturity;
          assetPriceBounded.topicId = e.topicId;
          assetPriceBounded.challenge = challengeId.toString();
          assetPriceBounded.result = predictionStr(e.result);

          const decodedParams = ethereum
            .decode('(string,uint256,uint256,string)', e.eventParam)!
            .toTuple();
          assetPriceBounded.assetSymbol = decodedParams[0].toString();
          assetPriceBounded.priceLowerBound = decodedParams[1].toBigInt();
          assetPriceBounded.priceUpperBound = decodedParams[2].toBigInt();
          assetPriceBounded.outcome = decodedParams[3].toString();
          assetPriceBounded.save();
        }
        break;
      case 4: // AssetPriceTarget
        let assetPriceTarget = AssetPriceTargetEvent.load(eventId);
        if (!assetPriceTarget) {
          assetPriceTarget = new AssetPriceTargetEvent(eventId);
          assetPriceTarget.maturity = e.maturity;
          assetPriceTarget.topicId = e.topicId;
          assetPriceTarget.challenge = challengeId.toString();
          assetPriceTarget.result = predictionStr(e.result);

          const decodedParams = ethereum
            .decode('(string,uint256,string)', e.eventParam)!
            .toTuple();
          assetPriceTarget.assetSymbol = decodedParams[0].toString();
          assetPriceTarget.price = decodedParams[1].toBigInt();
          assetPriceTarget.outcome = decodedParams[2].toString();
          assetPriceTarget.save();
        }
        break;
      case 6: // GeneralStatement
        let generalStatement = GeneralStatementEvent.load(eventId);
        if (!generalStatement) {
          generalStatement = new GeneralStatementEvent(eventId);
          generalStatement.maturity = e.maturity;
          generalStatement.topicId = e.topicId;
          generalStatement.challenge = challengeId.toString();
          generalStatement.result = predictionStr(e.result);

          const decodedParams = ethereum
            .decode("(uint256)", e.eventParam)!
            .toTuple();
          generalStatement.statementId = decodedParams[0].toBigInt();
          generalStatement.save();
        }
        break;
      default:
        break;
    }
  }
}
