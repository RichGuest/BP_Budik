import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { casovacPageComponent } from './casovac-page.component';

import { IonicModule } from '@ionic/angular';


@NgModule({
  imports: [IonicModule, RouterModule.forChild([{ path: '', component: casovacPageComponent }])],
  declarations: [casovacPageComponent],
  exports: [casovacPageComponent],
})
export class CasovacPageModule {}