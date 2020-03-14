import * as React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { Player, playerToLeft, playerToRight } from "../game/Player";
import { getWinnerOfTrick, Round } from "../game/Round";

function getNumTricksWon(player: Player, round: Round): number {
  return round.finishedTricks.filter(
    trick => getWinnerOfTrick(trick, round.trumpSuit) === player
  ).length;
}

export default function CardTable({
  player,
  playerNames,
  round,
  playerViews,
  centerView,
  style
}: {
  player: Player;
  playerNames: { [player: number]: string } | undefined;
  round: Round;
  playerViews: { [player: number]: React.ReactNode };
  centerView?: React.ReactNode;
  style?: ViewStyle;
}) {
  const leftPlayer = playerToLeft(player);
  const topPlayer = playerToLeft(leftPlayer);
  const rightPlayer = playerToRight(player);

  function renderPlayerName(player: Player, horizontal: boolean) {
    const numTricksWon = getNumTricksWon(player, round);

    return (
      <View
        style={
          horizontal ? styles.playerNameHorizontal : styles.playerNameVertical
        }
      >
        <Text
          style={[
            styles.playerNameText,
            player === round.turnPlayer ? styles.highlightName : null
          ]}
        >
          {playerNames !== undefined ? playerNames[player] : null}
        </Text>
        {player === round.dealer ? (
          <Text style={styles.playerNameText}>(Dealer)</Text>
        ) : null}
        {player === round.trumpCaller && round.trumpCallerAlone ? (
          <Text style={styles.playerNameText}>(Alone)</Text>
        ) : null}
        {numTricksWon > 0 ? (
          <Text style={styles.playerNameText}>[{numTricksWon}]</Text>
        ) : null}
      </View>
    );
  }

  return (
    <View style={[styles.root, style]}>
      <View style={styles.topRow}>
        {renderPlayerName(topPlayer, true)}
        {playerViews[topPlayer]}
      </View>
      <View style={styles.middleRow}>
        <View style={styles.middleSide}>
          {renderPlayerName(leftPlayer, false)}
          {playerViews[leftPlayer]}
        </View>
        <View style={styles.center}>{centerView}</View>
        <View style={[styles.middleSide, styles.middleRight]}>
          {renderPlayerName(rightPlayer, false)}
          {playerViews[rightPlayer]}
        </View>
      </View>
      <View style={styles.bottomRow}>
        {renderPlayerName(player, true)}
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
  playerNameHorizontal: {
    flexDirection: "row"
  },
  playerNameVertical: {},
  playerNameText: { marginRight: 2 },
  highlightName: {
    fontWeight: "700"
  }
});
