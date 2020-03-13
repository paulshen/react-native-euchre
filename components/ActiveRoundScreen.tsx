import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "../game/Card";
import { dealerDiscardCard, playCard } from "../game/Controller";
import { Game } from "../game/Game";
import { Player } from "../game/Player";
import { Round, TurnAction } from "../game/Round";
import ActionView from "./ActionView";
import CardView from "./CardView";
import PlayCardTable from "./PlayCardTable";
import { GameIdContext } from "./ReactContext";
import TrumpCallingTable from "./TrumpCallingTable";

export default function ActiveRoundScreen({
  game,
  round,
  player
}: {
  game: Game;
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
      case TurnAction.PlayCard:
        playCard(gameId, round, player, card);
        return;
    }
  };
  return (
    <View style={styles.root}>
      {round.turnAction === TurnAction.PlayCard ? (
        <PlayCardTable game={game} round={round} player={player} />
      ) : (
        <TrumpCallingTable game={game} round={round} player={player} />
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
