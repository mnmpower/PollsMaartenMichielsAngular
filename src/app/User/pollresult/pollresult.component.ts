import {Component, OnInit} from '@angular/core';
import CanvasJS from '../../canvasjs-2.3.2/canvasjs.min.js';
import {Pollresult} from '../../ViewModels/pollresult.viewModel';
import {PollService} from '../../Services/poll.service';
import {Poll} from '../../Models/poll.model';

@Component({
  selector: 'app-pollresult',
  templateUrl: './pollresult.component.html',
  styleUrls: ['./pollresult.component.scss']
})
export class PollresultComponent implements OnInit {

  GebruikerID: number = parseInt(sessionStorage.getItem('GebruikerID'));
  PollID: number;
  Pollresult: Pollresult;
  Poll: Poll;
  dataArray = [];
  Title: string;

  constructor(private pollService: PollService) {
    this.PollID = parseInt(sessionStorage.getItem('PollID'));
    sessionStorage.removeItem('PollID');
    this.LaadPoll();
  }

  LaadPoll() {
    this.pollService.getPollresultViewModel(this.PollID).subscribe(result => {
      this.Pollresult = result;
      this.Poll = this.Pollresult.resultaatOpgevraagdePoll;
      this.Title = this.Poll.naam;

      for (let PollOptie of this.Poll.pollOpties) {
        var point = {y: PollOptie.stemmen.length, label: PollOptie.antwoord};
        this.dataArray.push(point);
      }
      this.LaadChart();

    });
    console.log('geladen');
  }

  LaadChart() {
    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: this.Title
      },
      data: [{
        type: 'column',
        dataPoints: this.dataArray
      }]
    });

    chart.render();
  }

  ngOnInit() {

  }
}



