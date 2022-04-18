import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AppBookListService } from '../services/books-list.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AppBook, AppBookChange } from '../models/book';
import { navigateToBooksList } from '../helper/navigation';
import { buildChangesFromArchive } from './book-archive.helper';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppBookPageComponent implements OnInit, OnDestroy {
  public id: number;
  public bookItems: AppBook[];
  public bookArchive: AppBook[];
  public bookChanges: AppBookChange[];

  public bookView: AppBook;

  private subscription: Subscription = new Subscription();
  private bookArchiveSubscription: Subscription;

  constructor(
    private bookListService: AppBookListService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.subscription.add(this.route.params.subscribe(params => {
      this.id = +params.id;
      this.updateView();
    }));
    this.subscription.add(this.bookListService.getBookItems().subscribe((items) => {
      this.bookItems = items;
      this.updateView();
    }));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public goToHome(): void {
    navigateToBooksList(this.router);
  }

  public bookSubmit(book: AppBook): void {
    this.bookListService.updateBookItem(book);
  }

  public delete(): void {
    const ok = confirm(`Are you sure you want to delete book ${this.bookView.title}?`);
    if (ok) {
      this.bookListService.deleteBook(this.bookView.id, this.router);
    }
  }

  private updateView(): void {
    this.bookView = this.id && this.bookItems ? this.bookItems.find(item => item.id === this.id) : null;
    if (this.bookView) {
      if (this.bookArchiveSubscription) {
        this.bookArchiveSubscription.unsubscribe();
      }
      this.bookArchiveSubscription = this.bookListService.getBookArchive(this.id).subscribe((items) => {
        this.bookArchive = items;
        this.buildChanges();
        this.cdr.markForCheck();
      });
    }
    this.cdr.markForCheck();
  }

  private buildChanges(): void {
    if (this.bookArchive) {
      this.bookChanges = buildChangesFromArchive(this.bookView, this.bookArchive);
    }
  }
}
