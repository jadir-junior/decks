import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [],
  template: ` <div class="bg-primary text-black font-bold px-2 rounded">
    {{ value || 0 }}
  </div>`,
})
export class BadgeComponent {
  @Input() value?: number;
}
