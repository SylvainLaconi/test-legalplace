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
    benefit: number
  ) {
    this.benefit = this.clamp(benefit);
  }

  private _benefit!: number;

  get benefit(): number {
    return this._benefit;
  }

  set benefit(value: number) {
    this._benefit = this.clamp(value);
  }

  private clamp(v: number): number {
    return Math.max(0, Math.min(50, v)); // clamp entre 0 et 50
  }
}
