import * as React from "react";
import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";
import { Card, cardToString } from "../game/Card";
import { Player } from "../game/Player";
import { Round, TurnAction } from "../game/Round";

function CardView({
  card,
  style
}: {
  card: Card;
  style?: StyleProp<TextStyle>;
}) {
  return <Text style={style}>{cardToString(card)}</Text>;
}

function TrumpCallingTable({ round }: { round: Round }) {
  return (
    <View>
      <CardView card={round.flippedCard} />
    </View>
  );
}

export default function ActiveRoundScreen({
  round,
  playerId
}: {
  round: Round;
  playerId: Player;
}) {
  const playerCards = round.hands[playerId];
  return (
    <View style={styles.root}>
      {round.turnAction === TurnAction.PlayCard ? (
        <View />
      ) : (
        <TrumpCallingTable round={round} />
      )}
      <Text>Your Cards</Text>
      <View style={styles.cards}>
        {playerCards.map((card: Card, i) => (
          <CardView card={card} style={styles.card} key={i} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 48
  },
  cards: {
    flexDirection: "row"
  },
  card: {
    marginRight: 8
  }
});
