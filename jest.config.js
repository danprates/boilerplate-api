/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/**/index.ts', '!<rootDir>/src/main/**/*'],
  coverageDirectory: 'coverage',
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  testMatch: ['**/*.unit.ts', '**/*.integration.ts'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
}
