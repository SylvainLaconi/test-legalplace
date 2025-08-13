import { Pharmacy } from "./models/pharmacy"
import { Drug, DrugName } from "./models/drug"

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(new Pharmacy([new Drug(DrugName.Test, 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug(DrugName.Test, 1, 2)]
    );
  });

  it("should not drop benefit below 0", () => {
    expect(new Pharmacy([new Drug(DrugName.Test, 5, 0)]).updateBenefitValue()).toEqual(
      [new Drug(DrugName.Test, 4, 0)]
    );
  });

  it("should degrade twice as fast after expiration", () => {
    expect(new Pharmacy([new Drug(DrugName.Test, 0, 10)]).updateBenefitValue()).toEqual(
      [new Drug(DrugName.Test, -1, 8)]
    );
  });

  it('should increase benefit for "Herbal Tea" before expiration', () => {
    expect(
      new Pharmacy([new Drug(DrugName.HerbalTea, 5, 10)]).updateBenefitValue()
    ).toEqual([new Drug(DrugName.HerbalTea, 4, 11)]);
  });

  it('should increase benefit twice as fast for "Herbal Tea" after expiration', () => {
    expect(
      new Pharmacy([new Drug(DrugName.HerbalTea, 0, 10)]).updateBenefitValue()
    ).toEqual([new Drug(DrugName.HerbalTea, -1, 12)]);
  });

  it('should cap "Herbal Tea" benefit at 50', () => {
    expect(
      new Pharmacy([new Drug(DrugName.HerbalTea, 10, 50)]).updateBenefitValue()
    ).toEqual([new Drug(DrugName.HerbalTea, 9, 50)]);
  });

  it('should not change "Magic Pill" benefit nor expiresIn', () => {
    expect(
      new Pharmacy([new Drug(DrugName.MagicPill, 15, 40)]).updateBenefitValue()
    ).toEqual([new Drug(DrugName.MagicPill, 15, 40)]);
  });

  // Fervex
  it('should increase "Fervex" by 1 when > 10 days', () => {
    expect(new Pharmacy([new Drug(DrugName.Fervex, 11, 20)]).updateBenefitValue()).toEqual(
      [new Drug(DrugName.Fervex, 10, 21)]
    );
  });

  it('should increase "Fervex" by 2 when 10 days or less', () => {
    expect(new Pharmacy([new Drug(DrugName.Fervex, 10, 20)]).updateBenefitValue()).toEqual(
      [new Drug(DrugName.Fervex, 9, 22)]
    );
  });

  it('should increase "Fervex" by 3 when 5 days or less', () => {
    expect(new Pharmacy([new Drug(DrugName.Fervex, 5, 20)]).updateBenefitValue()).toEqual(
      [new Drug(DrugName.Fervex, 4, 23)]
    );
  });

  it('should drop "Fervex" benefit to 0 after expiration', () => {
      expect(new Pharmacy([new Drug(DrugName.Fervex, 0, 25)]).updateBenefitValue()).toEqual(
      [new Drug(DrugName.Fervex, -1, 0)]
    );
  });

  it('should cap "Fervex" at 50 when increasing fast', () => {
    expect(new Pharmacy([new Drug(DrugName.Fervex, 5, 49)]).updateBenefitValue()).toEqual(
      [new Drug(DrugName.Fervex, 4, 50)]
    );
  });

  it('should degrade "Dafalgan" twice as fast before expiration', () => {
    expect(new Pharmacy([new Drug(DrugName.Dafalgan, 5, 10)]).updateBenefitValue()).toEqual(
      [new Drug(DrugName.Dafalgan, 4, 8)]
    );
  });

  it('should degrade "Dafalgan" four times as fast after expiration', () => {
    expect(new Pharmacy([new Drug(DrugName.Dafalgan, 0, 10)]).updateBenefitValue()).toEqual(
      [new Drug(DrugName.Dafalgan, -1, 6)]
    );
  });

  it('should not drop "Dafalgan" below 0', () => {
    expect(new Pharmacy([new Drug(DrugName.Dafalgan, 3, 1)]).updateBenefitValue()).toEqual(
      [new Drug(DrugName.Dafalgan, 2, 0)]
    );
  });
});
