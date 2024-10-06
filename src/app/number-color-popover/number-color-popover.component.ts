import { Component, OnInit, Input } from '@angular/core';
import {
  IonContent
} from '@ionic/angular/standalone';
import { Color } from '../home/home.page';

@Component({
  selector: 'app-number-color-popover',
  templateUrl: './number-color-popover.component.html',
  styleUrls: ['./number-color-popover.component.scss'],
  standalone: true,
  imports: [IonContent]
})
export class NumberColorPopoverComponent{
  constructor() { }

  @Input() message!: any;

}
