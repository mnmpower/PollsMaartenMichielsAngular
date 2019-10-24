import {Gebruiker} from './gebruiker.model';
import {Poll} from './poll.model';

export class PollGebruiker {
  pollGebruikerID: number;
  pollID: number;
  gebruikerID: number;
  beheerder: boolean;
  gebruiker: Gebruiker;
  poll: Gebruiker;

  constructor(
    public PollGebruikerID: number,
    public PollID: number,
    public GebruikerID: number,
    public Beheerder: boolean,
    public Gebruiker?: Gebruiker,
    public Poll?: Poll
  ) {
  }
}
