import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlarmSettingsPageRoutingModule } from './alarm-settings-routing.module';

import { AlarmSettingsPage } from './alarm-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlarmSettingsPageRoutingModule
  ],
  declarations: [AlarmSettingsPage]
})
export class AlarmSettingsPageModule {}
