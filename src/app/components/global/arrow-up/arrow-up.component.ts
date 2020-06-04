import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-arrow-up',
  templateUrl: './arrow-up.component.html',
  styleUrls: ['./arrow-up.component.css']
})
export class ArrowUpComponent {

  scrollToTop(){
    window.scrollTo(null, 127)
  }

}
