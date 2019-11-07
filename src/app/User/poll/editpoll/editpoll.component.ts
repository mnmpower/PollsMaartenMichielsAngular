import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PollService} from '../../../Services/poll.service';
import {PollgebruikerService} from '../../../Services/pollgebruiker.service';
import {GebruikerService} from '../../../Services/gebruiker.service';
import {PollcreateService} from '../../../Services/pollcreate.service';
import {Router} from '@angular/router';
import {Gebruiker} from '../../../Models/gebruiker.model';
import {PollGebruiker} from '../../../Models/poll-gebruiker.model';
import {Poll} from '../../../Models/poll.model';
import {Pollcreate} from '../../../ViewModels/pollcreate.ViewModel';
import {EditpollService} from '../../../Services/editpoll.service';
import {PollOptie} from '../../../Models/poll-optie.model';
import {PolloptionService} from '../../../Services/polloption.service';

@Component({
  selector: 'app-editpoll',
  templateUrl: './editpoll.component.html',
  styleUrls: ['./editpoll.component.scss']
})
export class EditpollComponent implements OnInit {
  pollID: number = parseInt(sessionStorage.getItem('PollID'));

  submitted = false;
  zoekstring: string;
  pollGebruikers: PollGebruiker[] = [];
  pollOpties: PollOptie[] = [];
  newPollOpties: PollOptie[] = [];
  title: string;

  teDeletePO: PollOptie[] = [];

  EditPollForm: FormGroup;
  PollOptions: FormArray;
  NewPollOptions: FormArray;

  newOptionAdded = false;
  // ALLES VOOR VRIENDEN
  maakAdmin = false;
  Zoekstring = '';
  GebruikerID: number = parseInt(sessionStorage.getItem('GebruikerID'));
  GeselecteerdeVrienden: Gebruiker[] = [];
  GeselecteerdeAdmins: Gebruiker[] = [];
  GebruikersOpZoekterm: Gebruiker[];
  found = false;
  check = false;

  // ALLESVOOR DE API CALLS OP SUBMIT
  AddNewPG: Gebruiker[] = [];
  DelPGs: number[] = [];
  DelUniqePGs: number[] = [];
  AddNewPGAdmin: Gebruiker[] = [];
  PG: PollGebruiker = new PollGebruiker(0, 0, 0, false, null, null);

  editPoll: Poll = new Poll(0, '', [], []);

  constructor(
    private _editPollService: EditpollService,
    private _polloptionService: PolloptionService,
    private fb: FormBuilder,
    private _pollService: PollService,
    private _pollGebruikerService: PollgebruikerService,
    private _pollcreateService: PollcreateService,
    private router: Router) {
    this.laadAll();
  }

  ngOnInit() {
    this.EditPollForm = this.fb.group({
      inputTitle: ['', Validators.required],
      inputSearchFriend: [''],
      PollOptions: this.fb.array([this.createPollOption()]),
      NewPollOptions: this.fb.array([this.createPollOption()])
    }, {});
  }

  toFormGroup(pollOptions: PollOptie[]) {
    const group: any = {};

    pollOptions.forEach((pollOption, i) => {
      group['antwoord' + i] = new FormControl(pollOption.antwoord);
    });
    return new FormGroup(group);
  }

  toNewFormGroup(pollOptions: PollOptie[]) {
    const group: any = {};

    pollOptions.forEach((pollOption, i) => {

      group['newAntwoord' + i] = new FormControl(pollOption.antwoord);
    });
    return new FormGroup(group);
  }

  laadAll() {
    this.laadEditPollVM();
  }

  laadPG() {
    for (let PG of this.pollGebruikers) {
      if (PG.beheerder) {
        if (PG.gebruikerID != this.GebruikerID) {
          this.GeselecteerdeAdmins.push(PG.gebruiker);
        }
      } else {
        this.GeselecteerdeVrienden.push(PG.gebruiker);
      }
    }
    console.log('this.GeselecteerdeVrienden');
    console.log(this.GeselecteerdeVrienden);
    console.log('this.GeselecteerdeAdmins');
    console.log(this.GeselecteerdeAdmins);
  }

  laadEditPollVM() {
    this._editPollService.getEditPoll(this.pollID, this.zoekstring).subscribe(result => {
      console.log('result');
      console.log(result);
      this.title = result.editPoll.naam;
      this.pollGebruikers = result.editPoll.pollGebruikers;
      this.pollOpties = result.editPoll.pollOpties;
      console.log('title');
      console.log(this.title);
      console.log('pollGebruikers');
      console.log(this.pollGebruikers);
      console.log('pollOpties');
      console.log(this.pollOpties);
      this.loadDataToPoll();
      this.laadPG();
    });
  }

  get f() {
    return this.EditPollForm.controls;
  }

  loadDataToPoll() {
    this.EditPollForm = this.fb.group({
      inputTitle: ['', Validators.required],
      inputSearchFriend: [''],
      PollOptions: this.toFormGroup(this.pollOpties),
      NewPollOptions: this.fb.array(this.newPollOpties)
    }, {});
  }


