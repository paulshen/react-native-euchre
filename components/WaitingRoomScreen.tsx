import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Game } from "../game/Game";
import { Player } from "../game/Player";

export default function WaitingRoomScreen({
  gameId,
  game,
  player
}: {
  gameId: string;
  game: Game;
  player: Player;
}) {
  return (
    <View style={styles.root}>
      <Text>{gameId}</Text>
      <Text>{JSON.stringify(game)}</Text>
      <Text>{player}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 48
  }
});
