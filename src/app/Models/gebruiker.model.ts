export class Gebruiker {
  token: string;
  gebruikerID: number;
  voornaam: string;
  naam: string;
  gebruikersnaam: string;
  email: string;
  wachtwoord: string;

  constructor(
    public GebruikerID: number,
    public Voornaam: string,
    public Naam: string,
    public Gebruikersnaam: string,
    public Email: string,
    public Wachtwoord: string,
    public Token: string
  ) {
  }
}
