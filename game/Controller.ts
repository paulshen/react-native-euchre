import firestore from "@react-native-firebase/firestore";
import { Card, CardSuit } from "./Card";
import { Player, playerToLeft } from "./Player";
import { Round, TurnAction } from "./Round";

export function callFlippedTrump(gameId: string, round: Round, player: Player) {
  if (
    round.turnPlayer !== player ||
    round.turnAction !== TurnAction.CallFlippedTrump
  ) {
    throw new Error("Not your turn!");
  }
  firestore()
    .doc(`games/${gameId}`)
    .update({
      "currentRound.trumpCaller": player,
      "currentRound.trumpSuit": round.flippedCard.suit,
      "currentRound.turnPlayer": round.dealer,
      "currentRound.turnAction": TurnAction.DealerDiscardCard,
      [`currentRound.hands.${round.dealer}`]: [
        ...round.hands[round.dealer],
        round.flippedCard
      ]
    });
}

export function passFlippedTrump(gameId: string, round: Round, player: Player) {
  if (
    round.turnPlayer !== player ||
    round.turnAction !== TurnAction.CallFlippedTrump
  ) {
    throw new Error("Not your turn!");
  }
  if (player === round.dealer) {
    firestore()
      .doc(`games/${gameId}`)
      .update({
        "currentRound.turnPlayer": playerToLeft(player),
        "currentRound.turnAction": TurnAction.CallAnyTrump
      });
  } else {
    firestore()
      .doc(`games/${gameId}`)
      .update({
        "currentRound.turnPlayer": playerToLeft(player)
      });
  }
}

export function callAnyTrump(
  gameId: string,
  round: Round,
  player: Player,
  suit: CardSuit
) {
  if (
    round.turnPlayer !== player ||
    round.turnAction !== TurnAction.CallAnyTrump
  ) {
    throw new Error("Not your turn!");
  }
  firestore()
    .doc(`games/${gameId}`)
    .update({
      "currentRound.trumpCaller": player,
      "currentRound.trumpSuit": suit,
      "currentRound.turnPlayer": playerToLeft(round.dealer),
      "currentRound.turnAction": TurnAction.PlayCard
    });
}

export function passAnyTrump(gameId: string, round: Round, player: Player) {
  if (
    round.turnPlayer !== player ||
    round.turnAction !== TurnAction.CallAnyTrump
  ) {
    throw new Error("Not your turn!");
  }
  if (round.dealer === player) {
    throw new Error("Stick the dealer!");
  }
  firestore()
    .doc(`games/${gameId}`)
    .update({
      "currentRound.turnPlayer": playerToLeft(player)
    });
}

export function dealerDiscardCard(
  gameId: string,
  round: Round,
  player: Player,
  card: Card
) {
  if (
    round.turnPlayer !== player ||
    round.dealer !== player ||
    round.turnAction !== TurnAction.DealerDiscardCard
  ) {
    throw new Error("Not your turn!");
  }
  firestore()
    .doc(`games/${gameId}`)
    .update({
      "currentRound.turnPlayer": playerToLeft(round.dealer),
      "currentRound.turnAction": TurnAction.PlayCard,
      [`currentRound.hands.${player}`]: round.hands[player].filter(
        c => c.rank !== card.rank || c.suit !== card.suit
      ),
      "currentRound.currentTrick": {}
    });
}
