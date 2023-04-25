import { Injectable } from '@angular/core';

export enum StorageKeys {
  ORDER_BY = 'orderBy',
  PREFERENCES = 'preferences',
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  clear(): void {
    localStorage.clear();
  }

  get(key: string): string | null {
    return localStorage.getItem(key);
  }

  set(key: string, value: string | number | Object): void {
    const item = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, item);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
