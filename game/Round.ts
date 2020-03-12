import { Card, CardSuit, deal } from "./Card";
import { Player, playerToLeft } from "./Player";

export enum TurnAction {
  CallFlippedTrump,
  CallAnyTrump,
  DealerSwapCard,
  PlayCard
}

export enum RoundOutcome {
  Win34,
  Win5,
  Defend34,
  Defend5,
  Alone5
}

export type Trick = { [player: number]: Card };

export type Round = {
  turnPlayer: Player;
  turnAction: TurnAction;

  hands: { [player: number]: Array<Card> };
  currentTrick: Trick | null;
  finishedTricks: Array<Trick>;

  dealer: Player;
  trumpCaller: Player | null;
  trumpSuit: CardSuit | null;
  flippedCard: Card;
};

export function createRound(dealer: Player): Round {
  const cards = deal();

  return {
    turnPlayer: playerToLeft(dealer),
    turnAction: TurnAction.CallFlippedTrump,

    hands: {
      [Player.One]: cards[0],
      [Player.Two]: cards[1],
      [Player.Three]: cards[2],
      [Player.Four]: cards[3]
    },
    currentTrick: null,
    finishedTricks: [],

    dealer,
    trumpCaller: null,
    trumpSuit: null,
    flippedCard: cards[4]
  };
}
