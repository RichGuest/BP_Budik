import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { Platform } from '@ionic/angular';
import { startWith, switchMap } from 'rxjs/operators';
import { BackgroundRunner } from '@capacitor/background-runner';
import { LocalNotifications } from '@capacitor/local-notifications';
import { NavController } from '@ionic/angular'

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

  private backgroundTaskId: string | null = null;
  constructor(private platform: Platform, private navCtrl: NavController) {
    this.init();
    if (this.platform.is('hybrid')) {
      
      
    }
  }

  toggleAlarm(index: number) {
    const alarms = this.loadAlarms();
    alarms[index].enabled = !alarms[index].enabled;
    this.saveAlarms(alarms);
    this.alarms.next(alarms);
  }

  async showNotification(alarm: AlarmData) {
    await LocalNotifications.schedule({
      notifications: [{
        title: 'Alarm',
        body: 'Your alarm is ringing. Swipe to turn off.',
        id: new Date().getTime(), // Use something unique for the ID
        extra: { alarmId: alarm.id } // Pass the alarm's ID or some identifier
      }]
      
    });
    LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
      // Check notification.extra to see which alarm it is, then navigate to the swipe-off page
      this.navCtrl.navigateForward("/vypnuti-swipe");
    });
  }
  
  async init (){
    try{
      const permissions = await BackgroundRunner.requestPermissions({
        apis: ['geolocation','notifications']
      });
      console.log(permissions);
    } catch 
      (error) {console.log(error)};
    
  }
  
  async testSave(){
    const result = await  BackgroundRunner.dispatchEvent({
      label: 'budik.runner.check',
      event: 'testSave',
      details: {}
    });
    console.log(result);
  }

  async testLoad(){
    const result = await  BackgroundRunner.dispatchEvent({
      label: 'budik.runner.check',
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
    // Zde se nastavuje interval na 60 sekund (60000 ms)
    const checkInterval = interval(60000).pipe(
      startWith(0), // Run immediately at start
      switchMap(async () => {
          // Get current time and date
          const now = new Date();
          const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
          const currentDay = now.getDay(); // 0 is Sunday, 1 is Monday, etc.
  
          // Get alarms
          const alarms = this.loadAlarms();
  
          // Find any alarms that should be going off
          const triggeredAlarms = alarms.filter(alarm => {
            return alarm.enabled && alarm.days.includes(currentDay.toString()) && alarm.time === currentTime;
          });
  
          // Trigger alarms
          triggeredAlarms.forEach(alarm => {
            this.showNotification(alarm); // Trigger the notification for the alarm
          });
  
          return triggeredAlarms; // You can return alarms here or handle them as needed
        })
      )
      .subscribe();
  }

}