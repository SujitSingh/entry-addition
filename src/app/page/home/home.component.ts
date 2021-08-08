import { Component, OnInit } from '@angular/core';
import { EntryService } from 'src/app/service/entry.service';
import { InputEntry } from '../../models/entry';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  entryInput: string = '';
  currentEntries: Array<InputEntry> = [];

  constructor(private entrySrvc: EntryService) { }
  
  ngOnInit(): void {
    this.currentEntries = this.entrySrvc.readStore();
  }

  addEntry() {
    if (this.entryInput) {
      const entryObj = this.entrySrvc.registerNewEntry(this.entryInput);
      this.currentEntries.push(entryObj);
    }
    this.entryInput = '';
  }

  removeEntry(entry: InputEntry) {
    this.currentEntries = this.entrySrvc.removeEntry(entry);
  }

}
