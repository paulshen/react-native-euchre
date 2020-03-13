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
      return "♢";
    case CardSuit.Heart:
      return "♡";
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

function compareArrays(a1: Array<number>, a2: Array<number>): boolean {
  for (let i = 0; i < a1.length; i++) {
    if (a1[i] > a2[i]) {
      return true;
    }
    if (a1[i] < a2[i]) {
      return false;
    }
  }
  return false;
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
  card1: Card,
  card2: Card,
  suit: CardSuit,
  trump: CardSuit
): boolean {
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
