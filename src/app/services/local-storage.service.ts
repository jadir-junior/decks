import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService<T> {
  constructor() {}

  setItem(key: string, value: T[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): T[] {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return [];
  }
}
