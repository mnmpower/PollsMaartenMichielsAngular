import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import {Login} from '../Models/login.model';
import {Gebruiker} from '../Models/gebruiker.model';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  public isLoggedin = new BehaviorSubject(false);

  constructor(private _httpClient: HttpClient) {
  }

  authenticate(login: Login): Observable<Gebruiker> {
    console.log(login);
    return this._httpClient.post<Gebruiker>('https://localhost:44364/api/Gebruiker/authenticate', login);

  }

  isLogged() {
    return localStorage.getItem('token') != null;
  }

}
