import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { stopkyPageComponent } from './stopky-page.component';

@NgModule({
  imports: [IonicModule, RouterModule.forChild([{ path: '', component: stopkyPageComponent }])],
  declarations: [stopkyPageComponent],
  exports: [stopkyPageComponent],
})
export class StopkyPageModule {}