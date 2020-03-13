import * as React from "react";
import { Text } from "react-native";
import { didPlayerGo, Player } from "../game/Player";
import { Round } from "../game/Round";
import CardTable from "./CardTable";
import CardView from "./CardView";

function renderCallStatus(player: Player, round: Round) {
  if (player === round.turnPlayer) {
    return <Text>Waiting</Text>;
  }
  return didPlayerGo(player, round.dealer, round.turnPlayer) ? (
    <Text>Pass</Text>
  ) : null;
}

export default function TrumpCallingTable({
  round,
  player
}: {
  round: Round;
  player: Player;
}) {
  return (
    <CardTable
      player={player}
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
