import { Component, OnInit, ElementRef, ViewChild, Renderer2, AfterContentInit, Input } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  @Input('title') title: string;
  @Input('bodyText') bodyText: string;

  //@ViewChild('truncator') truncator: ElementRef<HTMLElement>;
  //@ViewChild('body') body: ElementRef<HTMLElement>;
  @ViewChild('body', { static: true }) body: ElementRef<HTMLElement>;
  @ViewChild('truncator', { static: true }) truncator: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {

    let style = window.getComputedStyle(this.body.nativeElement, null);

    let viewableHeight = parseInt(style.getPropertyValue("height"), 10);

    if (this.body.nativeElement.scrollHeight > viewableHeight) {
      //if there text overflow show fadeout trancator
      this.renderer.setStyle(this.truncator.nativeElement, "display", 'block')
    } else {
      // hide trancator
      this.renderer.setStyle(this.truncator.nativeElement, "display", 'none')

    }
  }

}
