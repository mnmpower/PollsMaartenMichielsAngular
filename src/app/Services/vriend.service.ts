import {Vriend} from '../Models/vriend.model';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class VriendService {

  constructor(private http: HttpClient) {
  }

  checkCombo(id: number, id2: number) {
    return this.http.get<boolean>('https://localhost:44364/api/Vriend/CheckCombo/' + id + '?id2=' + id2);
  }

  getAllVrienden(GebruikerID: number): Observable<Vriend[]> {
    return this.http.get<Vriend[]>('https://localhost:44364/api/Vriend/GetAllVrienden/' + GebruikerID);
  }

  getIncomingVriendRequests(GebruikerID: number): Observable<Vriend[]> {
    return this.http.get<Vriend[]>('https://localhost:44364/api/Vriend/GetVriendschapsverzoekIn/' + GebruikerID);
  }

  getOutgoingVriendRequests(GebruikerID: number): Observable<Vriend[]> {

    return this.http.get<Vriend[]>('https://localhost:44364/api/Vriend/GetVriendschapsverzoekUit/' + GebruikerID);
  }

  getVriend(): Observable<Vriend[]> {
    return this.http.get<Vriend[]>('https://localhost:44364/api/Vriend');
  }

  getVriendByVriendID(VriendID: number) {
    return this.http.get<Vriend>('https://localhost:44364/api/Vriend/' + VriendID);
  }

  AddVriend(vriend: Vriend) {
    return this.http.post<Vriend>('https://localhost:44364/api/Vriend', vriend);
  }

  updateVriend(vriendID: number, vriend: Vriend) {
    return this.http.put<Vriend>('https://localhost:44364/api/Vriend/' + vriendID, vriend);
  }

  deleteVriend(vriendID: number) {
    console.log('IN SERVICE');
    console.log(vriendID);
    console.log(this.http.delete<Vriend>('https://localhost:44364/api/Vriend/' + vriendID));
    return this.http.delete<Vriend>('https://localhost:44364/api/Vriend/' + vriendID);
  }
}
