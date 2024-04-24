import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../models/pagination';
import pokemon from 'pokemontcgsdk';

pokemon.configure({ apiKey: 'ebdbe9b6-5f23-4325-84c4-acb27a196f59' });

interface Attacks {
  name: string;
  cost: string[];
  convertedEnergyCost: number;
  damage: string;
  text: string;
}

interface Weaknesses {
  type: string;
  value: string;
}

interface Resistances {
  type: string;
  value: string;
}

interface Legalities {
  unlimited: string;
}

interface SetImages {
  symbol: string;
  logo: string;
}

interface Set {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: Legalities;
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: SetImages;
}

interface Images {
  small: string;
  large: string;
}

interface HoloFoild {
  low: number;
  mid: number;
  high: number;
  market: number;
  directLow: number;
}

interface TGCPlayerPrice {
  holofoil: HoloFoild;
  reverseHolofoil: HoloFoild;
}

interface TGCPlayer {
  url: string;
  updatedAt: string;
  prices: TGCPlayerPrice;
}

interface CardmarketPrice {
  averageSellPrice: number;
  lowPrice: number;
  trendPrice: number;
  germanProLow: number;
  suggestedPrice: number;
  reverseHoloSell: number;
  reverseHoloLow: number;
  reverseHoloTrend: number;
  lowPriceExPlus: number;
  avg1: number;
  avg7: number;
  avg30: number;
  reverseHoloAvg1: number;
  reverseHoloAvg7: number;
  reverseHoloAvg30: number;
}

interface Cardmarket {
  url: string;
  updatedAt: string;
  prices: CardmarketPrice;
}

export interface Card {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp: string;
  types: string[];
  evolvesFrom: string;
  attacks: Attacks[];
  weaknesses: Weaknesses[];
  resistances: Resistances[];
  retreatCost: string[];
  convertedRetreatCost: number;
  set: Set;
  number: string;
  artist: string;
  rarity: string;
  flavorText: string;
  nationalPokedexNumbers: number[];
  legalities: Legalities;
  images: Images;
  tcgplayer: TGCPlayer;
  cardmarket: Cardmarket;
}

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(private http: HttpClient) {}

  getCards(page = 1, search = ''): Promise<Pagination<Card[]>> {
    return pokemon.card.where({
      q: search ? `name:${search}` : '',
      pageSize: 10,
      page: page,
    });
  }
}
