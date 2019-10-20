import {Gebruiker} from './gebruiker.model';

export class Vriend {
  vriendID: number;
  verzenderID: number;
  ontvangerID: number;
  bevestigd: boolean;
  ontvanger: Gebruiker;
  verzender: Gebruiker;

  constructor(
    public VriendID: number,
    public VerzenderID: number,
    public OntvangerID: number,
    public Bevestigd: boolean,
    public Ontvanger?: Gebruiker,
    public Verzender?: Gebruiker
  ) {
  }
}
