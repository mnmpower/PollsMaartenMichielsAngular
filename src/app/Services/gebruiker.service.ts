import {Gebruiker} from 'src/app/Models/gebruiker.model';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class GebruikerService {

  constructor(private http: HttpClient) {
  }

  zoekGebruikers(zoekstring: string, gebruikerID: number): Observable<Gebruiker[]> {
    return this.http.get<Gebruiker[]>('https://localhost:44364/api/Gebruiker/ZoekGebruikers/' + zoekstring + '?zoekerID=' + gebruikerID);
  }

  getGebruikers(): Observable<Gebruiker[]> {
    return this.http.get<Gebruiker[]>('https://localhost:44364/api/Gebruiker');
  }

  getGebruiker(GebruikerID): Observable<Gebruiker> {
    return this.http.get<Gebruiker>('https://localhost:44364/api/Gebruiker/' + GebruikerID);
  }

  registreer(gebruiker: Gebruiker) {
    return this.http.post<Gebruiker>('https://localhost:44364/api/Gebruiker', gebruiker);
  }

  updateGebruiker(gebruikerID: number, member: Gebruiker) {
    return this.http.put<Gebruiker>('https://localhost:44364/api/Gebruiker/' + gebruikerID, member);
  }

  deleteGebruiker(gebruikerID: number) {
    return this.http.delete<Gebruiker>('https://localhost:44364/api/Gebruiker/' + gebruikerID);
  }
}
