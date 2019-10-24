import {Vriend} from './vriend.model';
import {PollGebruiker} from './poll-gebruiker.model';

export class Gebruiker {
  token: string;
  gebruikerID: number;
  voornaam: string;
  naam: string;
  gebruikersnaam: string;
  email: string;
  wachtwoord: string;
  verzondenVrienden: Vriend[];
  ontvangenVrienden: Vriend[];
  pollGebruikers: PollGebruiker[];

  constructor(
    public GebruikerID: number,
    public Voornaam: string,
    public Naam: string,
    public Gebruikersnaam: string,
    public Email: string,
    public Wachtwoord: string,
    public Token: string,
    public VerzondenVrienden?: Vriend[],
    public OntvangenVrienden?: Vriend[],
    public PollGebruikers?: PollGebruiker[]
  ) {
  }
}
