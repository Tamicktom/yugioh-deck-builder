interface CardSet {
  set_name: string;
  set_code: string;
  set_rarity: string;
  set_rarity_code: string;
  set_price: string;
}

interface BanlistInfo {
  ban_tcg: string;
  ban_ocg: string;
  ban_goat: string;
}

interface CardImage {
  id: number;
  image_url: string;
  image_url_small: string;
  image_url_cropped: string;
}

interface CardPrice {
  cardmarket_price: string;
  tcgplayer_price: string;
  ebay_price: string;
  amazon_price: string;
  coolstuffinc_price: string;
}

export interface CardData {
  id: number | string;
  name: string;
  type: string;
  frameType: string;
  desc: string;
  race: string;
  card_sets: CardSet[];
  banlist_info: BanlistInfo;
  card_images: CardImage[];
  card_prices: CardPrice[];
}

export interface APIResponse {
  data: CardData[];
}