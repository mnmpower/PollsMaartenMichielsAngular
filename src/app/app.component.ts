import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EZ-Poll';
  auteur = 'Maarten Michiels';
  toonExtraNavOptions: boolean = false;
}
