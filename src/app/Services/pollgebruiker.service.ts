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

  // nog aanpassen
  // addStemmen(PollID: number, stemmen: PollGebruiker[]) {
  //   return this.http.post<>('https://localhost:44364/api/Stem/voegStemmenToe/' + PollID, stemmen);
  // }
  //
  // RemoveStem(GebruikerID: number, PollOptieID: number) {
  //   return this.http.delete<PollGebruiker>('https://localhost:44364/api/Stem/DeleteGebruikers/' + GebruikerID + '?pollOptieID=' + PollOptieID);
  // }

  AddPollGebruikers(PollID: number, GeselecteerdeVrienden: Gebruiker[]) {
    return this.http.post<PollGebruiker>('https://localhost:44364/api/PollGebruiker/AddPollGebruikers/', +PollID, GeselecteerdeVrienden);
  }
}
