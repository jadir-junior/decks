import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Deck, DecksService } from '../../services/decks.service';
import { Card, CardService } from '../../services/card.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { duplicateCounter } from '../../utils/array-duplicate-counter';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SearchComponent } from '../../components/search/search.component';
import { HeaderNameComponent } from '../../components/header-name/header-name.component';
import { BadgeComponent } from '../../components/badge/badge.component';
import { IgxToastComponent, IgxToastModule } from 'igniteui-angular';

@Component({
  selector: 'app-edit-deck',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    InfiniteScrollModule,
    SearchComponent,
    HeaderNameComponent,
    BadgeComponent,
    IgxToastModule,
    IgxToastComponent,
  ],
  templateUrl: './edit-deck.component.html',
})
export class EditDeckComponent implements OnInit {
  deck!: Deck;
  cards: Card[] = [];

  deckCards: Card[] = [];

  page = 1;
  search = '';
  errorMessage = '';

  @ViewChild('toast', { read: IgxToastComponent })
  public toast?: IgxToastComponent;

  constructor(
    private route: ActivatedRoute,
    private decksService: DecksService,
    private cardService: CardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.getDeckById(id);
    this.getCards();
  }

  getDeckById(id: string): void {
    this.deck = this.decksService.getById(id);
    if (this.deck.cards?.length) {
      this.deckCards = this.deck.cards;
    }
  }

  getCards(scrolled = false) {
    this.cardService.getCards(this.page, this.search).then((response) => {
      if (scrolled) {
        this.cards = [...this.cards, ...response.data];
      } else {
        this.cards = response.data;
      }
    });
  }

  addCardToDeck(card: Card): void {
    this.deckCards.push(card);
  }

  removeCardToDeck(card: Card, index: number): void {
    const indexCard = this.deckCards.indexOf(card, index);
    if (index > -1) {
      this.deckCards.splice(indexCard, 1);
    }
  }

  countDuplicate(card: Card): number {
    return this.deckCards.filter((value) => value.id === card.id).length;
  }

  saveDeck() {
    this.deck.cards = this.deckCards;
    this.toast?.open();
    if (this.validateIfMaximumFourCardDuplicate()) {
      this.errorMessage = 'Voce tem mais de 4 cartas repetidas';
      return;
    }

    if (this.deckCards.length < 24) {
      this.errorMessage = 'Você precisa de no minímo 24 cartas';
      return;
    }

    if (this.deckCards.length > 60) {
      this.errorMessage = 'Você não pode passar de 60 cartas';
      return;
    }

    this.errorMessage = '';
    this.decksService.update(this.deck);
    this.router.navigate(['/']);
  }

  private validateIfMaximumFourCardDuplicate() {
    const nameCards = this.deckCards.map((value) => value.name);
    const duplicateCards = duplicateCounter(nameCards);
    return duplicateCards.some((value) => value.count > 4);
  }

  onScroll(): void {
    this.page++;
    this.getCards(true);
  }

  onSearch(search: string): void {
    this.page = 1;
    this.search = search;
    this.getCards(false);
  }
}
