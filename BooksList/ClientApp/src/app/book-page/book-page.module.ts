import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { AppBookEditFormModule } from '../common/book-edit-form/book-edit-form.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { AppBookPageComponent } from './book-page.component';

@NgModule({
  declarations: [
    AppBookPageComponent
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
  exports: [AppBookPageComponent],
  providers: [],
})
export class AppBookPageModule {
}
