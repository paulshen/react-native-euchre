import { Round, RoundOutcome } from "./Round";
import { Team } from "./Team";

// Team One: Player One + Three
// Team Two: Player Two + Four
// Player Two sits to left of Player One

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
