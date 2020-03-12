export enum CardSuit {
  Heart,
  Spade,
  Diamond,
  Club
}

export enum CardRank {
  Nine = 9,
  Ten,
  Jack,
  Queen,
  King,
  Ace
}

export type Card = {
  suit: CardSuit;
  rank: CardRank;
};

export enum Team {
  One = 0,
  Two
}

export enum Player {
  One = 0,
  Two,
  Three,
  Four
}

export enum RoundOutcome {
  Win34,
  Win5,
  Defend34,
  Defend5,
  Alone5
}

// Team One: Player One + Three
// Team Two: Player Two + Four
// Player Two sits to left of Player One

export enum TurnAction {
  CallFlippedTrump,
  CallAnyTrump,
  DealerSwapCard,
  PlayCard
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

export type Game = {
  players: [string, string, string, string];
  currentRound: Round | undefined;
  finishedRounds: Array<[Team, RoundOutcome]>;
};

export function createGame(): Game {
  return {
    players: ["A", "B", "C", "D"],
    currentRound: undefined,
    finishedRounds: []
  };
}
