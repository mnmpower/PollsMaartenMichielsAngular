import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {Vriend} from '../../Models/vriend.model';
import {VriendService} from '../../Services/vriend.service';
import {GebruikerService} from '../../Services/gebruiker.service';
import {Gebruiker} from '../../Models/gebruiker.model';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {

  SearchFriendsForm: FormGroup;
  IncomingRequests: Observable<Vriend[]>;
  OutgoingRequests: Observable<Vriend[]>;
  AllFriends: Observable<Vriend[]>;
  AddFriendList: Observable<Gebruiker[]>;
  GebruikerID: number = parseInt(sessionStorage.getItem('GebruikerID'));
  VriendUpdate: Vriend = new Vriend(0, 0, 0, false);
  VriendVoegToe: Vriend = new Vriend(0, 0, 0, false);
  Zoekstring: string;
  ToonAddIcon: Observable<boolean>;


  constructor(private fb: FormBuilder, private vriendService: VriendService, private gebruikerService: GebruikerService) {
    this.laadAll();

  }

  laadAll() {
    this.laadIncomingRequest(this.GebruikerID);
    this.laadOutgoingRequest(this.GebruikerID);
    this.laadVrienden();
    this.laadGebruikers(this.Zoekstring);
  }

  ngOnInit() {
    this.SearchFriendsForm = this.fb.group({
      inputSearchFriend: ['']
    });
    this.Zoekstring = this.SearchFriendsForm.get(['inputSearchFriend']).value;
  }

  onSubmit() {
    this.Zoekstring = this.SearchFriendsForm.get(['inputSearchFriend']).value;
    this.laadGebruikers(this.Zoekstring);
  }

  deleteFriend(vriendID: number) {
    this.vriendService.deleteVriend(vriendID).subscribe(result => {
      this.laadAll();
    });
  }

  addVriend(gebruikerID: number) {
    this.VriendVoegToe.ontvangerID = gebruikerID;
    this.VriendVoegToe.verzenderID = this.GebruikerID;
    this.VriendVoegToe.bevestigd = false;
    this.vriendService.AddVriend(this.VriendVoegToe).subscribe(result => {
      this.laadAll();
    });
  }

  AcceptIncomingRequest(vriendID: number) {
    this.vriendService.getVriendByVriendID(vriendID).subscribe(result => {
      this.VriendUpdate.vriendID = result.vriendID;
      this.VriendUpdate.verzenderID = result.verzenderID;
      this.VriendUpdate.ontvangerID = result.ontvangerID;
      this.VriendUpdate.bevestigd = true;
      this.vriendService.updateVriend(this.VriendUpdate.vriendID, this.VriendUpdate).subscribe(res => {
        console.log('gedaan');
        console.log(this.VriendUpdate.vriendID);
        this.laadAll();
      });
    });


  }

  laadVrienden() {
    this.AllFriends = this.vriendService.getAllVrienden((this.GebruikerID));
  }

  laadIncomingRequest(GebruikerID: number) {
    this.IncomingRequests = this.vriendService.getIncomingVriendRequests(GebruikerID);
  }

  laadOutgoingRequest(GebruikerID: number) {
    this.OutgoingRequests = this.vriendService.getOutgoingVriendRequests(GebruikerID);
  }

  laadGebruikers(zoekstring: string) {
    this.AddFriendList = this.gebruikerService.zoekGebruikers(zoekstring, this.GebruikerID);
  }

  checkOfBestaat(VriendID: number) {
    if (this.vriendService.checkCombo(VriendID, this.GebruikerID) === this.ToonAddIcon) {
      return true;
    }

    if (this.vriendService.checkCombo(this.GebruikerID, VriendID) === this.ToonAddIcon) {
      return true;
    }
    return false;
  }

}
