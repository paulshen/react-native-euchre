import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Game } from "../game/Game";
import { Player } from "../game/Player";
import ActiveRoundScreen from "./ActiveRoundScreen";

export default function ActiveGameScreen({
  game,
  playerId
}: {
  game: Game;
  playerId: Player;
}) {
  if (game.currentRound) {
    return <ActiveRoundScreen round={game.currentRound} playerId={playerId} />;
  }
  return (
    <View style={styles.root}>
      <Text>{JSON.stringify(game)}</Text>
      <Text>{playerId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 48
  }
});
