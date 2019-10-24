import {Injectable} from '@angular/core';
import {Stem} from '../Models/stem.model';
import {HttpClient} from '@angular/common/http';
import {Vriend} from '../Models/vriend.model';

@Injectable()
export class StemService {

  constructor(private http: HttpClient) {
  }

  AddStem(stem: Stem) {
    return this.http.post<Stem>('https://localhost:44364/api/Stem', stem);
  }

  RemoveStem(GebruikerID: number, PollOptieID: number) {
    return this.http.delete<Stem>('https://localhost:44364/api/Stem/DeleteGebruikers/' + GebruikerID + '?pollOptieID=' + PollOptieID);
  }
}
