import * as firebase from "firebase";
import { Card, CardSuit, doesHandHaveSuit, getEffectiveSuit } from "./Card";
import { Game } from "./Game";
import { getTeammate, Player, playerToLeft } from "./Player";
import { Round, TurnAction } from "./Round";

function skipPlayerIfAlone(
  player: Player,
  trumpCaller: Player,
  trumpCallerAlone: boolean
): Player {
  return getTeammate(player) === trumpCaller && trumpCallerAlone
    ? playerToLeft(player)
    : player;
}

export function callFlippedTrump(
  gameId: string,
  round: Round,
  player: Player,
  alone: boolean
) {
  if (
    round.turnPlayer !== player ||
    round.turnAction !== TurnAction.CallFlippedTrump
  ) {
    throw new Error("Not your turn!");
  }
  firebase
    .firestore()
    .doc(`games/${gameId}`)
    .update({
      "currentRound.trumpCaller": player,
      "currentRound.trumpCallerAlone": alone,
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
    firebase
      .firestore()
      .doc(`games/${gameId}`)
      .update({
        "currentRound.turnPlayer": playerToLeft(player),
        "currentRound.turnAction": TurnAction.CallAnyTrump
      });
  } else {
    firebase
      .firestore()
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
  suit: CardSuit,
  alone: boolean
) {
  if (
    round.turnPlayer !== player ||
    round.turnAction !== TurnAction.CallAnyTrump
  ) {
    throw new Error("Not your turn!");
  }
  const playerLeftOfDealer = playerToLeft(round.dealer);
  firebase
    .firestore()
    .doc(`games/${gameId}`)
    .update({
      "currentRound.trumpCaller": player,
      "currentRound.trumpCallerAlone": alone,
      "currentRound.trumpSuit": suit,
      "currentRound.turnPlayer": skipPlayerIfAlone(
        playerLeftOfDealer,
        player,
        alone
      ),
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
  firebase
    .firestore()
    .doc(`games/${gameId}`)
    .update({
      "currentRound.turnPlayer": playerToLeft(player)
    });
}

function removeCard(hand: Array<Card>, card: Card): Array<Card> {
  return hand.filter(c => c.rank !== card.rank || c.suit !== card.suit);
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
  const playerLeftOfDealer = playerToLeft(round.dealer);
  firebase
    .firestore()
    .doc(`games/${gameId}`)
    .update({
      "currentRound.turnPlayer": skipPlayerIfAlone(
        playerLeftOfDealer,
        round.trumpCaller!,
        round.trumpCallerAlone
      ),
      "currentRound.turnAction": TurnAction.PlayCard,
      [`currentRound.hands.${player}`]: removeCard(round.hands[player], card)
    });
}

export function playCard(
  gameId: string,
  game: Game,
  round: Round,
  player: Player,
  card: Card
) {
  if (round.turnPlayer !== player || round.turnAction !== TurnAction.PlayCard) {
    throw new Error("Not your turn!");
  }

  if (round.currentTrick === null) {
    // First card of the trick sets the suit
    firebase
      .firestore()
      .doc(`games/${gameId}`)
      .update({
        "currentRound.turnPlayer": skipPlayerIfAlone(
          playerToLeft(player),
          round.trumpCaller!,
          round.trumpCallerAlone
        ),
        "currentRound.currentTrick": {
          cards: { [player]: card },
          suit: getEffectiveSuit(card, round.trumpSuit!)
        },
        [`currentRound.hands.${player}`]: removeCard(round.hands[player], card)
      });
  } else {
    if (
      getEffectiveSuit(card, round.trumpSuit!) !== round.currentTrick.suit &&
      doesHandHaveSuit(
        round.hands[player],
        round.currentTrick.suit,
        round.trumpSuit!
      )
    ) {
      // There is another card the player can play
      return false;
    }
    const updatedTrick = {
      ...round.currentTrick,
      cards: {
        ...round.currentTrick.cards,
        [player]: card
      }
    };
    if (
      Object.keys(updatedTrick.cards).length +
        (round.trumpCallerAlone ? 1 : 0) ===
      4
    ) {
      firebase
        .firestore()
        .doc(`games/${gameId}`)
        .update({
          "currentRound.currentTrick": updatedTrick,
          [`currentRound.hands.${player}`]: removeCard(
            round.hands[player],
            card
          )
        });
    } else {
      // In the middle of a trick (2nd or 3rd)
      firebase
        .firestore()
        .doc(`games/${gameId}`)
        .update({
          "currentRound.turnPlayer": skipPlayerIfAlone(
            playerToLeft(player),
            round.trumpCaller!,
            round.trumpCallerAlone
          ),
          "currentRound.currentTrick": updatedTrick,
          [`currentRound.hands.${player}`]: removeCard(
            round.hands[player],
            card
          )
        });
    }
  }
}

export function changeName(gameId: string, player: Player, name: string) {
  firebase
    .firestore()
    .doc(`games/${gameId}`)
    .update({
      [`playerNames.${player}`]: name
    });
}
