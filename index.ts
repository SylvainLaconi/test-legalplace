import { Drug, DrugName } from "./models/drug";
import {  Pharmacy } from "./models/pharmacy";

import fs from "fs";

const drugs: Drug[] = [
  new Drug(DrugName.Doliprane, 20, 30),
  new Drug(DrugName.HerbalTea, 10, 5),
  new Drug(DrugName.Fervex, 12, 35),
  new Drug(DrugName.MagicPill, 15, 40),
  new Drug(DrugName.Dafalgan, 10, 20),
];

const pharmacy = new Pharmacy(drugs);

const log: Drug[][] = [];

for (let elapsedDays = 0; elapsedDays < 30; elapsedDays++) {
  log.push(JSON.parse(JSON.stringify(pharmacy.updateBenefitValue())));
}

/* eslint-disable no-console */
fs.writeFile(
  "output.json",
  JSON.stringify({ result: log }, null, 2).concat("\n"),
  (err) => {
    if (err) {
      console.log("error");
    } else {
      console.log("success");
    }
  },
);

/* eslint-enable no-console */
