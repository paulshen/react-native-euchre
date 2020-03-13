import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Player, playerToLeft, playerToRight } from "../game/Player";

export default function CardTable({
  player,
  playerViews,
  centerView
}: {
  player: Player;
  playerViews: { [player: number]: React.ReactNode };
  centerView?: React.ReactNode;
}) {
  const leftPlayer = playerToLeft(player);
  const topPlayer = playerToLeft(leftPlayer);
  const rightPlayer = playerToRight(player);
  return (
    <View style={styles.root}>
      <View style={styles.topRow}>{playerViews[topPlayer]}</View>
      <View style={styles.middleRow}>
        <View style={styles.middleSide}>{playerViews[leftPlayer]}</View>
        <View style={styles.center}>{centerView}</View>
        <View style={styles.middleSide}>{playerViews[rightPlayer]}</View>
      </View>
      <View style={styles.bottomRow}>{playerViews[player]}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {},
  topRow: {
    alignItems: "center",
    height: 48
  },
  middleRow: {
    flexDirection: "row",
    height: 48
  },
  middleSide: {
    width: 64
  },
  center: {
    flex: 1,
    alignItems: "center"
  },
  bottomRow: {
    alignItems: "center",
    height: 48
  }
});
