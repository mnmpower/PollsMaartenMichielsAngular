import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welkom',
  templateUrl: './welkom.component.html',
  styleUrls: ['./welkom.component.scss']
})
export class WelkomComponent implements OnInit {
  title = 'EZ-Poll';
  auteur = 'Maarten Michiels';
  constructor() { }

  ngOnInit() {
  }

}
