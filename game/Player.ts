import { Team } from "./Team";

export enum Player {
  One = 0,
  Two,
  Three,
  Four
}

const NUM_PLAYERS = 4;

export function playerToLeft(player: Player): Player {
  return (player + 1) % NUM_PLAYERS;
}

export function playerToRight(player: Player): Player {
  return (player - 1 + NUM_PLAYERS) % NUM_PLAYERS;
}

export function getPlayerTeam(player: Player): Team {
  switch (player) {
    case Player.One:
    case Player.Three:
      return Team.One;
    case Player.Two:
    case Player.Four:
      return Team.Two;
  }
}
