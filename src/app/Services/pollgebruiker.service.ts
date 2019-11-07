import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PollGebruiker} from '../Models/poll-gebruiker.model';
import {Gebruiker} from '../Models/gebruiker.model';

@Injectable()
export class PollgebruikerService {

  constructor(private http: HttpClient) {
  }

  AddPollGebruiker(pollGebruiker: PollGebruiker) {
    return this.http.post<PollGebruiker>('https://localhost:44364/api/PollGebruiker', pollGebruiker);
  }
}
