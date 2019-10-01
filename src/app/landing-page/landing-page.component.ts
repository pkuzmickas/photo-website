import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  inqOpen = false;

  scroll() {
    let target = document.getElementById('scrollTarget');
    target.scrollIntoView();
  }


  constructor() { }



}
