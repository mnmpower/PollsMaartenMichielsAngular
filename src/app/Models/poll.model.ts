import { PollOptie} from './poll-optie.model';
import {PollGebruiker} from './poll-gebruiker.model';

export class Poll {
  pollID: number;
  naam: string;
  pollOpties: PollOptie[];
  pollGebruikers: PollGebruiker[];
  kortenaam: string;
s
  constructor(
    public PollID: number,
    public Naam: string,
    public PollOpties?: PollOptie[],
    public PollGebruikers?: PollGebruiker[]
  ) {
  }
}
