import { Injectable } from '@angular/core';
import { InputEntry } from '../models/entry';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  storeKey = 'entries';

  constructor() { }

  registerNewEntry(entry: string): InputEntry {
    let newEntry = {
      id: Date.now(),
      entry
    }
    this.storeNewEntry(newEntry);
    return newEntry;
  }

  readStore(): Array<InputEntry> {
    const storeEntries = localStorage.getItem(this.storeKey) || '[]';
    return JSON.parse(storeEntries);
  }

  storeNewEntry(entry: InputEntry) {
    const currentEntries = this.readStore();
    currentEntries.push(entry);
    this.saveEntriesArray(currentEntries);
  }

  saveEntriesArray(entries: Array<InputEntry>) {
    localStorage.setItem(this.storeKey, JSON.stringify(entries));
  }

  removeEntry(entry: InputEntry): Array<InputEntry> {
    const currentEntries = this.readStore();
    const remainedEntries = currentEntries.filter(thisEntry => {
      return thisEntry.id !== entry.id;
    });
    this.saveEntriesArray(remainedEntries);
    return remainedEntries;
  }
}
