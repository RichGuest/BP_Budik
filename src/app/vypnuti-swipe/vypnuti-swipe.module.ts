import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VypnutiSwipePageRoutingModule } from './vypnuti-swipe-routing.module';

import { VypnutiSwipePage } from './vypnuti-swipe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VypnutiSwipePageRoutingModule
  ],
  declarations: [VypnutiSwipePage]
})
export class VypnutiSwipePageModule {
}
