export enum DrugName {
  HerbalTea = "Herbal Tea",
  Fervex = "Fervex",
  MagicPill = "Magic Pill",
  Dafalgan = "Dafalgan",
  Doliprane = "Doliprane",
  Test = "Test",
}

export class Drug {
  constructor(
    public name: DrugName,
    public expiresIn: number,
    public benefit: number
  ) {}
}
