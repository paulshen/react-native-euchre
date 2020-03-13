import * as React from "react";
import { Text } from "react-native";
import { suitToString } from "../game/Card";
import { Game } from "../game/Game";
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
      playerNames={game.players}
      playerViews={{
        [Player.One]: renderCard(Player.One, round),
        [Player.Two]: renderCard(Player.Two, round),
        [Player.Three]: renderCard(Player.Three, round),
        [Player.Four]: renderCard(Player.Four, round)
      }}
      centerView={<Text>{suitToString(round.trumpSuit!)}</Text>}
    />
  );
}
