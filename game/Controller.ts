import firestore from "@react-native-firebase/firestore";
import { CardSuit } from "./Card";
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
      "currentRound.trunAction": TurnAction.DealerSwapCard
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
        "currentRound.trunAction": TurnAction.CallAnyTrump
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
      "currentRound.trunAction": TurnAction.PlayCard
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
