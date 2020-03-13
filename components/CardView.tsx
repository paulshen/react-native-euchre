import * as React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity
} from "react-native";
import { Card, cardToString } from "../game/Card";

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
    <TouchableOpacity onPress={onPress} style={style}>
      <Text style={styles.cardView}>{cardToString(card)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardView: {
    fontSize: 24
  }
});
