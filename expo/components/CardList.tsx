import * as React from "react";
import { StyleProp, StyleSheet, TextStyle, View } from "react-native";
import { Card } from "../game/Card";
import { compareArrays } from "../game/Utils";
import CardView from "./CardView";

export default function CardList({
  cards,
  onCardSelect,
  style
}: {
  cards: Array<Card>;
  onCardSelect: (card: Card) => void;
  style?: StyleProp<TextStyle>;
}) {
  const sortedCards = React.useMemo(() => {
    return cards.slice().sort((a, b) => {
      return compareArrays([a.suit, a.rank], [b.suit, b.rank]) ? 1 : -1;
    });
  }, [cards]);
  return (
    <View style={[styles.root, style]}>
      {sortedCards.map((card: Card, i: number) => (
        <CardView
          card={card}
          style={styles.card}
          onPress={() => onCardSelect(card)}
          key={i}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "center"
  },
  card: {
    marginRight: 8
  }
});
