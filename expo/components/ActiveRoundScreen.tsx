import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "../game/Card";
import { dealerDiscardCard, playCard } from "../game/Controller";
import { Game } from "../game/Game";
import { Player } from "../game/Player";
import { getPointsForOutcome, Round, TurnAction } from "../game/Round";
import { Team } from "../game/Team";
import ActionView from "./ActionView";
import CardList from "./CardList";
import PlayCardTable from "./PlayCardTable";
import { GameIdContext } from "./ReactContext";
import TrumpCallingTable from "./TrumpCallingTable";

function ScoreView({ game }: { game: Game }) {
  const teamScores = React.useMemo(() => {
    const teamScores = {
      [Team.One]: 0,
      [Team.Two]: 0
    };
    if (!game.finishedRounds) {
      return teamScores;
    }
    game.finishedRounds.forEach(({ team, outcome }) => {
      teamScores[team] += getPointsForOutcome(outcome);
    });
    return teamScores;
  }, [game.finishedRounds]);
  if (game.playerNames === undefined) {
    return null;
  }
  return (
    <View style={styles.scoreView}>
      <View style={styles.scoreUnit}>
        <View>
          <Text>{game.playerNames[0]}</Text>
          <Text>{game.playerNames[2]}</Text>
        </View>
        <Text style={styles.scoreText}>{teamScores[Team.One]}</Text>
      </View>
      <View style={styles.scoreViewDivider} />
      <View style={styles.scoreUnit}>
        <Text style={styles.scoreText}>{teamScores[Team.Two]}</Text>
        <View style={styles.scoreNamesRight}>
          <Text>{game.playerNames[1]}</Text>
          <Text>{game.playerNames[3]}</Text>
        </View>
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
      <CardList
        cards={playerCards}
        onCardSelect={onCardSelect}
        style={styles.cards}
      />
      <ActionView round={round} player={player} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 48
  },
  cards: {
    marginTop: 16
  },
  scoreView: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  scoreViewDivider: {
    width: 16
  },
  scoreUnit: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  scoreNamesRight: {
    alignItems: "flex-end"
  },
  scoreText: {
    fontSize: 20
  }
});
