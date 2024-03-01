import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlarmCreatePage } from './alarm-create.page';

const routes: Routes = [
  {
    path: '',
    component: AlarmCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlarmCreatePageRoutingModule {}
