import { Component, OnInit } from '@angular/core';
import { AppBookListService } from './books-list.service';
import { AppBook } from '../models/book';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class AppBooksListComponent implements OnInit {
  public searchValue: string;
  public bookItems: AppBook[] | null;
  public bookItemsFiltered: AppBook[] | null;
  public bookItemsLoading: boolean;

  constructor(private bookListService: AppBookListService) {
  }

  public ngOnInit(): void {
    this.bookListService.getIsLoading().subscribe((loading) => this.bookItemsLoading = loading);
    this.bookListService.getBookItems().subscribe((items) => {
      this.bookItems = items;
      this.onSearch();
    });
  }

  public onSearch(): void {
    if (this.searchValue) {
      const search = this.searchValue.toLowerCase();
      this.bookItemsFiltered = this.bookItems.filter((item) => item.title.toLowerCase().includes(search));
    } else {
      this.bookItemsFiltered = this.bookItems;
    }
  }

  public createBook(book: AppBook): void {
    this.bookListService.createBookItem(book);
  }
}
