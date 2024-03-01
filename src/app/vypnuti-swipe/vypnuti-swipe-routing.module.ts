import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VypnutiSwipePage } from './vypnuti-swipe.page';

const routes: Routes = [
  {
    path: '',
    component: VypnutiSwipePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VypnutiSwipePageRoutingModule {}
