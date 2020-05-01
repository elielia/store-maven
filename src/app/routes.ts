import { Routes } from '@angular/router';
import { homeRoutes } from '@app/home/routes';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', children: homeRoutes },
];
