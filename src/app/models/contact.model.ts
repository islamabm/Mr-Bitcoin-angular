export class Contact {
  constructor(
    public _id: string,
    public name: string,
    public email: string,
    public phone: string,
    public url: string,
    public straighten: number
  ) {}

  setId(id: string) {
    this._id = id;
  }
}
export interface ContactFilter {
  term: string;
  phoneTerm: string;
}
