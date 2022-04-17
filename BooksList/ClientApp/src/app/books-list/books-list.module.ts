import { NgModule } from '@angular/core';
import { AppBooksListComponent } from './books-list.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppBookListService } from './books-list.service';
import { HttpClientModule } from '@angular/common/http';
import { AppBooksListTableComponent } from './books-list-table/books-list-table.component';
import { MatSortModule } from '@angular/material/sort';
import { AppBookEditFormModule } from '../common/book-edit-form/book-edit-form.module';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    AppBooksListComponent,
    AppBooksListTableComponent
  ],
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    AppBookEditFormModule,
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AppBookListService],
})
export class AppBooksListModule {
}
