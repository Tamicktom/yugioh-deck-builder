type CardNames = string[];

export const cards: CardNames = [
  "https://images.ygoprodeck.com/images/cards/4031928.jpg",
  "https://images.ygoprodeck.com/images/cards/38033121.jpg",
  "https://images.ygoprodeck.com/images/cards/26376390.jpg",
  "https://images.ygoprodeck.com/images/cards/46986421.jpg",
  "https://images.ygoprodeck.com/images/cards/10802916.jpg",
  "https://images.ygoprodeck.com/images/cards/17315396.jpg",
  "https://images.ygoprodeck.com/images/cards/16195942.jpg",
  "https://images.ygoprodeck.com/images/cards/29228529.jpg",
];

/**
 * Generate a list of random cards. It will not repeat cards.
 */

export function getRandomCardList(qtd: number): CardNames {
  const list = new Set<string>();
  while (list.size < qtd) {
    const index = Math.floor(Math.random() * cards.length);
    list.add(cards[index]);
  }
  const listArray = Array.from(list);
  return listArray;
}