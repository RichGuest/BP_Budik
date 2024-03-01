import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlarmService, AlarmData } from '../alarm.service';


@Component({
  selector: 'app-budik-page',
  templateUrl: './budik-page.component.html',
  styleUrls: ['budik-page.scss'],
})


export class budikPageComponent implements OnInit {
  alarms: AlarmData[] = [];


  constructor(private navCtrl: NavController, private alarmService: AlarmService) { }


  toggleAlarm(index: number) {
    this.alarmService.toggleAlarm(index);
  }

  alarmCreate() {
    this.navCtrl.navigateForward("/alarm-create");
  }

  openPermissions(){
    this.navCtrl.navigateForward("/permissions");
  }

  openVypnutiSwipe(){
    this.navCtrl.navigateForward("/vypnuti-swipe");
  }

  ngOnInit() {
    this.alarmService.alarms$.subscribe(data => {
      // Převedení 'SS' na 'So' pro sobotu a 'S' na 'St' pro středu v každém alarmu
      this.alarms = data.map(alarm => ({
        ...alarm,
        days: alarm.days.map(day => day === 'SS' ? 'So' : (day === 'S' ? 'St' : day))
      }));
    });
  }
  dayIndexes: {[key: string]: number} = {
    'P': 0,
    'Ú': 1,
    'St': 2,
    'Č': 3,
    'Pá': 4,
    'So': 5,
    'N': 6
  };
  getBadgeColor(day: string): string {
    const weekendDays = ['So', 'N']; // Sobota a neděle
    if (weekendDays.includes(day)) {
      return 'danger'; // víkendové dny červeně
    }
    return 'tertiary'; // všední dny modře
  }

  deleteAlarm(index: number) {
    this.alarmService.deleteAlarm(index);
  }



  getImageForTime(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
  
    // Noční čas od 22:00 do 5:00
    if (totalMinutes >= 1320 || totalMinutes <= 300) {
      return 'assets/Card_pictures/half_moon.svg';
    }
    // Ranní čas od 5:01 do 7:00
    else if (totalMinutes > 300 && totalMinutes <= 420) {
      return 'assets/Card_pictures/sunrise_morning_v2.svg';
    }
    // Denní čas od 7:01 do 21:59
    else {
      return 'assets/Card_pictures/sun.svg';
    }
  }
}

