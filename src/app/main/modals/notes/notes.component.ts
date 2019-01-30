import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { Note, User } from '../../../services/classes';
import { NotesService } from '../../../services/notes.service';
import { UserService } from '../../../services/user.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class NotesComponent implements OnInit {
  user: User = this.userService.getCurrentUser();
  module = this.notesService.noteModule;
  url = this.notesService.noteUrl;
  notes: string;
  moduleNotes: Note = new Note();
  hasModule: Note[];
  allNotes: Note[] = this.user.notes || [];
  editing: number;
  error = false;

  constructor(
    public snackBar: MatSnackBar,
    private notesService: NotesService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this.hasModule = this.user.notes.filter(note => note.module === this.module);

    if (this.hasModule.length > 0) {
      this.notes = this.hasModule[0].notes;
    }
  }

  editNote(i) {
    this.editing = i;
  }

  findAndReplace(object, value, replacevalue) {
    for (const x in object) {
      if (object.hasOwnProperty(x)) {
        if (typeof object[x] === 'object') {
          this.findAndReplace(object[x], value, replacevalue);
        }
        if (object[x] === value) {
          object['notes'] = replacevalue;
          return;
        }
      }
    }
  }

  updateNotes(user) {
    this.userService.updateUser(user)
      .subscribe(
        res => {
          // Update current user in UserService
          this.userService.setCurrentUser(res);

          this.snackBar.open('Notes Saved!', '', {
            duration: 2500,
            panelClass: 'snackSuccess'
          });
        },
        err => this.showError()
      );
  }

  save(notes) {
    if (notes) {
      this.moduleNotes.module = this.module;
      this.moduleNotes.notes = notes;
      this.moduleNotes.url = this.url;

      if (this.hasModule.length > 0) {
        this.findAndReplace(this.user.notes, this.module, notes);
        this.updateNotes(this.user);
      } else {
        this.user.notes.push(this.moduleNotes);
        this.updateNotes(this.user);
      }
    } else {
      this.snackBar.open('You didn’t write any notes...', '', {
        duration: 2500,
        panelClass: 'snackError'
      });
    }

    return false;
  }

  saveInline(data) {
    this.findAndReplace(this.user.notes, data.module, data.notes);
    this.updateNotes(this.user);
    this.getNotes();
    this.editing = null;

    return false;
  }

  showError() {
    this.error = true;
  }

  hideError() {
    this.error = false;
  }
}
