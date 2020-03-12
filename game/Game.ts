import { Round, RoundOutcome, createRound } from "./Round";
import { Team } from "./Team";
import { Player } from "./Player";

// Team One: Player One + Three
// Team Two: Player Two + Four
// Player Two sits to left of Player One

export type Game = {
  players: [string | null, string | null, string | null, string | null];
  currentRound?: Round | null;
  finishedRounds?: Array<[Team, RoundOutcome]>;
};

export function createGame(): Game {
  return {
    players: [null, null, null, null],
    currentRound: null,
    finishedRounds: []
  };
}
