export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateBenefitValue() {
    for (const drug of this.drugs) {
      const name = drug.name;
      let { expiresIn, benefit } = drug;

      // Magic Pill: immuable
      if (name === "Magic Pill") {
        continue;
      }

      // Calcul de la variation de benefit avant décrément de expiresIn
      const isExpired = expiresIn <= 0;
      const clamp = (v) => Math.max(0, Math.min(50, v));

      if (name === "Herbal Tea") {
        // +1 avant, +2 après expiration
        benefit += isExpired ? 2 : 1;
      } else if (name === "Fervex") {
        if (isExpired) {
          benefit = 0;
        } else if (expiresIn <= 5) {
          benefit += 3;
        } else if (expiresIn <= 10) {
          benefit += 2;
        } else {
          benefit += 1;
        }
      } else if (name === "Dafalgan") {
        // -2 avant, -4 après expiration
        benefit -= isExpired ? 4 : 2;
      } else {
        // Médicament "normal": -1 avant, -2 après expiration
        benefit -= isExpired ? 2 : 1;
      }

      // Appliquer bornes
      drug.benefit = clamp(benefit);

      // Tous sauf Magic Pill décrémentent expiresIn
      drug.expiresIn = expiresIn - 1;
    }

    return this.drugs;
  }
}
