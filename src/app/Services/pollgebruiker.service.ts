import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PollGebruiker} from '../Models/poll-gebruiker.model';
import {Poll} from '../Models/poll.model';

@Injectable()
export class PollgebruikerService {

  constructor(private http: HttpClient) {
  }

  AddPollGebruiker(pollGebruiker: PollGebruiker) {
    return this.http.post<PollGebruiker>('https://localhost:44364/api/PollGebruiker', pollGebruiker);
  }

  DeletePollGebruiker(pollID: number, GebruikerID: number) {
    return this.http.delete<PollGebruiker>('https://localhost:44364/api/PollGebruiker/DeletePG/' + pollID + '?id2=' + GebruikerID);
  }
}
