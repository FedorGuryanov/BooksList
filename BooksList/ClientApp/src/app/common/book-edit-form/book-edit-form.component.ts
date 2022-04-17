import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AppBook } from '../../models/book';

const EMPTY_BOOK = {
  id: undefined,
  changeDate: '',
  title: '',
  publishDate: '',
  description: '',
  authors: ''
};

@Component({
  selector: 'app-book-edit-form',
  templateUrl: './book-edit-form.component.html',
  styleUrls: ['./book-edit-form.component.scss']
})
export class AppBookEditFormComponent implements OnChanges {
  @Input()
  public book: AppBook;

  @Input()
  public loading: boolean;

  @Input()
  public submitText: string;

  @Output()
  public bookSubmit = new EventEmitter<AppBook>();

  public bookView: AppBook = {...EMPTY_BOOK};

  constructor() {
  }

  public ngOnChanges(): void {
    if (this.book) {
      this.bookView = {...this.book};
    }
  }

  public onClear(): void {
    this.bookView = this.book ? {...this.book} : {...EMPTY_BOOK};
  }

  public objectEqual(): boolean {
    return this.book ? JSON.stringify(this.book) === JSON.stringify(this.bookView): false;
  }

  public onSubmit(): void {
    this.bookSubmit.emit({...this.bookView, changeDate: new Date().toISOString()});
  }
}
