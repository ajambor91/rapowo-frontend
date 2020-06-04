import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-drag-bar',
  templateUrl: './drag-bar.component.html',
  styleUrls: ['./drag-bar.component.css']
})
export class DragBarComponent implements OnInit{
  @ViewChild('slider',{static: true}) slider: ElementRef;
  @ViewChild('sliderBar',{static: true}) sliderBar: ElementRef;
  @Output() factor = new EventEmitter<any>();
  clicked = false;
  left = 0;
  markClicked(): void{
    this.clicked = true;
  }
  ngOnInit(): void {
    window.addEventListener('mouseup',() => {
      this.clicked = false;
    });
  }
  moveSlider(event): void {
     if (this.clicked) {
       this.left = event.offsetX;
       this.slider.nativeElement.style.left = this.left + 'px';
       const percentOfBar = this.left / Number(window.getComputedStyle(this.sliderBar.nativeElement).width.replace('px', ''));
       this.factor.emit(percentOfBar.toFixed(2));
     }
  }
}
