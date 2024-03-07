import { Component, OnInit } from '@angular/core';
import { AlarmService } from '../alarm.service';
@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.page.html',
  styleUrls: ['./permissions.page.scss'],
})
export class PermissionsPage implements OnInit {

  constructor(private alarmService: AlarmService) { }
  public testSave(): void {
    this.alarmService.testSave();
  }
  public testLoad (): void {
    this.alarmService.testLoad();
  }
  ngOnInit() {
  }

}
