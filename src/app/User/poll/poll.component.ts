import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {Poll} from '../../Models/poll.model';
import {PollService} from '../../Services/poll.service';
import {PollgebruikerService} from '../../Services/pollgebruiker.service';
import {PollGebruiker} from '../../Models/poll-gebruiker.model';
import {Gebruiker} from '../../Models/gebruiker.model';
import {GebruikerService} from '../../Services/gebruiker.service';
import {PollcreateService} from '../../Services/pollcreate.service';
import {Pollcreate} from '../../ViewModels/pollcreate.ViewModel';
import {Router} from '@angular/router';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {

  constructor(private fb: FormBuilder, private _pollService: PollService, private _pollGebruikerService: PollgebruikerService, private gebruikerService: GebruikerService, private pollcreateService: PollcreateService, private router: Router) {
    this.laadAll();
  }

  GebruikerID: number = parseInt(sessionStorage.getItem('GebruikerID'));

  submitted = false;
  // HIER VOOR VM
  Pollcreate: Pollcreate;
  AlleVrienden: Gebruiker[];
  GeselecteerdeVrienden: Gebruiker[] = [];
  GeselecteerdeAdmins: Gebruiker[] = [];
  GebruikersOpZoekterm: Gebruiker[];

  // TOT HIER VOOR VM

  CreatePollForm: FormGroup;
  PollOptions: FormArray;

  pollGebruiker = new PollGebruiker(0, 0, 0, false, null, null);
  maakAdmin = false;
  newPoll: Poll = new Poll(0, '', null, null);

  Zoekstring = '';


  laadAll() {
    this.laadPollCreate(this.GebruikerID);
  }

  laadPollCreate(GebruikerID: number) {
    this.pollcreateService.getPollCreate(GebruikerID).subscribe(result => {
      this.AlleVrienden = result.alleVrienden;

      this.AddNewOption();
    });
  }

  get f() {
    return this.CreatePollForm.controls;
  }

  AddNewOption() {
    this.PollOptions = this.CreatePollForm.get('PollOptions') as FormArray;
    this.PollOptions.push(this.createPollOption());
  }

  RemoveOptionHTML(index: number) {
    this.PollOptions.removeAt(index);
    console.log(index);
  }

  ngOnInit() {
    this.CreatePollForm = this.fb.group({
      inputTitle: ['', Validators.required],
      inputSearchFriend: [''],
      PollOptions: this.fb.array([this.createPollOption()])
    }, {});
  }

  createPollOption(): FormGroup {
    return this.fb.group({
      antwoord: ''
    });
  }


  SearchFriends() {
    this.Zoekstring = this.CreatePollForm.get(['inputSearchFriend']).value;
    this.laadGebruikers(this.Zoekstring);
  }

  laadGebruikers(zoekstring: string) {
    console.log(zoekstring);
    console.log(this.GebruikerID);
    this.pollcreateService.getPollCreate(this.GebruikerID, zoekstring).subscribe(result => {
      this.GebruikersOpZoekterm = result.gebruikersOpZoekterm;
      console.log(result);
      console.log(result.gebruikersOpZoekterm);
      console.log(this.GebruikersOpZoekterm);
      this.Zoekstring = zoekstring;
    });
    // this.AddFriendList = this.gebruikerService.zoekGebruikers(zoekstring, this.GebruikerID);

  }

  addVriendToPoll(gebruiker: Gebruiker) {
    if (!this.maakAdmin) {
      if (!this.GeselecteerdeVrienden.includes(gebruiker) && !this.GeselecteerdeAdmins.includes(gebruiker)) {
        this.GeselecteerdeVrienden.push(gebruiker);
        console.log('gebruikers');
        console.log(this.GeselecteerdeVrienden);
      }
    } else {
      if (!this.GeselecteerdeAdmins.includes(gebruiker) && !this.GeselecteerdeVrienden.includes(gebruiker)) {
        this.GeselecteerdeAdmins.push(gebruiker);
        console.log('admins');
        console.log( this.GeselecteerdeAdmins);
      }
    }


  }


  RemoveVriendfromPoll(gebruiker: Gebruiker) {
    let index = this.GeselecteerdeVrienden.indexOf(gebruiker);
    if (index != -1) {
      console.log(index);
      this.GeselecteerdeVrienden.splice(index, 1);
      console.log('gebruikers');
      console.log(this.GeselecteerdeVrienden);
    } else {
      index = this.GeselecteerdeAdmins.indexOf(gebruiker);
      if (index != -1) {
        console.log(index);
        this.GeselecteerdeAdmins.splice(index, 1);
        console.log('admins');
        console.log( this.GeselecteerdeAdmins);
      }
    }
  }

  onSubmit() {
    console.log('1 in submit');
    this.submitted = true;

    if (this.CreatePollForm.invalid) {
      console.log('2 invalid form');

      return;
    }
    console.log('3 valid form Title');
    console.log('lege poll', this.newPoll);


    this.newPoll.Naam = this.CreatePollForm.get(['inputTitle']).value;
    console.log('4 naam', this.newPoll);

    this.newPoll.PollOpties = this.PollOptions.value;
    console.log('5 pollopties', this.newPoll);

    //
    this._pollService.addPoll(this.newPoll).subscribe(result => {
      console.log('6 result van pol', result);
      this.newPoll.PollID = result.pollID;
      console.log('7 vriendjes ', this.GeselecteerdeVrienden);
      //   // HIER beheerder TOEVOEGEN
      //
      this.pollGebruiker.beheerder = true;
      this.pollGebruiker.pollID = result.pollID;
      this.pollGebruiker.gebruikerID = this.GebruikerID;
      this._pollGebruikerService.AddPollGebruiker(this.pollGebruiker).subscribe(resul => {
        this.AddAllePollGebruikers(resul.pollID, this.GeselecteerdeVrienden);
        this.AddAllePollGebruikerAdmins(resul.pollID, this.GeselecteerdeAdmins);
        this.router.navigate(['dashboard'], {replaceUrl: true});
      });
    });
  }

  AddAllePollGebruikers(pollID: number, GeselecteerdeVrienden: Gebruiker[]) {
    console.log('PollID: ', pollID);
    console.log('8 in toevoegen vriendjes');
    for (let gebruiker of GeselecteerdeVrienden) {
      console.log('gebruiker: ', gebruiker);
      console.log('GeselecteerdeVrienden: ', GeselecteerdeVrienden);
      console.log('9 in forloop vriendjes');
      var PG: PollGebruiker = new PollGebruiker(0, pollID, gebruiker.gebruikerID, false, null, null);

      // this.pollGebruiker.GebruikerID = gebruiker.gebruikerID;
      // console.log('gebruikerID SET: ', gebruiker.gebruikerID);
      // this.pollGebruiker.PollID = pollID;
      // this.pollGebruiker.beheerder = false;
      console.log('PG:', PG);
      this._pollGebruikerService.AddPollGebruiker(PG).subscribe(result => {
        console.log('10 eindelijk', result);
      });
      console.log('11 einde for loop');
    }
    console.log('12 einde functie');
  }

  AddAllePollGebruikerAdmins(pollID: number, GeselecteerdeAdmins: Gebruiker[]) {
    console.log('PollID: ', pollID);
    console.log('13 in toevoegen admins');
    for (let gebruiker of GeselecteerdeAdmins) {
      console.log('gebruiker: ', gebruiker);
      console.log('GeselecteerdeAdmins: ', GeselecteerdeAdmins);
      console.log('14 in forloop admins');
      var PG: PollGebruiker = new PollGebruiker(0, pollID, gebruiker.gebruikerID, true, null, null);

      // this.pollGebruiker.GebruikerID = gebruiker.gebruikerID;
      // console.log('gebruikerID SET: ', gebruiker.gebruikerID);
      // this.pollGebruiker.PollID = pollID;
      // this.pollGebruiker.beheerder = false;
      console.log('PG:', PG);
      this._pollGebruikerService.AddPollGebruiker(PG).subscribe(result => {
        console.log('15 eindelijk', result);
      });
      console.log('16 einde for loop');
    }
    console.log('17 einde functie');
  }

  ChangeAdmin() {
    this.maakAdmin = !this.maakAdmin;
    console.log(this.maakAdmin);
  }
}

