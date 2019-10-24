import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pollcreate} from '../ViewModels/pollcreate.ViewModel';

export class PollcreateService {

  constructor(private http: HttpClient) {
  }

  getPollCreate(GebruikerID: number, zoekterm?: string): Observable<Pollcreate> {
    return this.http.get<Pollcreate>('https://localhost:44364/api/PollCreate/' + GebruikerID + '?zoekterm=' + zoekterm);
  }
}
