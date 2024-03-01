import { Component } from '@angular/core';
import { BackgroundRunner } from '@capacitor/background-runner';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.platform.ready().then(() => {
      
    });
  }

  
}