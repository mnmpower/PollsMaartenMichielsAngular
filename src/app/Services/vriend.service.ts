import {Vriend} from '../Models/vriend.model';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class VriendService {
  constructor(private http: HttpClient) {
  }

  getAllVrienden(): Observable<Vriend[]> {
    return this.http.get<Vriend[]>('https://localhost:44364/api/Vriend');
  }

  getIncomingVriendRequests(GebruikerID: number): Observable<Vriend[]> {
    return this.http.get<Vriend[]>('https://localhost:44364/api/Vriend/GetVriendschapsverzoekIn/' + GebruikerID);
  }

  getOutgoingVriendRequests(GebruikerID: number): Observable<Vriend[]> {
    return this.http.get<Vriend[]>('https://localhost:44364/api/Vriend/GetVriendschapsverzoekUit/' + GebruikerID);
  }

  AddVriend(vriend: Vriend) {
    return this.http.post<Vriend>('https://localhost:44364/api/Vriend', vriend);
  }

  updateVriend(vriendID: number, vriend: Vriend) {
    return this.http.put<Vriend>('https://localhost:44364/api/Vriend/' + vriendID, vriend);
  }

  deleteVriend(vriendID: number) {
    return this.http.delete<Vriend>('https://localhost:44364/api/Vriend/' + vriendID);
  }
}
