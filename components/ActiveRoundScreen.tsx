import * as React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View
} from "react-native";
import { Card, cardToString } from "../game/Card";
import { dealerDiscardCard } from "../game/Controller";
import { didPlayerGo, Player } from "../game/Player";
import { Round, TurnAction } from "../game/Round";
import ActionView from "./ActionView";
import CardTable from "./CardTable";
import { GameIdContext } from "./ReactContext";

function CardView({
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
      <Text>{cardToString(card)}</Text>
    </TouchableOpacity>
  );
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
  const gameId = React.useContext(GameIdContext)!;
  const playerCards = round.hands[player];
  const onCardSelect = (card: Card) => {
    if (round.turnPlayer !== player) {
      return;
    }
    switch (round.turnAction) {
      case TurnAction.DealerDiscardCard:
        dealerDiscardCard(gameId, round, player, card);
        return;
    }
  };
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
          <CardView
            card={card}
            style={styles.card}
            onPress={() => onCardSelect(card)}
            key={i}
          />
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
