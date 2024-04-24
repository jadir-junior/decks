import { Component, OnInit } from '@angular/core';
import { Deck, DecksService } from '../../services/decks.service';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../../services/card.service';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from '../../components/badge/badge.component';
import { HeaderNameComponent } from '../../components/header-name/header-name.component';

@Component({
  selector: 'app-deck-details',
  standalone: true,
  imports: [CommonModule, BadgeComponent, HeaderNameComponent],
  templateUrl: './deck-details.component.html',
  styleUrl: './deck-details.component.scss',
})
export class DeckDetailsComponent implements OnInit {
  id: string;
  cards?: Card[];
  deck?: Deck;

  quantityPokemons = 0;
  quantityCouches = 0;
  types: string[] = [];

  constructor(
    private decksService: DecksService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getDeck();
  }

  getDeck() {
    this.deck = this.decksService.getById(this.id);
    this.cards = this.deck?.cards;
    this.quantityCouches = this.getQuantitySuperType('Trainer', this.cards);
    this.quantityPokemons = this.getQuantitySuperType('Pokémon', this.cards);
    if (this.cards.length) {
      this.types = this.getTypes(this.cards);
    }
  }

  private getQuantitySuperType(supertype: string, cards: Card[]): number {
    return cards.filter((card) => card.supertype === supertype).length;
  }

  private getTypes(cards: Card[]): string[] {
    const types = cards
      .map((c) => c.types)
      .filter((f) => f !== undefined)
      .reduce((prev, curr) => prev.concat(curr));
    return this.removeDuplicateTypes(types);
  }

  private removeDuplicateTypes(types: string[]): string[] {
    return types.filter((value, index) => types.indexOf(value) === index);
  }
}
