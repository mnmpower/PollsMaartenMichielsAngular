import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PollOptie} from '../Models/poll-optie.model';

@Injectable()
export class PolloptionService {

  constructor(private http: HttpClient) {
  }

  AddPollOptie(pollOptie: PollOptie) {
    return this.http.post<PollOptie>('https://localhost:44364/api/PollOptie', pollOptie);
  }
  DeletePollOptie(pollOptieID: number) {
    return this.http.delete<PollOptie>('https://localhost:44364/api/PollOptie/' + pollOptieID);
  }
}
