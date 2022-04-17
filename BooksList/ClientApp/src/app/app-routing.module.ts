import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppBooksListModule } from './books-list/books-list.module';
import { AppBooksListComponent } from './books-list/books-list.component';

const routes: Routes = [
  {path: 'books', component: AppBooksListComponent},
  {
    path: '',
    redirectTo: '/books',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AppBooksListModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
