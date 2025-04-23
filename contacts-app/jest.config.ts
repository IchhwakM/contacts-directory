/** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'jsdom',
//   moduleNameMapper: {
//     '^.+\\.(css|less|scss|png)$': 'identity-obj-proxy'
//   },
//   "transform": {
//     "^.+\\.tsx?$": "<rootDir>/node_modules/ts-jest/preprocessor.js",
//     "^.+\\.svg$": "<rootDir>/svgTransform.js"
//   },
//   setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
//   testTimeout: 40000
// };

// jest.config.js
// module.exports = {
//   setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
// };
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    '/node_modules/(?!(axios)/)', // <- explicitly allow axios to be transformed
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy', // for styles if needed
  },
};

export default config;