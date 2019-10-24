import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Gebruiker} from '../Models/gebruiker.model';
import {Dashboard} from '../ViewModels/dashboard.viewModel';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {
  }

  getDashboard(GebruikerID: number): Observable<Dashboard> {
    return this.http.get<Dashboard>('https://localhost:44364/api/Dashboard/' + GebruikerID);
  }
}
