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
  public readonly allColumns: string[] = ['title', 'authors', 'description', 'publishDate'];
  public filterValues: Record<string, boolean> = {};
  public filterTitles: Record<string, string> = {
    title: 'Title',
    authors: 'Authors',
    description: 'Description',
    publishDate: 'Publish Date'
  };
  public displayedColumns: string[] = this.allColumns;
  public readonly pageSizes: number[] = [10, 20, 50];

  @Input()
  public bookItems: AppBookChange[];

  public dataSource = new MatTableDataSource<AppBookChange>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    this.allColumns.forEach(item => this.filterValues[item] = true);
  }

  public ngOnChanges(): void {
    this.dataSource.data = this.bookItems;
    this.updateFilter();
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

  public updateFilter(): void {
    let filterCols = this.allColumns.filter(item => this.filterValues[item]);
    if (!filterCols.length) {
      filterCols = this.allColumns;
    }
    this.dataSource.data = this.bookItems.filter(item => filterCols.find(col => item[col]));
    this.displayedColumns = [...filterCols, 'changeDate'];
  }
}
