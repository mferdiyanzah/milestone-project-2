export default {
  preset: "ts-jest",
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  coveragePathIgnorePatterns: [
    "src/config",
    "<rootDir>/src/vite-env.d.ts",
    "<rootDir>/src/main.tsx",
    "<rootDir>/src/App.tsx",
  ],
  transform: {
    "^.+\\.(ts|tsx)?$": [
      "ts-jest",
      { diagnostics: { ignoreCodes: ["TS151001"] } },
    ],
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};
