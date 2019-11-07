import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Editpoll} from '../ViewModels/editpoll.viewModel';

@Injectable({
  providedIn: 'root'
})
export class EditpollService {

  constructor(private http: HttpClient) { }
  getEditPoll(PollID: number, zoekterm?: string): Observable<Editpoll> {
    return this.http.get<Editpoll>('https://localhost:44364/api/EditPoll/' + PollID + '?zoekterm=' + zoekterm);
  }
}
