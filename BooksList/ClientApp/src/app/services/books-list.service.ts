import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { BASE_URL } from '../constants';
import { AppBook } from '../models/book';
import { navigateToBooksList } from '../helper/navigation';
import { Router } from '@angular/router';

@Injectable()
export class AppBookListService {

  private books: BehaviorSubject<AppBook[]> = new BehaviorSubject(null);
  private bookArchive: Record<number, BehaviorSubject<AppBook[]>> = {};
  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
  }

  public fetchBookItems(): void {
    this.isLoading.next(true);
    this.http.get<AppBook[]>(BASE_URL + 'api/bookitems')
    .subscribe((res) => {
        this.isLoading.next(false);
        this.books.next(res);
    }, () => {
        this.isLoading.next(false);
    });
  }

  public createBookItem(book: AppBook): void {
    this.isLoading.next(true);
    this.http.post<AppBook[]>(BASE_URL + 'api/bookitems', book)
      .subscribe((res) => {
        this.isLoading.next(false);
        window.alert(`Book ${book.title} created!`);
        this.fetchBookItems();
      }, () => {
        this.isLoading.next(false);
      });
  }

  public updateBookItem(book: AppBook): void {
    this.isLoading.next(true);
    this.http.put<AppBook[]>(BASE_URL + 'api/bookitems/' + book.id, book)
      .subscribe((res) => {
        this.isLoading.next(false);
        this.fetchBookItems();
        this.fetchBookArchive(book.id);
      }, () => {
        this.isLoading.next(false);
      });
  }

  public getBookItems(): Observable<AppBook[]> {
    if (!this.books.getValue() && !this.isLoading.getValue()) {
      this.fetchBookItems();
    }
    return this.books.asObservable();
  }

  public deleteBook(id: number, router: Router): void {
    this.isLoading.next(true);
    this.http.delete<void>(BASE_URL + 'api/bookitems/' + id)
      .subscribe(() => {
        this.isLoading.next(false);
        this.fetchBookItems();
        navigateToBooksList(router);
      }, () => {
        this.isLoading.next(false);
      });
  }

  public fetchBookArchive(id: number): void {
    if (!this.bookArchive[id]) {
      this.bookArchive[id] = new BehaviorSubject<AppBook[]>(null);
    }
    this.isLoading.next(true);
    this.http.get<AppBook[]>(BASE_URL + 'api/archive/bookarchiveitems/' + id)
    .subscribe((res) => {
        this.isLoading.next(false);
        this.bookArchive[id].next(res);
    }, () => {
        this.isLoading.next(false);
    });
  }

  public getBookArchive(id: number): Observable<AppBook[]> {
    if (!this.bookArchive[id]) {
      this.bookArchive[id] = new BehaviorSubject<AppBook[]>(null);
      this.fetchBookArchive(id);
    }
    return this.bookArchive[id].asObservable();
  }

  public getIsLoading(): Observable<boolean> {
    return this.isLoading.asObservable();
  }
}
