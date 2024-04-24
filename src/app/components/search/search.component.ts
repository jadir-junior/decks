import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `<label
      for="search"
      class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >Search</label
    >
    <div class="relative">
      <div
        class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
      >
        <svg
          class="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        type="search"
        id="search"
        class="block w-full p-4 ps-10 text-sm  border border-[#1E1E27] rounded-lg bg-[#1E1E27] focus:ring-blue-500 text-white focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search"
        [formControl]="searchText"
        required
      />
    </div>`,
})
export class SearchComponent implements OnInit {
  @Input() debounce = 1000;

  @Output() onSearchChange = new EventEmitter();

  searchText: FormControl = new FormControl('');

  ngOnInit(): void {
    this.onChange();
  }

  onChange(): void {
    this.searchText.valueChanges
      .pipe(debounceTime(this.debounce))
      .subscribe((text: string) => {
        if (text !== null) {
          this.onSearchChange.emit(text);
        }
      });
  }

  clear(): void {
    this.searchText.reset();
    this.onSearchChange.emit('');
  }
}
