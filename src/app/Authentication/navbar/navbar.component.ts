import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  title = 'EZ-Poll';
  toonExtraNavOptions = false;
  constructor() { }

  ngOnInit() {
  }


}
