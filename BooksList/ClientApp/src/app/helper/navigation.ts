import { Router } from '@angular/router';

export const navigateToBook = (router: Router, id: string) => {
  router.navigate(['/book/' + id]);
};
