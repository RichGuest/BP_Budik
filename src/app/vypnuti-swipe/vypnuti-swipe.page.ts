import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GestureController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-vypnuti-swipe',
  templateUrl: './vypnuti-swipe.page.html',
  styleUrls: ['./vypnuti-swipe.page.scss'],
  
  
})

export class VypnutiSwipePage implements OnInit {
  currentTime!: string;

  @ViewChild('swipeButton', { read: ElementRef }) swipeButton!: ElementRef;
  color = 'primary';
  text = 'Swipe';

  swipeInProgress = false;
  colWidth!: number;
  translateX!: number;

  swipeGesture!: any;


  constructor(
    private gestureCtrl: GestureController,
    private toastCtrl: ToastController,
  ) {
    
    setInterval(() => {
      const now = new Date();
      // Získání hodin a minut a jejich spojení do formátu HH:MM
      this.currentTime = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    }, 1000);
  }


  ngOnInit() {
  }
  ngAfterViewInit() {
    this.createSwipeGesture();
  }

  private createSwipeGesture() {
    this.swipeGesture = this.gestureCtrl.create({
      el: this.swipeButton.nativeElement,
      threshold: 10,
      gestureName: 'swipe',
      onStart: () => {
        // Handle the start of the swipe gesture if needed
        this.swipeInProgress = true;
      },
      onMove: (detail) => {
        if (this.swipeInProgress && detail.deltaX > 0) {
          const deltaX = detail.deltaX;
          console.log('deltax: ', deltaX);
          const colWidth = this.swipeButton.nativeElement.parentElement.clientWidth;
          this.colWidth = colWidth - (20 / 100 * colWidth); 
          console.log('colWidth: ', this.colWidth);
          this.translateX = Math.min(deltaX, this.colWidth);
          console.log('translatex: ', this.translateX);
          this.swipeButton.nativeElement.style.transform = `translateX(${this.translateX}px)`;
        }
      },
      onEnd: (detail) => {
        if(this.translateX >= this.colWidth) {
          console.log('swiped');
          this.changeText();
          //this.showToast();
        }
        this.swipeInProgress = false;
        this.swipeButton.nativeElement.style.transform = 'translateX(0)';
      },
    });
    this.swipeGesture.enable(true);
  }

  async changeText() {
    this.text = 'Swiped';
    this.color = 'success';
    await this.delay(800);
    this.text = 'Swipe';
    this.color = 'primary';
  }

  // async showToast() {
  //   const toast = await this.toastCtrl.create({
  //     message: 'Swipe',
  //     duration: 3000,
  //     color: 'success',
  //     position: 'middle'
  //   });
  //   toast.present();
  // }
  
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
