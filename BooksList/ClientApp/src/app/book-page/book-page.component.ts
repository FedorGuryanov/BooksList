import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppBookListService } from '../services/books-list.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AppBook } from '../models/book';
import { navigateToBooksList } from '../helper/navigation';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss']
})
export class AppBookPageComponent implements OnInit, OnDestroy {
  public id: number;
  public bookItems: AppBook[];

  public bookView: AppBook;

  private subscription: Subscription = new Subscription();

  constructor(private bookListService: AppBookListService, private route: ActivatedRoute, private router: Router) {
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

  private updateView(): void {
    this.bookView = this.id && this.bookItems ? this.bookItems.find(item => item.id === this.id) : null;
  }
}
