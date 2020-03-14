import * as React from "react";
import { Text } from "react-native";
import { Game } from "../game/Game";
import { didPlayerGo, Player } from "../game/Player";
import { Round } from "../game/Round";
import CardTable from "./CardTable";
import CardView from "./CardView";

function renderCallStatus(player: Player, round: Round) {
  if (player === round.turnPlayer) {
    return <Text>Waiting</Text>;
  }
  if (player === round.trumpCaller) {
    return <Text>Caller</Text>;
  }
  return didPlayerGo(
    player,
    round.dealer,
    round.trumpCaller !== null ? round.trumpCaller : round.turnPlayer
  ) ? (
    <Text>Pass</Text>
  ) : null;
}

export default function TrumpCallingTable({
  game,
  round,
  player
}: {
  game: Game;
  round: Round;
  player: Player;
}) {
  return (
    <CardTable
      player={player}
      round={round}
      playerNames={game.playerNames}
      playerViews={{
        [Player.One]: renderCallStatus(Player.One, round),
        [Player.Two]: renderCallStatus(Player.Two, round),
        [Player.Three]: renderCallStatus(Player.Three, round),
        [Player.Four]: renderCallStatus(Player.Four, round)
      }}
      centerView={<CardView card={round.flippedCard} />}
    />
  );
}
