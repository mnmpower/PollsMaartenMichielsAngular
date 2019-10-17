import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../../Authentication/helpers/must-match.validator';
import {Observable} from 'rxjs';
import {Vriend} from '../../Models/vriend.model';
import {VriendService} from '../../Services/vriend.service';
import {GebruikerService} from '../../Services/gebruiker.service';
import {toNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {

  SearchFriendsForm: FormGroup;
  IncomingRequests: Observable<Vriend[]>;
  OutgoingRequests: Observable<Vriend[]>;
  GebruikerID: number = parseInt(sessionStorage.getItem('GebruikerID'));


  constructor(private fb: FormBuilder, private vriendService: VriendService, private gebruikerService: GebruikerService) {
    this.IncomingRequests = vriendService.getIncomingVriendRequests(this.GebruikerID);
    this.OutgoingRequests = vriendService.getOutgoingVriendRequests(this.GebruikerID);
  }


  ngOnInit() {
    this.SearchFriendsForm = this.fb.group({
      inputSearchFriend: ['', Validators.required]

    });
  }

  onSubmit() {
    console.log(this.SearchFriendsForm.get(['inputSearchFriend']).value);
  }

}
