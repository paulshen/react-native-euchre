import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Player, playerToLeft, playerToRight } from "../game/Player";

export default function CardTable({
  player,
  playerNames,
  playerViews,
  centerView
}: {
  player: Player;
  playerNames: Array<string | null>;
  playerViews: { [player: number]: React.ReactNode };
  centerView?: React.ReactNode;
}) {
  const leftPlayer = playerToLeft(player);
  const topPlayer = playerToLeft(leftPlayer);
  const rightPlayer = playerToRight(player);
  return (
    <View style={styles.root}>
      <View style={styles.topRow}>
        <Text>{playerNames[topPlayer]}</Text>
        {playerViews[topPlayer]}
      </View>
      <View style={styles.middleRow}>
        <View style={styles.middleSide}>
          <Text>{playerNames[leftPlayer]}</Text>
          {playerViews[leftPlayer]}
        </View>
        <View style={styles.center}>{centerView}</View>
        <View style={[styles.middleSide, styles.middleRight]}>
          {playerViews[rightPlayer]}
          <Text>{playerNames[rightPlayer]}</Text>
        </View>
      </View>
      <View style={styles.bottomRow}>
        {playerViews[player]}
        <Text>{playerNames[player]}</Text>
      </View>
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
    flexDirection: "row",
    width: 64
  },
  middleRight: {
    justifyContent: "flex-end"
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
