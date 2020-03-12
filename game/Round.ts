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

export type Turn = Map<Player, Card>;

export type Round = {
  turnPlayer: Player;
  turnAction: TurnAction;

  hands: [Array<Card>, Array<Card>, Array<Card>, Array<Card>];
  currentTurn: Turn | undefined;
  playedTurns: Array<Turn>;

  dealer: Player;
  trumpCaller: Player | undefined;
  trumpSuit: CardSuit | undefined;
  flippedCard: Card;
};

export function createRound(dealer: Player): Round {
  const cards = deal();

  return {
    turnPlayer: playerToLeft(dealer),
    turnAction: TurnAction.CallFlippedTrump,

    hands: [cards[0], cards[1], cards[2], cards[3]],
    currentTurn: undefined,
    playedTurns: [],

    dealer,
    trumpCaller: undefined,
    trumpSuit: undefined,
    flippedCard: cards[4]
  };
}
