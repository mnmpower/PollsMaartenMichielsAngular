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
    if (localStorage.getItem('token') != null){
      this.isLoggedin.next(true);
    }
  }

  authenticate(login: Login): Observable<Gebruiker> {
    return this._httpClient.post<Gebruiker>('https://localhost:44364/api/Gebruiker/authenticate', login);

  }

  isLogged() {
    return localStorage.getItem('token') != null;
  }

}
