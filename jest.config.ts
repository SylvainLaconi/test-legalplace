import type {Config} from 'jest';

const config: Config = {
  testEnvironment: "node",
  transform: { "^.+\\.(t|j)sx?$": "babel-jest" },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  roots: ["<rootDir>"],
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"]
};

export default config;
