import firestore from "@react-native-firebase/firestore";
import { Card, CardSuit, isCardGreater } from "./Card";
import { Player, playerToLeft } from "./Player";
import { Round, TurnAction, getWinnerOfTrick } from "./Round";

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
  firestore()
    .doc(`games/${gameId}`)
    .update({
      "currentRound.turnPlayer": playerToLeft(round.dealer),
      "currentRound.turnAction": TurnAction.PlayCard,
      [`currentRound.hands.${player}`]: removeCard(round.hands[player], card)
    });
}

export function playCard(
  gameId: string,
  round: Round,
  player: Player,
  card: Card
) {
  if (round.turnPlayer !== player || round.turnAction !== TurnAction.PlayCard) {
    throw new Error("Not your turn!");
  }

  if (round.currentTrick === null) {
    // First card of the trick sets the suit
    firestore()
      .doc(`games/${gameId}`)
      .update({
        "currentRound.turnPlayer": playerToLeft(player),
        "currentRound.currentTrick": {
          cards: { [player]: card },
          suit: card.suit
        },
        [`currentRound.hands.${player}`]: removeCard(round.hands[player], card)
      });
  } else {
    const updatedTrick = {
      ...round.currentTrick,
      cards: {
        ...round.currentTrick.cards,
        [player]: card
      }
    };
    if (Object.keys(updatedTrick.cards).length === 4) {
      // The trick has ended
      const updatedFinishedTricks = [...round.finishedTricks, updatedTrick];
      if (updatedFinishedTricks.length === 5) {
        // TODO: round ended
      } else {
        firestore()
          .doc(`games/${gameId}`)
          .update({
            "currentRound.turnPlayer": getWinnerOfTrick(
              updatedTrick,
              round.trumpSuit!
            ),
            "currentRound.currentTrick": null,
            "currentRound.finishedTricks": updatedFinishedTricks,
            [`currentRound.hands.${player}`]: removeCard(
              round.hands[player],
              card
            )
          });
      }
    } else {
      // In the middle of a trick (2nd or 3rd)
      firestore()
        .doc(`games/${gameId}`)
        .update({
          "currentRound.turnPlayer": playerToLeft(player),
          "currentRound.currentTrick": {
            ...round.currentTrick,
            cards: { ...round.currentTrick.cards, [player]: card }
          },
          [`currentRound.hands.${player}`]: removeCard(
            round.hands[player],
            card
          )
        });
    }
  }
}
