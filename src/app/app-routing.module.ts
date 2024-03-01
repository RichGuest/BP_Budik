import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ZacatekComponent } from './zacatek.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: ZacatekComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'budik',
          },
          {
            path: 'budik',
            loadChildren: () => import('./budik/budik-page.module').then((m) => m.BudikPageModule),
          },
          {
            path: 'casovac',
            loadChildren: () => import('./casovac/casovac-page.module').then((m) => m.CasovacPageModule),
          },
          {
            path: 'stopky',
            loadChildren: () => import('./stopky/stopky-page.module').then((m) => m.StopkyPageModule),
          },
          {
            path: 'alarm-create',
            loadChildren: () => import('./alarm-create/alarm-create.module').then( m => m.AlarmCreatePageModule)
          },
          {
            path:'permissions',
            loadChildren: () => import('./permissions/permissions.module').then (m => m.PermissionsPageModule)
          },
          {
            path:'vypnuti-swipe',
            loadChildren: () => import('./vypnuti-swipe/vypnuti-swipe.module').then (m => m.VypnutiSwipePageModule)
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}