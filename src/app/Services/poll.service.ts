
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Poll} from '../Models/poll.model';
import {Pollresult} from '../ViewModels/pollresult.viewModel';

@Injectable()
export class PollService {

  constructor(private http: HttpClient) {
  }

  getPolls(): Observable<Poll[]> {
    return this.http.get<Poll[]>('https://localhost:44364/api/Poll');
  }

  addPoll(poll: Poll) {
    return this.http.post<Poll>('https://localhost:44364/api/Poll', poll);
  }

  updatePoll(pollID: number, poll: Poll) {
    return this.http.put<Poll>('https://localhost:44364/api/Poll/' + pollID, poll);
  }

  deletePoll(pollID: number) {
    return this.http.delete<Poll>('https://localhost:44364/api/Poll/' + pollID);
  }

  getPollByID(pollID: number) {
    return this.http.get<Poll>('https://localhost:44364/api/Poll/get/' + pollID);
  }

  getPollresultViewModel(pollID: number) {
    return this.http.get<Pollresult>('https://localhost:44364/api/Poll/PollresultViewModel/' + pollID);
  }
}
