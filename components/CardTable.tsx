import * as React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { Player, playerToLeft, playerToRight } from "../game/Player";

export default function CardTable({
  player,
  playerNames,
  highlightPlayer,
  playerViews,
  dealer,
  centerView,
  style
}: {
  player: Player;
  playerNames: Array<string | null>;
  highlightPlayer?: Player;
  playerViews: { [player: number]: React.ReactNode };
  dealer?: Player;
  centerView?: React.ReactNode;
  style?: ViewStyle;
}) {
  const leftPlayer = playerToLeft(player);
  const topPlayer = playerToLeft(leftPlayer);
  const rightPlayer = playerToRight(player);

  function renderPlayerName(player: Player) {
    return (
      <Text style={[player === highlightPlayer ? styles.highlightName : null]}>
        {playerNames[player]}
        {player === dealer ? " (Dealer)" : null}
      </Text>
    );
  }

  return (
    <View style={[styles.root, style]}>
      <View style={styles.topRow}>
        {renderPlayerName(topPlayer)}
        {playerViews[topPlayer]}
      </View>
      <View style={styles.middleRow}>
        <View style={styles.middleSide}>
          {renderPlayerName(leftPlayer)}
          {playerViews[leftPlayer]}
        </View>
        <View style={styles.center}>{centerView}</View>
        <View style={[styles.middleSide, styles.middleRight]}>
          {renderPlayerName(rightPlayer)}
          {playerViews[rightPlayer]}
        </View>
      </View>
      <View style={styles.bottomRow}>
        {renderPlayerName(player)}
        {playerViews[player]}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#00c000",
    padding: 16
  },
  topRow: {
    alignItems: "center",
    justifyContent: "space-between",
    height: 96
  },
  middleRow: {
    flexDirection: "row",
    height: 96
  },
  middleSide: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1
  },
  middleRight: {
    flexDirection: "row-reverse"
  },
  center: {
    width: 96,
    height: 96,
    alignItems: "center",
    justifyContent: "center"
  },
  bottomRow: {
    alignItems: "center",
    flexDirection: "column-reverse",
    justifyContent: "space-between",
    height: 96
  },
  highlightName: {
    fontWeight: "700"
  }
});
