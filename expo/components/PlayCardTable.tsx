import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { suitToString } from "../game/Card";
import { Game } from "../game/Game";
import { Player } from "../game/Player";
import { getWinnerOfTrick, Round } from "../game/Round";
import CardTable from "./CardTable";
import CardView, { CardSuitText } from "./CardView";

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
    if (
      Object.keys(currentTrick.cards).length ===
      (round.trumpCallerAlone ? 3 : 4)
    ) {
      trickWinner = getWinnerOfTrick(currentTrick, round.trumpSuit!);
    }
  }
  return (
    <CardTable
      round={round}
      player={player}
      playerNames={game.playerNames}
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
      centerView={
        <CardSuitText suit={round.trumpSuit!} style={styles.trumpSuit} />
      }
    />
  );
}

const styles = StyleSheet.create({
  highlight: {
    backgroundColor: "#f0f0f0"
  },
  trumpSuit: {
    fontSize: 24
  }
});
