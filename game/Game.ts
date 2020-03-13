import { Round, RoundOutcome } from "./Round";
import { Team } from "./Team";

// Team One: Player One + Three
// Team Two: Player Two + Four
// Player Two sits to left of Player One

export type Game = {
  playerNames?: { [player: number]: string };
  currentRound?: Round | null;
  finishedRounds?: Array<[Team, RoundOutcome]>;
};

export function createGame(): Game {
  return {
    playerNames: {},
    currentRound: null,
    finishedRounds: []
  };
}
