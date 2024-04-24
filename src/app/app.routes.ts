import { Routes } from '@angular/router';
import { ListDecksComponent } from './decks/list-decks/list-decks.component';
import { EditDeckComponent } from './decks/edit-deck/edit-deck.component';
import { DeckDetailsComponent } from './decks/deck-details/deck-details.component';

export const routes: Routes = [
  {
    path: '',
    component: ListDecksComponent,
  },
  {
    path: 'deck/details/:id',
    component: DeckDetailsComponent,
  },
  {
    path: 'deck/:id',
    component: EditDeckComponent,
  },
];
