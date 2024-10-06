import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonGrid, IonCol, IonRow, IonButton, ToastController,
  IonItem, IonList, IonButtons, IonPopover, PopoverController
} from '@ionic/angular/standalone';
import { NumberColorPopoverComponent } from '../number-color-popover/number-color-popover.component';


export enum Color {
  green, red, blue
}



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonGrid, IonCol, IonRow, IonButton, IonItem, IonList,
    CommonModule, IonButton, IonButtons, IonPopover],
})

export class HomePage {
  constructor(private toastController: ToastController, private popoverController: PopoverController
  ) { }

  /**
   * Array that hold colors to show (based in ColorEnum)
   */
  colorList: Color[][] = [];

  /**
   * Check if the value is a number, an integer, and greater than -1
   * @param numberInput 
   * @returns true if validation pass, else false
   */
  validateInput(numberInput: any): boolean {
    const value = Number(numberInput);

    if (!isNaN(value) && Number.isInteger(value) && value >= 0) {
      return true;
    } else {
      return false;
    }
  }


  /**
   * Show Toast danger message at top
   * @param message 
   */
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'danger',
    });
    await toast.present();
  }

  /**
   * Triggers when Mostrar lista button is clicked
   * @param numberInput 
   * @returns 
   */
  showListButtonClick(numberInput: any) {
    if (!this.validateInput(numberInput)) {
      this.presentToast('Numero invalido');
      return
    }
    this.generateNumberList(numberInput)
  }

  /**
   * Generate an array that holds the colors of each number
   * @param number Number in the input
   */
  generateNumberList(number: number) {
    this.colorList = []
    for (let i = 0; i <= number; i++) {
      let multiples = []
      if (i % 3 == 0) {
        multiples.push(Color.green)
      }
      if (i % 5 == 0) {
        multiples.push(Color.red)
      }
      if (i % 7 == 0) {
        multiples.push(Color.blue)
      }
      this.colorList.push(multiples)
    }
  }

  /**
   * Return the multiple of each color
   * @param color 
   * @returns 
   */
  getColorMultiple(color: Color) {
    switch (color) {
      case Color.green:
        return 3;
      case Color.red:
        return 5;
      case Color.blue:
        return 7;
    }
  }


  /**
   * Give info to know if a number is multiple of more that one number (3, 5, or 7)
   * @param ev 
   * @param colorDescription 
   * @returns 
   */
  async presentPopover(ev: Event, colorDescription: Color[]) {
    let message = 'Este numero es multiplo de: '
    const multiples = colorDescription.map(color => this.getColorMultiple(color));
    message += multiples.join(', ')
    const popover = await this.popoverController.create({
      component: NumberColorPopoverComponent,
      event: ev,
      componentProps: { message: message },
      translucent: true
    });
    return await popover.present();
  }

  getButtonColor(color: Color[]){
    if(color.length == 0){
      return 'dark'
    }
    switch (color[0]) {
      case Color.green:
        return 'success';
      case Color.red:
        return 'danger';
      case Color.blue:
        return 'secondary';
    }
  }

  getButtonDisabled(color: Color[]){
    if(color.length == 0){
      return true
    }
    return false
  }
}
