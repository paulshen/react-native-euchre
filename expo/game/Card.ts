import { compareArrays } from "./Utils";

export enum CardSuit {
  Heart,
  Spade,
  Diamond,
  Club
}

export enum CardRank {
  Nine = 9,
  Ten,
  Jack,
  Queen,
  King,
  Ace
}

export type Card = {
  suit: CardSuit;
  rank: CardRank;
};

function createAllCards(): Array<Card> {
  const cards = [];
  for (let s = CardSuit.Heart; s <= CardSuit.Club; s++) {
    for (let r = CardRank.Nine; r <= CardRank.Ace; r++) {
      cards.push({
        suit: s,
        rank: r
      });
    }
  }
  return cards;
}

function shuffleArrayInPlace<T>(array: Array<T>): Array<T> {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export function deal(): [
  Array<Card>,
  Array<Card>,
  Array<Card>,
  Array<Card>,
  Card
] {
  const shuffledCards = shuffleArrayInPlace(createAllCards());
  return [
    shuffledCards.slice(0, 5),
    shuffledCards.slice(5, 10),
    shuffledCards.slice(10, 15),
    shuffledCards.slice(15, 20),
    shuffledCards[20]
  ];
}

export function suitToString(suit: CardSuit): string {
  switch (suit) {
    case CardSuit.Club:
      return "♣";
    case CardSuit.Diamond:
      return "♦";
    case CardSuit.Heart:
      return "♥";
    case CardSuit.Spade:
      return "♠";
  }
}

function rankToString(rank: CardRank): string {
  switch (rank) {
    case CardRank.Nine:
      return "9";
    case CardRank.Ten:
      return "10";
    case CardRank.Jack:
      return "J";
    case CardRank.Queen:
      return "Q";
    case CardRank.King:
      return "K";
    case CardRank.Ace:
      return "A";
  }
}

export function cardToString(card: Card): string {
  return `${rankToString(card.rank)}${suitToString(card.suit)}`;
}

function isRightBower(card: Card, trump: CardSuit) {
  return card.suit === trump && card.rank === CardRank.Jack;
}

function isLeftBower(card: Card, trump: CardSuit) {
  if (card.rank !== CardRank.Jack) {
    return false;
  }
  return (
    (card.suit === CardSuit.Club && trump === CardSuit.Spade) ||
    (card.suit === CardSuit.Spade && trump === CardSuit.Club) ||
    (card.suit === CardSuit.Heart && trump === CardSuit.Diamond) ||
    (card.suit === CardSuit.Diamond && trump === CardSuit.Heart)
  );
}

export function isCardGreater(
  card1: Card | undefined,
  card2: Card | undefined,
  suit: CardSuit,
  trump: CardSuit
): boolean {
  if (card1 === undefined) {
    return false;
  }
  if (card2 === undefined) {
    return true;
  }
  const card1Values = [
    isRightBower(card1, trump)
      ? 5
      : isLeftBower(card1, trump)
      ? 4
      : card1.suit === trump
      ? 3
      : card1.suit === suit
      ? 2
      : 1,
    card1.rank
  ];
  const card2Values = [
    isRightBower(card2, trump)
      ? 5
      : isLeftBower(card2, trump)
      ? 4
      : card2.suit === trump
      ? 3
      : card2.suit === suit
      ? 2
      : 1,
    card2.rank
  ];
  return compareArrays(card1Values, card2Values);
}

export function getEffectiveSuit(card: Card, trumpSuit: CardSuit) {
  if (card.rank !== CardRank.Jack) {
    return card.suit;
  }
  if (card.suit === CardSuit.Club && trumpSuit === CardSuit.Spade) {
    return CardSuit.Spade;
  }
  if (card.suit === CardSuit.Spade && trumpSuit === CardSuit.Club) {
    return CardSuit.Club;
  }
  if (card.suit === CardSuit.Heart && trumpSuit === CardSuit.Diamond) {
    return CardSuit.Diamond;
  }
  if (card.suit === CardSuit.Diamond && trumpSuit === CardSuit.Heart) {
    return CardSuit.Heart;
  }
  return card.suit;
}

export function doesHandHaveSuit(
  hand: Array<Card>,
  suit: CardSuit,
  trumpSuit: CardSuit
) {
  return hand.some(card => getEffectiveSuit(card, trumpSuit) === suit);
}
