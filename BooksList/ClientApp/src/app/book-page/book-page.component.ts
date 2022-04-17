import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppBookListService } from '../services/books-list.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppBook } from '../models/book';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss']
})
export class AppBookPageComponent implements OnInit, OnDestroy {
  public id: number;
  public bookItems: AppBook[];

  private subscription: Subscription = new Subscription();

  constructor(private bookListService: AppBookListService, private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.subscription.add(this.route.params.subscribe(params => {
      this.id = +params.id;
    }));
    this.subscription.add(this.bookListService.getBookItems().subscribe((items) => {
      this.bookItems = items;
    }));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
