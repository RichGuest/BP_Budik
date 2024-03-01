import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlarmSettingsPage } from './alarm-settings.page';

const routes: Routes = [
  {
    path: '',
    component: AlarmSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlarmSettingsPageRoutingModule {}
