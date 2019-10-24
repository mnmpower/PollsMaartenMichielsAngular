import {Gebruiker} from './gebruiker.model';
import {PollOptie} from './poll-optie.model';

export class Stem {
  stemID: number;
  pollOptieID: number;
  gebruikerID: boolean;
  gebruiker: Gebruiker;
  pollOptie: PollOptie;

  constructor(
    public StemID: number,
    public PollOptieID: number,
    public GebruikerID: number,
    public Gebruiker?: Gebruiker,
    public PollOptie?: PollOptie
  ) {
  }
}
