import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlarmCreatePageRoutingModule } from './alarm-create-routing.module';

import { AlarmCreatePage } from './alarm-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlarmCreatePageRoutingModule
  ],
  declarations: [AlarmCreatePage]
})
export class AlarmCreatePageModule {}
