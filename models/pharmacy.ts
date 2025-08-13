import { Drug, DrugName } from "./drug";

export class Pharmacy {
  constructor(public drugs: Drug[] = []) {}

  updateBenefitValue(): Drug[] {
    for (const drug of this.drugs) {
      if (drug.name === DrugName.MagicPill) continue;

      const isExpired = drug.expiresIn <= 0;
      let delta = 0;

      switch (drug.name) {
        case DrugName.HerbalTea:
          delta = isExpired ? 2 : 1;
          break;

        case DrugName.Fervex:
          if (isExpired) {
            drug.benefit = 0; // clamp appliqué par Drug
            drug.expiresIn -= 1;
            continue;
          } else if (drug.expiresIn <= 5) {
            delta = 3;
          } else if (drug.expiresIn <= 10) {
            delta = 2;
          } else {
            delta = 1;
          }
          break;

        case DrugName.Dafalgan:
          delta = isExpired ? -4 : -2;
          break;

        default:
          delta = isExpired ? -2 : -1;
          break;
      }

      drug.benefit = drug.benefit + delta; // clamp automatique
      drug.expiresIn -= 1;
    }

    return this.drugs;
  }
}
