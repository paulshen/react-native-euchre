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

export function didPlayerGo(
  player: Player,
  lastPlayer: Player,
  currentPlayer: Player
): boolean {
  const firstPlayer = playerToLeft(lastPlayer);
  let iterPlayer = firstPlayer;
  while (iterPlayer !== lastPlayer) {
    if (iterPlayer === currentPlayer) {
      return false;
    }
    if (iterPlayer === player) {
      return true;
    }
    iterPlayer = playerToLeft(iterPlayer);
  }
  return false;
}

export function getTeammate(player: Player): Player {
  switch (player) {
    case Player.One:
      return Player.Three;
    case Player.Two:
      return Player.Four;
    case Player.Three:
      return Player.One;
    case Player.Four:
      return Player.Two;
  }
}
