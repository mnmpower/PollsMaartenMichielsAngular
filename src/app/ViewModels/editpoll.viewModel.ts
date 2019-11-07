import {PollGebruiker} from '../Models/poll-gebruiker.model';
import {Poll} from '../Models/poll.model';
import {PollOptie} from '../Models/poll-optie.model';

export class Editpoll {
  editPoll: Poll;
  pollGebruikers: PollGebruiker[];
  beheerders: PollGebruiker[];
  pollOpties: PollOptie[];
}
