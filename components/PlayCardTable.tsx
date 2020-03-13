import * as React from "react";
import { Text } from "react-native";
import { Player } from "../game/Player";
import { Round } from "../game/Round";
import CardTable from "./CardTable";
import CardView from "./CardView";

function renderCard(player: Player, round: Round) {
  const card = round.currentTrick?.cards[player];
  if (card !== undefined) {
    return <CardView card={card} />;
  }
  if (round.turnPlayer === player) {
    return <Text>Waiting</Text>;
  }
  return null;
}

export default function PlayCardTable({
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
        [Player.One]: renderCard(Player.One, round),
        [Player.Two]: renderCard(Player.Two, round),
        [Player.Three]: renderCard(Player.Three, round),
        [Player.Four]: renderCard(Player.Four, round)
      }}
    />
  );
}
