import * as React from "react";
import { Text, StyleSheet } from "react-native";
import { suitToString } from "../game/Card";
import { Game } from "../game/Game";
import { Player } from "../game/Player";
import { Round, getWinnerOfTrick } from "../game/Round";
import CardTable from "./CardTable";
import CardView from "./CardView";

function renderCard(player: Player, round: Round, highlight: boolean) {
  const card = round.currentTrick?.cards[player];
  if (card !== undefined) {
    return <CardView card={card} style={highlight ? styles.highlight : null} />;
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
  const currentTrick = round.currentTrick;
  let trickWinner;
  if (currentTrick !== null) {
    if (Object.keys(currentTrick.cards).length === 4) {
      trickWinner = getWinnerOfTrick(currentTrick, round.trumpSuit!);
    }
  }
  return (
    <CardTable
      player={player}
      playerNames={game.players}
      playerViews={{
        [Player.One]: renderCard(Player.One, round, trickWinner === Player.One),
        [Player.Two]: renderCard(Player.Two, round, trickWinner === Player.Two),
        [Player.Three]: renderCard(
          Player.Three,
          round,
          trickWinner === Player.Three
        ),
        [Player.Four]: renderCard(
          Player.Four,
          round,
          trickWinner === Player.Four
        )
      }}
      centerView={<Text>{suitToString(round.trumpSuit!)}</Text>}
    />
  );
}

const styles = StyleSheet.create({
  highlight: {
    backgroundColor: "#f0f0f0"
  }
});