  onSubmit() {
    console.log('1 in submit');
    this.submitted = true;

    console.log('bestaande opties:');
    console.log(this.pollOpties);
    console.log('nieuwe opties:');
    console.log(this.newPollOpties);
    console.log('nieuwe title:');
    console.log(this.title);

    this.editPoll.Naam = this.title;
    this.editPoll.PollID = this.pollID;
    for (let PO of this.pollOpties) {
      this.editPoll.PollOpties.push(PO);
    }
    // HIER DE NIEUWE OPTIES TOEVOEGEN MET DE NIEUWE PO SERVICE
    for (let PO of this.newPollOpties) {
      this.editPoll.PollOpties.push(PO);
      console.log(PO);
      this._polloptionService.AddPollOptie(PO).subscribe(r => {
        console.log(r);
      });
    }

    //TE DELETEN OPTIONS
    for (let PO of this.teDeletePO) {
      console.log('TE DELETEN OPTIE:');
      console.log(PO);
      this._polloptionService.DeletePollOptie(PO.pollOptieID).subscribe(r => {
        console.log(r);
      });
    }

    // HIER DE GEBRUIKERS UPDATED DOEN
    //DELETE PGS
    for (let gebruikerid of this.DelUniqePGs) {
      this._pollGebruikerService.DeletePollGebruiker(this.pollID, gebruikerid).subscribe(r => {
        console.log(r);
      });
    }

    //ADD NEW PGADMINS
    for (let PGadmin of this.AddNewPGAdmin) {
      this.PG.gebruikerID = PGadmin.gebruikerID;
      this.PG.pollID = this.pollID;
      this.PG.beheerder = true;
      this._pollGebruikerService.AddPollGebruiker(this.PG).subscribe(r => {
        console.log(r);
      });
    }
    //ADD new PGS
    for (let pg of this.AddNewPG) {
      this.PG.gebruikerID = pg.gebruikerID;
      this.PG.pollID = this.pollID;
      this.PG.beheerder = false;
      this._pollGebruikerService.AddPollGebruiker(this.PG).subscribe(r => {
        console.log(r);
      });
    }


    console.log('this.GeselecteerdeVrienden:');
    console.log(this.GeselecteerdeVrienden);
    console.log('this.GeselecteerdeAdmins');
    console.log(this.GeselecteerdeAdmins);


    // HIER D EPOLLUPDATE DOEN
    console.log(this.editPoll);
    this._pollService.updatePoll(this.pollID, this.editPoll).subscribe(r => {
      console.log(r);
      this.router.navigate(['dashboard'], {replaceUrl: true});
    });
  }

  AddNewOption() {
    this.newOptionAdded = true;
    this.NewPollOptions = this.EditPollForm.get('NewPollOptions') as FormArray;
    this.NewPollOptions.push(this.createPollOption());
    this.newPollOpties.push(new PollOptie(0, this.pollID, ''));
  }

  createPollOption(): FormGroup {
    return this.fb.group({
      antwoord: ''
    });
  }

  RemoveExistingOptionHTML(index: number) {

    this.teDeletePO.push(this.pollOpties[index]);
    console.log(index);
    this.pollOpties.splice(index, 1);
  }

  RemoveNewExistingOptionHTML(index: number) {
    this.newPollOpties.splice(index, 1);
    console.log(index);
  }

  ChangeAdmin() {
    this.maakAdmin = !this.maakAdmin;
    console.log(this.maakAdmin);
  }

  SearchFriends() {
    this.Zoekstring = this.EditPollForm.get(['inputSearchFriend']).value;
    this.laadGebruikers(this.Zoekstring);
  }

  laadGebruikers(zoekstring: string) {
    console.log(zoekstring);
    console.log(this.GebruikerID);
    this._pollcreateService.getPollCreate(this.GebruikerID, zoekstring).subscribe(result => {
      this.GebruikersOpZoekterm = result.gebruikersOpZoekterm;
      console.log(result);
      console.log(result.gebruikersOpZoekterm);
      console.log(this.GebruikersOpZoekterm);
      this.Zoekstring = zoekstring;
    });
  }

  addVriendToPoll(gebruiker: Gebruiker) {
    for (var i = 0; i < this.GeselecteerdeVrienden.length; i++) {
      if (this.GeselecteerdeVrienden[i].gebruikerID === gebruiker.gebruikerID) {
        this.found = true;
      }
    }

    for (var i = 0; i < this.GeselecteerdeAdmins.length; i++) {
      if (this.GeselecteerdeAdmins[i].gebruikerID === gebruiker.gebruikerID) {
        this.found = true;
      }
    }

    if (!this.maakAdmin) {
      if (!this.found) {
        this.GeselecteerdeVrienden.push(gebruiker);
        this.AddNewPG.push(gebruiker);
      }
    } else {
      if (!this.found) {
        this.GeselecteerdeAdmins.push(gebruiker);
        this.AddNewPGAdmin.push(gebruiker);
      }
    }

    console.log('AddNewPG');
    console.log(this.AddNewPG);
    console.log('AddNewPGAdmin');
    console.log(this.AddNewPGAdmin);
    this.found = false;
  }

  RemoveVriendfromPoll(gebruiker: Gebruiker) {

    for (var i = 0; i < this.AddNewPG.length; i++) {
      if (this.AddNewPG[i].gebruikerID === gebruiker.gebruikerID) {
        this.AddNewPG.splice(i, 1);
        this.check = true;
      }
    }
    console.log('AddNewPG');
    console.log(this.AddNewPG);

    for (var i = 0; i < this.AddNewPGAdmin.length; i++) {
      if (this.AddNewPGAdmin[i].gebruikerID === gebruiker.gebruikerID) {
        this.AddNewPGAdmin.splice(i, 1);
        this.check = true;
      }
    }
    console.log('AddNewPGAdmin');
    console.log(this.AddNewPGAdmin);

    if (!this.check) {
      this.DelPGs.push(gebruiker.gebruikerID);
    }

    console.log('DelPGs');
    console.log(this.DelPGs);


    for (var i = 0; i < this.DelPGs.length; i++) {
      if (this.DelUniqePGs.indexOf(this.DelPGs[i]) === -1) {
        this.DelUniqePGs.push(this.DelPGs[i]);
      }
    }

    console.log('DelUniqePGs');
    console.log(this.DelUniqePGs);


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
        console.log(this.GeselecteerdeAdmins);
      }
    }

    this.check = false;

  }


}
