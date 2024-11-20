import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import { NewChallengePoolEventsStruct } from "../generated/ChallengePool/ChallengePool";
import { ChallengeEvent, MultiChallengeOption } from "../generated/schema";

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
    let event = ChallengeEvent.load(eventId);
    if (!event) {
      event = new ChallengeEvent(eventId);
      event.maturity = e.maturity;
      event.topicId = e.topicId;
      event.challenge = challengeId.toString();
      event.param = e.eventParam;
      event.save();
    }
  }
}

export function saveOptions(challengeId: BigInt, options: Bytes[]): void {
  // const pool = MultiChallengePool.bind(poolAddress);
  for (let i = 0; i < options.length; i++) {
    const o = options[i];
    const optionId = challengeId
      .toString()
      .concat("_")
      .concat(options.toString());
    let option = MultiChallengeOption.load(optionId);
    if (!option) {
      option = new MultiChallengeOption(optionId);
      option.total = BigInt.fromI32(0);

      option.option = o;
      option.challenge = challengeId.toString();
      option.save();
    }
  }
}
