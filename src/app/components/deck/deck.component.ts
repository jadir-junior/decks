import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Deck } from '../../services/decks.service';

@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.scss',
})
export class DeckComponent {
  @Input() deck!: Deck;

  @Output() onEdit = new EventEmitter<string>();
  @Output() onRemove = new EventEmitter<string>();
  @Output() onClick = new EventEmitter<string>();
}
