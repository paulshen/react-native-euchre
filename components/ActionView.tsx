import * as React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { CardSuit } from "../game/Card";
import {
  callAnyTrump,
  callFlippedTrump,
  passAnyTrump,
  passFlippedTrump
} from "../game/Controller";
import { Player } from "../game/Player";
import { Round, TurnAction } from "../game/Round";
import { GameIdContext } from "./ReactContext";

export default function ActionView({
  round,
  player
}: {
  round: Round;
  player: Player;
}) {
  const gameId: string = React.useContext(GameIdContext)!;

  if (round.turnPlayer !== player) {
    return null;
  }

  switch (round.turnAction) {
    case TurnAction.CallFlippedTrump:
      return (
        <View style={styles.root}>
          <Button
            title="Call"
            onPress={() => callFlippedTrump(gameId, round, player)}
          />
          <Button
            title="Pass"
            onPress={() => passFlippedTrump(gameId, round, player)}
          />
        </View>
      );
    case TurnAction.CallAnyTrump:
      const renderSuit = (suit: CardSuit) =>
        round.flippedCard.suit !== suit ? (
          <Button
            title={CardSuit[suit]}
            onPress={() => callAnyTrump(gameId, round, player, suit)}
          />
        ) : null;
      return (
        <View style={styles.root}>
          {renderSuit(CardSuit.Club)}
          {renderSuit(CardSuit.Diamond)}
          {renderSuit(CardSuit.Heart)}
          {renderSuit(CardSuit.Spade)}
          {player !== round.dealer ? (
            <Button
              title="Pass"
              onPress={() => passAnyTrump(gameId, round, player)}
            />
          ) : null}
        </View>
      );
    case TurnAction.DealerDiscardCard:
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
  root: {
    alignItems: "center"
  }
});
