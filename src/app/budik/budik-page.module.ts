import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { budikPageComponent } from './budik-page.component';
import { CommonModule } from '@angular/common'; 
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [IonicModule,CommonModule, RouterModule.forChild([{ path: '', component: budikPageComponent }])],
  declarations: [budikPageComponent],
  exports: [budikPageComponent],
})
export class BudikPageModule {}