import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { AppBook } from '../../models/book';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-books-list-table',
  templateUrl: './books-list-table.component.html',
  styleUrls: ['./books-list-table.component.scss']
})
export class AppBooksListTableComponent implements OnChanges, AfterViewInit {
  public readonly displayedColumns: string[] = ['id', 'title', 'authors', 'publishDate'];
  public readonly pageSizes: number[] = [20, 50, 100];

  @Input()
  public bookItems: AppBook[] | null;

  public dataSource = new MatTableDataSource<AppBook>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
  }

  public ngOnChanges(): void {
    this.dataSource.data = this.bookItems;
    // this.filterViewItems();
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public getDateFomatted(date: string): string {
    return new Date(Date.parse(date)).toLocaleDateString();
  }

  public goToId(id: number) {
    console.log('GOTO: ', id);
  }
}
