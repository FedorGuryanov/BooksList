import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { BASE_URL } from '../constants';
import { AppBook } from '../models/book';

@Injectable()
export class AppBookListService {

  private books: BehaviorSubject<AppBook[]> = new BehaviorSubject(null);
  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
  }

  public fetchBookItems(): void {
    this.isLoading.next(true);
    // this.http.get<AppBook[]>(BASE_URL + 'api/bookitems')
    //   .subscribe((res) => {
    //     this.isLoading.next(false);
    //     this.books.next(res);
    //   }, () => {
    //     this.isLoading.next(false);
    //   });
    setTimeout(() => {
      this.isLoading.next(false);
      this.books.next([{
        id: 1,
        changeDate: '2022-04-17T08:47:07.812858Z',
        title: 'Test Book2 New Last',
        publishDate: '2022-04-10T11:53:56.481313+03:00',
        description: 'Next 1 Description',
        authors: 'Guryanov F.A.'
      }, {
        id: 2,
        changeDate: '2022-04-17T08:47:07.812858Z',
        title: 'Test Book2333 New Last',
        publishDate: '2022-04-10T11:53:56.481313+03:00',
        description: 'Next 2 Description',
        authors: 'Guryanov F.A.'
      }]);
    }, 1000);
  }

  public createBookItem(book: AppBook): void {
    this.isLoading.next(true);
    this.http.post<AppBook[]>(BASE_URL + 'api/bookitems', book)
      .subscribe((res) => {
        this.isLoading.next(false);
        this.fetchBookItems();
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

  public getIsLoading(): Observable<boolean> {
    return this.isLoading.asObservable();
  }
}
