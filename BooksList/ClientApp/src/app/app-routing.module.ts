import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppBooksListModule } from './books-list/books-list.module';
import { AppBooksListComponent } from './books-list/books-list.component';
import { AppBookPageModule } from './book-page/book-page.module';
import { AppBookPageComponent } from './book-page/book-page.component';

const routes: Routes = [
  {path: 'books', component: AppBooksListComponent},
  {path: 'book/:id', component: AppBookPageComponent},
  {
    path: '',
    redirectTo: '/books',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AppBooksListModule,
    AppBookPageModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
