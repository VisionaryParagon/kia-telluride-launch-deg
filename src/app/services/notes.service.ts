import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Note } from './classes';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  noteModule = '';
  noteUrl = '';

  constructor(
    private router: Router
  ) { }

  addNoteData() {
    this.router.events.subscribe((ev: any) => {
      if (ev instanceof NavigationEnd) {
        let root = this.router.routerState.snapshot.root;
        while (root) {
          if (root.data && root.data['noteModule']) {
            this.noteModule = root.data['noteModule'];
            this.noteUrl = this.router.routerState.snapshot.url;
            return;
          } else if (root.children && root.children.length) {
            root = root.children[0];
          } else {
            this.noteModule = '';
            this.noteUrl = '';
            return;
          }
        }
      }
    });
  }
}
