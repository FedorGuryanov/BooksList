import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppBookListService } from '../services/books-list.service';
import { AppBook } from '../models/book';
import { Router } from '@angular/router';
import { navigateToBook } from '../helper/navigation';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class AppBooksListComponent implements OnInit, OnDestroy {
  public searchValue: string;
  public bookItems: AppBook[];
  public bookItemsFiltered: AppBook[];
  public bookItemsLoading: boolean;

  private subscription: Subscription = new Subscription();

  constructor(private bookListService: AppBookListService, private router: Router) {
  }

  public ngOnInit(): void {
    this.subscription.add(this.bookListService.getIsLoading().subscribe((loading) => {
      this.bookItemsLoading = loading;
    }));
    this.subscription.add(this.bookListService.getBookItems().subscribe((items) => {
      this.bookItems = items;
      this.onSearch();
    }));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onSearch(): void {
    if (this.searchValue) {
      const search = this.searchValue.toLowerCase();
      this.bookItemsFiltered = this.bookItems.filter((item) => item.title.toLowerCase().includes(search));
    } else {
      this.bookItemsFiltered = this.bookItems;
    }
  }

  public bookClick(id: string): void {
    navigateToBook(this.router, id);
  }

  public createBook(book: AppBook): void {
    this.bookListService.createBookItem(book);
  }
}
