import {Component, OnInit} from '@angular/core';
import {Poll} from '../../Models/poll.model';
import {PollService} from '../../Services/poll.service';
import {Observable} from 'rxjs';
import {Dashboard} from '../../ViewModels/dashboard.viewModel';
import {DashboardService} from '../../Services/dashboard.service';
import {PollOptie} from '../../Models/poll-optie.model';
import {FormBuilder} from '@angular/forms';
import {Stem} from '../../Models/stem.model';
import {StemService} from '../../Services/stem.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  PollsToVote: Poll[];
  CreatedPolls: Poll[];
  GebruikerID: number = parseInt(sessionStorage.getItem('GebruikerID'));
  Dashboard: Dashboard;
  NieuweStemArray: number[] = [];
  RemoveStemArray: number[] = [];
  OudeStemArray: number[] = [];

  constructor(private pollService: PollService, private dashboardService: DashboardService, private fb: FormBuilder, private stemService: StemService, private router: Router) {

    this.laadAll();

  }


  ngOnInit() {
    this.PollsToVote = [];
    this.CreatedPolls = [];
    this.NieuweStemArray = [];
    this.RemoveStemArray = [];
    this.OudeStemArray = [];
    this.laadAll();
  }

  laadAll() {
    this.laadDashboard(this.GebruikerID);
  }

  AddVote(PollOptieID: number) {
    if (this.NieuweStemArray.includes(PollOptieID)) {
      var index: number = this.NieuweStemArray.indexOf(PollOptieID);
      this.NieuweStemArray.splice(index, 1);
    } else {
      this.NieuweStemArray.push(PollOptieID);
    }
    console.log('na: ', this.NieuweStemArray);
  }

  RemoveVote(PollOptieID: number) {
    if (this.RemoveStemArray.includes(PollOptieID)) {
      var index: number = this.RemoveStemArray.indexOf(PollOptieID);
      this.RemoveStemArray.splice(index, 1);
    } else {
      this.RemoveStemArray.push(PollOptieID);
    }
    console.log('na: ', this.RemoveStemArray);
  }


  SubmitVotes() {
    //STEMMEN TOEVEOGEN
    for (let PollOptieID of this.NieuweStemArray) {
      var stem: Stem = new Stem(0, PollOptieID, this.GebruikerID, null, null);

      this.stemService.AddStem(stem).subscribe(result => {
        console.log('TOEGEVOEGD:', result);

        window.location.reload();

      });
    }

    this.NieuweStemArray = [];
    //STEMMEN VERWIJDEREN
    for (let PollOptieID of this.RemoveStemArray) {

      this.stemService.RemoveStem(this.GebruikerID, PollOptieID).subscribe(result => {
        console.log('VERWIJDERD:', result);

        window.location.reload();

      });
    }

    console.log('UIT LOOP LAAD ALL NU');
    this.RemoveStemArray = [];


  }

  ViewResults(PollID: number) {
    sessionStorage.setItem('PollID', String(PollID));
    console.log('storageSet');
    this.router.navigate(['pollResult'], {replaceUrl: true});
  }

  private laadDashboard(GebruikerID: number) {
    this.dashboardService.getDashboard(GebruikerID).subscribe(result => {
      this.Dashboard = result;
      this.PollsToVote = this.Dashboard.uitgenodigdePolls;
      this.CreatedPolls = this.Dashboard.beheerderPolls;
      for (let stem of this.Dashboard.uitgebrachteStemmen) {
        this.OudeStemArray.push(stem.pollOptieID);

        console.log('PollOptieID', stem.pollOptieID);
      }

      console.log('DashboardVM: ', this.Dashboard);
      console.log('OudeStemArray', this.OudeStemArray);
    });

  }
}
