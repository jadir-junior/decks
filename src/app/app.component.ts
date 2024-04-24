import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateDeckComponent } from './components/create-deck/create-deck.component';
import { IgxToastModule } from 'igniteui-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CreateDeckComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
