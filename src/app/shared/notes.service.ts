import { Injectable } from '@angular/core';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})


export class NotesService {

  notes: Note[] = new Array<Note>();
  data: Note[] = [
    {
      title: "Test 1", body: "Purpose"
    }, {
      title: "Test 2", body: "Purpose"
    }, {
      title: "Test 3", body: "Purpose"
    }
  ]

  constructor() {
    this.notes = this.data
  }

  get(id: number): Note {
    return this.notes[id];
  }

  getId(note: Note) {
    this.notes.indexOf(note);
  }

  getAll() {
    return this.notes;
  }

  add(note: Note): number {
    let length = this.notes.push(note);
    let index = length - 1;
    return index;
  }

  update(id: number, title: string, body: string) {

    let note = this.notes[id];
    note.title = title;
    note.body = body;
  }

  delete(id: number) {
    this.notes.splice(id, 1);
  }


}
