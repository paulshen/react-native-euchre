import { Card, CardSuit } from "./Card";
import { Player } from "./Player";

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

export type Round = {
  turnPlayer: Player;
  turnAction: TurnAction;

  cards: [Array<Card>, Array<Card>, Array<Card>, Array<Card>];
  currentHand: Map<Player, Card> | undefined;
  playedHands: Array<Map<Player, Card>>;

  dealer: Player;
  trumpCaller: Player;
  trumpSuit: CardSuit;
  flippedCard: Card;
  dealerSwappedCard: Card | undefined;
};
