import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { AppBookChange } from '../../models/book';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-book-history-table',
  templateUrl: './book-history-table.component.html',
  styleUrls: ['./book-history-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppBookHistoryTableComponent implements OnChanges, AfterViewInit {
  public readonly displayedColumns: string[] = ['title', 'authors', 'description', 'publishDate', 'changeDate'];
  public readonly pageSizes: number[] = [10, 20, 50];

  @Input()
  public bookItems: AppBookChange[];

  public dataSource = new MatTableDataSource<AppBookChange>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
  }

  public ngOnChanges(): void {
    this.dataSource.data = this.bookItems;
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public getDateFormatted(date: string): string {
    return new Date(Date.parse(date)).toLocaleDateString();
  }

  public getChangeDateFormatted(date: string): string {
    return new Date(Date.parse(date)).toLocaleString();
  }
}
