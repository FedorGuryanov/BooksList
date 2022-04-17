import { Router } from '@angular/router';

export const navigateToBook = (router: Router, id: string) => {
  router.navigate(['/book/' + id]);
};

export const navigateToBooksList = (router: Router) => {
  router.navigate(['/books']);
};
