import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "../game/Card";
import { dealerDiscardCard, playCard } from "../game/Controller";
import { Game } from "../game/Game";
import { Player } from "../game/Player";
import { Round, TurnAction, getPointsForOutcome } from "../game/Round";
import ActionView from "./ActionView";
import CardView from "./CardView";
import PlayCardTable from "./PlayCardTable";
import { GameIdContext } from "./ReactContext";
import TrumpCallingTable from "./TrumpCallingTable";
import { Team } from "../game/Team";

function ScoreView({ game }: { game: Game }) {
  const teamScores = React.useMemo(() => {
    const teamScores = {
      [Team.One]: 0,
      [Team.Two]: 0
    };
    if (!game.finishedRounds) {
      return teamScores;
    }
    game.finishedRounds.forEach(([team, outcome]) => {
      teamScores[team] += getPointsForOutcome(outcome);
    });
    return teamScores;
  }, [game.finishedRounds]);
  return (
    <View style={styles.scoreView}>
      <View style={styles.scoreUnit}>
        <Text>
          {game.players[0]} {game.players[2]}
        </Text>
        <Text>{teamScores[Team.One]}</Text>
      </View>
      <View style={styles.scoreViewDivider} />
      <View style={styles.scoreUnit}>
        <Text>
          {game.players[1]} {game.players[3]}
        </Text>
        <Text>{teamScores[Team.Two]}</Text>
      </View>
    </View>
  );
}

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
        playCard(gameId, game, round, player, card);
        return;
    }
  };
  return (
    <View style={styles.root}>
      <ScoreView game={game} />
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
  },
  scoreView: {
    flexDirection: "row",
    justifyContent: "center"
  },
  scoreViewDivider: {
    width: 8
  },
  scoreUnit: {
    alignItems: "center"
  }
});
