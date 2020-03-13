import { Card, CardSuit, deal, isCardGreater } from "./Card";
import { Player, playerToLeft, getPlayerTeam } from "./Player";
import { Team } from "./Team";

export enum TurnAction {
  CallFlippedTrump,
  CallAnyTrump,
  DealerDiscardCard,
  PlayCard
}

export enum RoundOutcome {
  Win34,
  Win5,
  Defend34,
  Defend5,
  Alone5
}

export type Trick = { cards: { [player: number]: Card }; suit: CardSuit };

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

export function getWinnerOfTrick(trick: Trick, trumpSuit: CardSuit): Player {
  let winner = Player.One;
  for (let i = Player.Two; i <= Player.Four; i++) {
    if (
      isCardGreater(trick.cards[i], trick.cards[winner], trick.suit, trumpSuit)
    ) {
      winner = i;
    }
  }
  return winner;
}

export function scoreRound(
  tricks: Array<Trick>,
  trumpSuit: CardSuit
): { [team: number]: number } {
  const trickWinners = tricks.map(trick => getWinnerOfTrick(trick, trumpSuit));
  const teamScores = {
    [Team.One]: 0,
    [Team.Two]: 0
  };
  trickWinners.forEach(trickWinner => {
    const team = getPlayerTeam(trickWinner);
    teamScores[team]++;
  });
  return teamScores;
}

export function getRoundOutcome(
  teamScores: {
    [team: number]: number;
  },
  trumpCaller: Player
): [Team, number] {
  const winningTeam =
    teamScores[Team.One] > teamScores[Team.Two] ? Team.One : Team.Two;
  const didWinAll = teamScores[winningTeam] === 5;
  const didCallTrump = getPlayerTeam(trumpCaller) === winningTeam;
  let outcome;
  if (didCallTrump) {
    outcome = didWinAll ? RoundOutcome.Win5 : RoundOutcome.Win34;
  } else {
    outcome = didWinAll ? RoundOutcome.Defend5 : RoundOutcome.Defend34;
  }
  return [winningTeam, outcome];
}
