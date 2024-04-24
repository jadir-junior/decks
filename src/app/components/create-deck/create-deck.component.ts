import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Deck, DecksService } from '../../services/decks.service';
import { v4 as uuid } from 'uuid';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-deck',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-deck.component.html',
})
export class CreateDeckComponent {
  constructor(private fb: FormBuilder, private decksService: DecksService) {}

  deckForm = this.fb.group({
    name: ['', [Validators.required]],
  });

  get name(): FormControl {
    return this.deckForm.get('name') as FormControl;
  }

  onSubmit({ value, valid }: FormGroup): void {
    if (!valid) {
      this.deckForm.markAsDirty();
      this.deckForm.markAllAsTouched();
      return;
    }

    const deck: Deck = {
      name: value.name,
      id: uuid(),
      cards: [],
    };

    this.decksService.create(deck);

    this.deckForm.reset();
  }
}
