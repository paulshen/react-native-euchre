import * as React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  Platform
} from "react-native";
import { Card, CardSuit, cardToString, suitToString } from "../game/Card";

export default function CardView({
  card,
  onPress,
  style
}: {
  card: Card;
  onPress?: () => void;
  style?: StyleProp<TextStyle>;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.root, style]}>
      <Text
        style={[
          styles.cardText,
          card.suit === CardSuit.Diamond || card.suit === CardSuit.Heart
            ? styles.cardTextRed
            : null
        ]}
      >
        {cardToString(card)}
      </Text>
    </TouchableOpacity>
  );
}

export function CardSuitText({
  suit,
  style
}: {
  suit: CardSuit;
  style?: StyleProp<TextStyle>;
}) {
  return (
    <Text
      style={[
        styles.cardText,
        suit === CardSuit.Diamond || suit === CardSuit.Heart
          ? styles.cardTextRed
          : null,
        style
      ]}
    >
      {suitToString(suit)}
    </Text>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#ffffff",
    borderColor: "#666666",
    borderRadius: 4,
    borderWidth: 1,
    width: 52,
    height: 64,
    alignItems: "center",
    justifyContent: "center"
  },
  cardText: {
    fontSize: Platform.OS === "android" ? 18 : 22
  },
  cardTextRed: {
    color: "#ff0000"
  }
});
