import * as React from "react";
import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";
import { Card, cardToString } from "../game/Card";
import { didPlayerGo, Player } from "../game/Player";
import { Round, TurnAction } from "../game/Round";
import ActionView from "./ActionView";
import CardTable from "./CardTable";

function CardView({
  card,
  style
}: {
  card: Card;
  style?: StyleProp<TextStyle>;
}) {
  return <Text style={style}>{cardToString(card)}</Text>;
}

function renderCallStatus(player: Player, round: Round) {
  if (player === round.turnPlayer) {
    return <Text>Waiting</Text>;
  }
  return didPlayerGo(player, round.dealer, round.turnPlayer) ? (
    <Text>Pass</Text>
  ) : null;
}

function TrumpCallingTable({
  round,
  player
}: {
  round: Round;
  player: Player;
}) {
  return (
    <CardTable
      player={player}
      playerViews={{
        [Player.One]: renderCallStatus(Player.One, round),
        [Player.Two]: renderCallStatus(Player.Two, round),
        [Player.Three]: renderCallStatus(Player.Three, round),
        [Player.Four]: renderCallStatus(Player.Four, round)
      }}
      centerView={<CardView card={round.flippedCard} />}
    />
  );
}

export default function ActiveRoundScreen({
  round,
  player
}: {
  round: Round;
  player: Player;
}) {
  const playerCards = round.hands[player];
  return (
    <View style={styles.root}>
      {round.turnAction === TurnAction.PlayCard ? (
        <View />
      ) : (
        <TrumpCallingTable round={round} player={player} />
      )}
      <ActionView round={round} player={player} />
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
