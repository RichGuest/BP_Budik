import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { Platform } from '@ionic/angular';
import { BackgroundRunner } from '@capacitor/background-runner';
import { LocalNotifications } from '@capacitor/local-notifications';
import { NavController } from '@ionic/angular'
import { NativeAudio } from '@capacitor-community/native-audio';
export interface AlarmData {
  time: string;
  days: string[];
  vibrations: boolean;
  tone: string;
  enabled: boolean;
  id: string;

}

@Injectable({
  providedIn: 'root'
})
export class AlarmService {

  private alarms = new BehaviorSubject<AlarmData[]>(this.loadAlarms());
  alarms$ = this.alarms.asObservable();
  constructor(private platform: Platform, private navCtrl: NavController) {
    this.init();
    {


    }
  }

  toggleAlarm(index: number) {
    const alarms = this.loadAlarms();
    const alarm = alarms[index];
    alarm.enabled = !alarm.enabled;
    this.saveAlarms(alarms);
    this.alarms.next(alarms);
    if (alarm.enabled) {
      this.startBackgroundCheck(); // Spustí pozadovou kontrolu pro nově povolený alarm
    }
  }

  async startBackgroundCheck() {
    const backgroundTaskId = await BackgroundRunner.dispatchEvent({
      label: 'checkAlarms',
      event: 'alarm.check',
      details: {}
    });
  }






  async init() {
    try {
      const permissions = await BackgroundRunner.requestPermissions({
        apis: ['geolocation', 'notifications']
      });
      console.log(permissions);
      this.checkAlarms();
    } catch
    (error) { console.log(error) };

  }

  async testSave() {
    const result = await BackgroundRunner.dispatchEvent({
      label: 'budik.check',
      event: 'testSave',
      details: {}
    });
    console.log(result);
  }

  async testLoad() {
    const result = await BackgroundRunner.dispatchEvent({
      label: 'budik.check',
      event: 'testLoad',
      details: {}
    });
    console.log('load test', result);
  }





  private loadAlarms(): AlarmData[] {
    const alarmsJSON = localStorage.getItem('alarms');
    return alarmsJSON ? JSON.parse(alarmsJSON) : [];
  }

  private saveAlarms(alarms: AlarmData[]): void {
    localStorage.setItem('alarms', JSON.stringify(alarms));
  }

  setAlarmData(data: AlarmData) {
    const alarms = this.loadAlarms();
    alarms.push(data);
    this.saveAlarms(alarms);
    this.alarms.next(alarms);
  }

  deleteAlarm(index: number) {
    const alarms = this.loadAlarms();
    alarms.splice(index, 1);
    this.saveAlarms(alarms);
    this.alarms.next(alarms);
  }

  checkAlarms() {
    try {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      const currentDay = now.getDay().toString();

      // Get alarms
      const alarms = this.loadAlarms();

      // Find any alarms that should be going off
      const triggeredAlarms = alarms.filter(alarm => {
        return alarm.enabled && alarm.days.includes(currentDay) && alarm.time === currentTime;
      });

      // If there are any alarms, show the notification and navigate to the swipe page
      triggeredAlarms.forEach(async alarm => {

        await LocalNotifications.schedule({
          notifications: [{
            title: "Alarm",
            body: "Your alarm is ringing!",
            id: parseInt(alarm.id),
            schedule: { at: new Date(new Date().getTime() + 1000) }, // Schedule immediately for demo purposes
            sound: alarm.tone,
            //attachments: null,
            actionTypeId: "",
            extra: null
          }]
        });

      });
    }
    catch
    (error) { console.log(error) };
  }
}












