import {Poll} from './poll.model';
import {Stem} from './stem.model';

export class PollOptie {
  stemID: number;
  pollOptieID: number;
  pollID: number;
  antwoord: string;
  poll: Poll;
  stemmen: Stem[];

  constructor(
    public PollOptieID: number,
    public PollID: number,
    public Antwoord: string,
    public Poll?: Poll,
    public Stemmen?: Stem[]
  ) {
  }
}
