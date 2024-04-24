import { Component, OnDestroy, OnInit } from '@angular/core';
import { Deck, DecksService } from '../../services/decks.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DeckComponent } from '../../components/deck/deck.component';
import { Subscription } from 'rxjs';
import { CreateDeckComponent } from '../../components/create-deck/create-deck.component';
import { NoItensComponent } from '../../components/no-itens/no-itens.component';

@Component({
  selector: 'app-list-decks',
  standalone: true,
  imports: [CommonModule, DeckComponent, CreateDeckComponent, NoItensComponent],
  templateUrl: './list-decks.component.html',
  styleUrl: './list-decks.component.scss',
})
export class ListDecksComponent implements OnInit, OnDestroy {
  decks: Deck[] = [];
  deckSubscription?: Subscription;

  constructor(private decksServices: DecksService, private router: Router) {}

  ngOnInit(): void {
    this.deckSubscription = this.decksServices.onDecksChange$.subscribe(() => {
      this.findAll();
    });

    this.findAll();
  }

  findAll(): void {
    this.decks = this.decksServices.findAll();
  }

  remove(id: string): void {
    this.decksServices.remove(id);
    this.findAll();
  }

  edit(id: string): void {
    this.router.navigate([`deck/${id}`]);
  }

  details(id: string): void {
    this.router.navigate([`deck/details/${id}`]);
  }

  ngOnDestroy(): void {
    if (this.deckSubscription) {
      this.deckSubscription.unsubscribe();
    }
  }
}
