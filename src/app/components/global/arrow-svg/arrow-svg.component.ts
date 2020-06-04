import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-arrow-svg',
  templateUrl: './arrow-svg.component.html',
  styleUrls: ['./arrow-svg.component.css'],
  animations: [
    trigger('topArrow', [
      state('start', style({
        transform: 'translateY(100%)  rotateX(180deg)'

      })),
      state('end', style({
        transform: 'translateY(0)  rotateX(0deg)'

      })),
      transition('start=>end', animate('200ms')),
      transition('end=>start', animate('200ms'))
    ]),
  ]
})
export class ArrowSvgComponent{
  currentState = 'end';
  constructor() { }
  rotateArrow(): void {
    this.currentState = this.currentState === 'start' ? 'end' : 'start';
  }

}
