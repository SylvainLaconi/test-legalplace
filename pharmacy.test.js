import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 2)],
    );
  });

  it("should not drop benefit below 0", () => {
    expect(new Pharmacy([new Drug("test", 5, 0)]).updateBenefitValue()).toEqual(
      [new Drug("test", 4, 0)],
    );
  });

  it("should degrade twice as fast after expiration", () => {
    expect(
      new Pharmacy([new Drug("test", 0, 10)]).updateBenefitValue(),
    ).toEqual([new Drug("test", -1, 8)]);
  });

  it('should increase benefit for "Herbal Tea" before expiration', () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", 5, 10)]).updateBenefitValue(),
    ).toEqual([new Drug("Herbal Tea", 4, 11)]);
  });

  it('should increase benefit twice as fast for "Herbal Tea" after expiration', () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", 0, 10)]).updateBenefitValue(),
    ).toEqual([new Drug("Herbal Tea", -1, 12)]);
  });

  it('should cap "Herbal Tea" benefit at 50', () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", 10, 50)]).updateBenefitValue(),
    ).toEqual([new Drug("Herbal Tea", 9, 50)]);
  });

  it('should not change "Magic Pill" benefit nor expiresIn', () => {
    expect(
      new Pharmacy([new Drug("Magic Pill", 15, 40)]).updateBenefitValue(),
    ).toEqual([new Drug("Magic Pill", 15, 40)]);
  });

  it('should increase "Fervex" by 1 when more than 10 days left', () => {
    expect(
      new Pharmacy([new Drug("Fervex", 11, 20)]).updateBenefitValue(),
    ).toEqual([new Drug("Fervex", 10, 21)]);
  });

  it('should increase "Fervex" by 2 when 10 days or less', () => {
    expect(
      new Pharmacy([new Drug("Fervex", 10, 20)]).updateBenefitValue(),
    ).toEqual([new Drug("Fervex", 9, 22)]);
  });

  it('should increase "Fervex" by 3 when 5 days or less', () => {
    expect(
      new Pharmacy([new Drug("Fervex", 5, 20)]).updateBenefitValue(),
    ).toEqual([new Drug("Fervex", 4, 23)]);
  });

  it('should drop "Fervex" benefit to 0 after expiration', () => {
    expect(
      new Pharmacy([new Drug("Fervex", 0, 25)]).updateBenefitValue(),
    ).toEqual([new Drug("Fervex", -1, 0)]);
  });

  it('should cap "Fervex" benefit at 50 even when increasing fast', () => {
    expect(
      new Pharmacy([new Drug("Fervex", 5, 49)]).updateBenefitValue(),
    ).toEqual([new Drug("Fervex", 4, 50)]);
  });

  it('should degrade "Dafalgan" twice as fast as normal before expiration', () => {
    expect(
      new Pharmacy([new Drug("Dafalgan", 5, 10)]).updateBenefitValue(),
    ).toEqual([new Drug("Dafalgan", 4, 8)]);
  });

  it('should degrade "Dafalgan" four times as fast after expiration', () => {
    expect(
      new Pharmacy([new Drug("Dafalgan", 0, 10)]).updateBenefitValue(),
    ).toEqual([new Drug("Dafalgan", -1, 6)]);
  });

  it('should not drop "Dafalgan" benefit below 0', () => {
    expect(
      new Pharmacy([new Drug("Dafalgan", 3, 1)]).updateBenefitValue(),
    ).toEqual([new Drug("Dafalgan", 2, 0)]);
  });
});
