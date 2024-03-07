import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { NativeAudio } from '@capacitor-community/native-audio';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { AlarmData, AlarmService } from '../alarm.service';
@Component({
  selector: 'app-alarm-create',
  templateUrl: './alarm-create.page.html',
  styleUrls: ['./alarm-create.page.scss'],
})
export class AlarmCreatePage implements OnInit, OnDestroy {
  selectedTone: string = '';
  vibrationsEnabled: boolean=true;
  lastPlayedTone: string = '';
  private routerSubscription?: Subscription;
  volume: number = 100; // Výchozí hlasitost je 100%
  selectedTime: string = '22:22'; // Přednastavený čas, který bude zobrazen na tlačítku
  selectedDays: string[] = [];


  @ViewChild(IonModal) modal!: IonModal;

  cas!: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirmTime() {
    // Přeformátujte čas na požadovaný formát, pokud je to nutné
    this.selectedTime = this.formatTime(this.cas);
    this.modal.dismiss();
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      console.log(`čas ${ev.detail.data}`);

    }
  }
  formatTime(time: string): string {
    // Převede čas z ISO formátu na formát HH:mm, pokud je to nutné
    const timeObj = new Date(time);
    return timeObj.getHours().toString().padStart(2, '0') + ':' + timeObj.getMinutes().toString().padStart(2, '0');
  }

  public DaySelection = [
    {
      name: "po",
      options: [
        {
          text: "P",
          value: "P",
        },
        {
          text: "",
          value: "",
        },


      ],
    },
    {
      name: "ut",
      options: [
        {
          text: "Ú",
          value: "Ú",
        },
        {
          text: "",
          value: "",
        },
      ],
    },
    {
      name: "str",
      options: [
        {
          text: "S",
          value: "S",
        },
        {
          text: "",
          value: "",
        },
      ],
    },
    {
      name: "ctv",
      options: [
        {
          text: "Č",
          value: "Č",
        },
        {
          text: "",
          value: "",
        },
      ],
    },
    {
      name: "pat",
      options: [
        {
          text: "P",
          value: "P",
        },
        {
          text: "",
          value: "",
        },
      ],
    },
    {
      name: "sob",
      options: [
        {
          text: "S",
          value: "SS",
        },
        {
          text: "",
          value: "",
        },
      ],
    },
    {
      name: "ned",
      options: [
        {
          text: "N",
          value: "N",
        },
        {
          text: "",
          value: "",
        },
      ],
    },
  ];

  public pickerButtons = [
    {
      text: 'Zavřít',
      role: 'zavrit',
    },
    {
      text: 'Ok',
      handler: (value: any) => {
        this.selectedDays = Object.keys(value).map(key => value[key].value).filter(text => text);
        console.log('Selected days:', this.selectedDays);
        return true;
      },

    },
  ];
  
  
  
  constructor(private router: Router, private alarmService: AlarmService) { }
  
  async ngOnInit() {
    // Přednačtěte zvuky zde
    await this.preloadTone('AirCraft', 'AircraftAlarmSoundEffect.mp3');
    await this.preloadTone('Beep-Beep', 'AlarmClockBeep.mp3');
    await this.preloadTone('iPhone', 'iPhoneAlarmSound.mp3');
    
    // Přihlásit se k odběru událostí navigace
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.stopAllTones();
      }
    });
  }
  async preloadTone(assetId: string, assetPath: string) {
    try {
      await NativeAudio.preload({ assetId, assetPath });
    } catch (error) {
      console.error('Error preloading tone:', error);
    }
  }
  getSelectedToneName(): string {
    // Vraťte název vybraného tónu, případně můžete přidat logiku pro získání skutečného názvu
    return this.selectedTone;
  }



  saveAlarmSettings() {
    // Pokud nebyl vybrán žádný tón, nastaví se výchozí tón 'Beep-Beep'
    if (!this.selectedTone) {
      this.selectedTone = 'Beep-Beep';
    }
  
    // Pokud nebyly vybrány žádné dny, nastaví se všechny dny
    if (this.selectedDays.length === 0) {
      this.selectedDays = ['P', 'Ú', 'S', 'Č', 'P', 'So', 'N'];
    }
  
    // Vytvoří objekt s daty alarmu
    const alarmData: AlarmData = {
      time: this.selectedTime,
      days: this.selectedDays,
      vibrations: this.vibrationsEnabled,
      tone: this.selectedTone,
      enabled: false,
      id: ''
    };
  
    // Uloží data alarmu pomocí AlarmService
    this.alarmService.setAlarmData(alarmData);
  
    // Naviguje zpět na hlavní stránku
    this.router.navigate(['/']);
  }


  ngOnDestroy() {
    // Odhlásit se od odběru událostí navigace
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  async updateVolume() {
    const volume = this.volume / 100; // Převod na rozsah 0 - 1
    if (this.lastPlayedTone) {
      try {
        await NativeAudio.setVolume({
          assetId: this.lastPlayedTone,
          volume: volume,
        });
      } catch (error) {
        console.error('Error setting volume:', error);
      }
    }
  }

  async setSelectedTone(tone: string) {
    if (this.lastPlayedTone) {
      // Zastavte předchozí zvuk, pokud nějaký hraje
      await this.stopTone(this.lastPlayedTone);
    }

    this.selectedTone = tone;
    await this.playTone(tone);
    this.lastPlayedTone = tone; // Uložte ID posledně přehrané znělky
  }

  async playTone(assetId: string) {
    try {
      await NativeAudio.play({ assetId });
    } catch (error) {
      console.error('Error playing tone:', error);
    }
  }

  async stopTone(assetId: string) {
    try {
      await NativeAudio.stop({ assetId });
    } catch (error) {
      console.error('Error stopping tone:', error);
    }
  }
  async stopAllTones() {
    if (this.lastPlayedTone) {
      await this.stopTone(this.lastPlayedTone);
    }
  }
  toggleVibrations() {
    this.vibrationsEnabled = !this.vibrationsEnabled;
    console.log('Vibrace:', this.vibrationsEnabled); // Kontrolní výpis pro ladění
  }

  
  // saveAlarmSettings() {
  //   // Zde přidáte logiku pro uložení nastavení budíku
  //   console.log('Uložení nastavení budíku:', this.selectedTone, this.vibrationsEnabled);
  // }
}