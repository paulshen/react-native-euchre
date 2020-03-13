import * as React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Player } from "../game/Player";
import { Round, TurnAction } from "../game/Round";

export default function ActionView({
  round,
  player
}: {
  round: Round;
  player: Player;
}) {
  if (round.turnPlayer !== player) {
    return null;
  }

  switch (round.turnAction) {
    case TurnAction.CallFlippedTrump:
      return (
        <View style={styles.root}>
          <Button title="Call" onPress={() => {}} />
          <Button title="Pass" onPress={() => {}} />
        </View>
      );
    case TurnAction.CallFlippedTrump:
      return (
        <View style={styles.root}>
          <Button title="Club" onPress={() => {}} />
          <Button title="Diamond" onPress={() => {}} />
          <Button title="Heart" onPress={() => {}} />
          <Button title="Spade" onPress={() => {}} />
        </View>
      );
    case TurnAction.DealerSwapCard:
      return (
        <View style={styles.root}>
          <Text>Choose a card to discard</Text>
        </View>
      );
    case TurnAction.PlayCard:
      return (
        <View style={styles.root}>
          <Text>Play a card</Text>
        </View>
      );
  }
  throw new Error();
}

const styles = StyleSheet.create({
  root: {}
});
