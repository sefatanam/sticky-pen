import { Component, OnInit, Optional } from '@angular/core';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
  animations: [
    trigger('itemAnim', [
      // Entry

      transition('void=>*', [
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          'margin-bottom': 0,
          paddingTop: 0,
          paddingRight: 0,
          paddingLeft: 0,
          paddingBottom: 0,
        }),
        // anim

        animate('50ms', style({
          height: '*',

          'margin-bottom': '*',
          paddingTop: '*',
          paddingRight: '*',
          paddingLeft: '*',
          paddingBottom: '*',
        })),

        animate(220)
      ]),


      transition('*=>void', [
        // firstt scale up
        animate(50, style({
          transform: 'scale(1.05)'
        })),

        // bring back to normal size
        animate(50, style({
          transform: 'scale(1)',
          opacity: 0.75
        })),

        // scale down fade up

        animate('120ms ease-out', style({
          transform: 'scale(0.68)',
          opacity: 0
        })),

        // animate spacing
        animate('150ms ease-out', style({
          height: 0,
          opacity: 0,
          'margin-bottom': 0,
          paddingTop: 0,
          paddingRight: 0,
          paddingLeft: 0,
          paddingBottom: 0,
        })),
      ])
    ]),

    trigger('listAnim', [
      transition('*=>*', [
        query(':enter', [
          style({
            opacity: 0,
            height: 0
          }),

          stagger(100, [
            animate('0.2s ease')
          ])
        ], { optional: true })
      ])
    ])


  ]
})
export class NoteListComponent implements OnInit {

  private notes: Note[] = new Array<Note>();
  public filteredNotes: Note[] = new Array<Note>();
  constructor(private service: NotesService) { }

  ngOnInit(): void {
    this.notes = this.service.getAll();
    this.filteredNotes = this.notes;
  }


  deleteNote(id: number) {
    this.service.delete(id);
  }

  filter(query: string) {
    let searchResult: Note[] = new Array<Note>();
    query = query.toLowerCase().trim();
    let terms: string[] = query.split(' ');
    terms = this.removeDuplicate(terms);
    // relevent result
    terms.forEach(term => {
      const result: Note[] = this.releventNotes(term);
      searchResult = [...searchResult, ...result];
    });

    const uniqueResult = this.removeDuplicate(searchResult);
    this.filteredNotes = uniqueResult;
  }


  removeDuplicate(arr: Array<any>): Array<any> {
    const result: Set<any> = new Set<any>();
    arr.forEach(e => result.add(e));
    return Array.from(result);
  }


  releventNotes(query: any): Array<Note> {
    query = query.toLowerCase().trim();
    const relevents = this.notes.filter(note => {
      if (note.title && note.title.toLowerCase().includes(query)) {
        return true;
      }

      if (note.title && note.body.toLowerCase().includes(query)) {
        return true;
      }
      return false;
    });
    return relevents;
  }

}
