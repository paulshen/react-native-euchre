import * as React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity
} from "react-native";
import { Card, CardSuit, cardToString } from "../game/Card";

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

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#ffffff",
    borderColor: "#666666",
    borderRadius: 4,
    borderWidth: 1,
    width: 48,
    height: 64,
    alignItems: "center",
    justifyContent: "center"
  },
  cardText: {
    fontSize: 24
  },
  cardTextRed: {
    color: "#ff0000"
  }
});
