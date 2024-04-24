import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-name',
  standalone: true,
  imports: [],
  template: `<h1 class="text-5xl font-bold text-white">{{ title }}</h1>`,
})
export class HeaderNameComponent {
  @Input() title?: string;
}
