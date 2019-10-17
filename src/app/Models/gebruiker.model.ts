export class Gebruiker {
  token: string;
  gebruikerID: number;

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
