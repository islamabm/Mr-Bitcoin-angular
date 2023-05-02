export class UserModel {
  constructor(
    public name: string,
    public coins: number,
    public moves: any[],
    public url: string,
    public bitcoinRate?: number
  ) {}
}
