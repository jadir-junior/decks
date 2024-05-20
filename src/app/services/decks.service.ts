import { Subject } from 'rxjs';
import { Card } from './card.service';
import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';

const DECKS = 'DECKS';

export interface Deck {
  name: string;
  id: string;
  cards: Card[];
}

@Injectable({
  providedIn: 'root',
})
export class DecksService {
  private onDecksChange = new Subject<void>();
  onDecksChange$ = this.onDecksChange.asObservable();

  constructor(private LS: LocalStorageService<Deck>) {}

  create(deck: Deck): void {
    const decks = this.LS.getItem(DECKS);
    decks.push(deck);
    this.LS.setItem(DECKS, decks);
    this.onDecksChange.next();
  }

  findAll(): Deck[] {
    return this.LS.getItem(DECKS);
  }

  remove(id: string): void {
    const decks = this.LS.getItem(DECKS);
    const newDecks = decks.filter((value) => value.id !== id);
    this.LS.setItem(DECKS, newDecks);
  }

  getById(id: string): Deck {
    const decks = this.LS.getItem(DECKS);
    const deck = decks.find((value) => value.id === id) as Deck;
    return deck;
  }

  update(deck: Deck): void {
    this.remove(deck.id);
    this.create(deck);
  }
}
