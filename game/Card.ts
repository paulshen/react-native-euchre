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
    shuffledCards.slice(0, 4),
    shuffledCards.slice(5, 9),
    shuffledCards.slice(10, 14),
    shuffledCards.slice(15, 19),
    shuffledCards[20]
  ];
}
