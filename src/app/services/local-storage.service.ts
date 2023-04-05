import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  clear(): void {
    localStorage.clear();
  }

  get(key: string): string | null {
    return localStorage.getItem(key);
  }

  set(key: string, value: string | any): void {
    const item = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, item);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
