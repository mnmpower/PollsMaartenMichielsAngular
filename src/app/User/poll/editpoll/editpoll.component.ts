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

  allePO: PollOptie[] =[];

  EditPollForm: FormGroup;
  PollOptions: FormArray;
  NewPollOptions: FormArray;

  newOptionAdded = false;


  editPoll: Poll = new Poll(0, '',[],[]);

  constructor(private _editPollService: EditpollService, private fb: FormBuilder, private _pollService: PollService, private _pollGebruikerService: PollgebruikerService,
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
      //this.AddNewOption();
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

    console.log(this.PollOptions);
    console.log('bestaande opties:');
    console.log(this.pollOpties);
    console.log('nieuwe opties:');
    console.log(this.newPollOpties);
    console.log(this.NewPollOptions);
    console.log('nieuwe title:');
    console.log(this.title);

    this.editPoll.Naam = this.title;
    this.editPoll.PollID = this.pollID;
    for (let PO of this.pollOpties) {
      this.editPoll.PollOpties.push(PO);
    }

    for (let PO of this.newPollOpties) {
      this.editPoll.PollOpties.push(PO);
    }

    this._pollService.getPollByID(this.pollID).subscribe(result => {
      this.editPoll.PollGebruikers = result.PollGebruikers;
      this._pollService.updatePoll(this.pollID, this.editPoll).subscribe(r => {
        console.log(r);
      });
    });

  }

  // Hier extra geplaatst

  AddNewOption() {
    this.newOptionAdded = true;
    this.NewPollOptions = this.EditPollForm.get('NewPollOptions') as FormArray;
    this.NewPollOptions.push(this.createPollOption());
    this.newPollOpties.push(new PollOptie(0, this.pollID, ''));
  }

  // proceed() {
  //   this.newPollOpties.push(new PollOptie(0, this.pollID, ''));
  //   NewPollOptions: this.fb.array([this.createNewPollOption()]);
  //   // this.NewPollOptions
  //   this.NewPollOptions.push(this.createNewPollOption());
  // }

  createPollOption(): FormGroup {
    return this.fb.group({
      antwoord: ''
    });
  }

  RemoveExistingOptionHTML(index: number) {
    this.pollOpties.splice(index, 1);
    console.log(index);
  }

  RemoveNewExistingOptionHTML(index: number) {
    this.newPollOpties.splice(index, 1);
    console.log(index);
  }

}
