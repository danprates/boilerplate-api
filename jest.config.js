/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/**/*.fixture.ts'
  ],
  coverageDirectory: 'coverage',
  testResultsProcessor: 'jest-sonar-reporter',
  coverageReporters: ['json', 'lcov', 'text', 'text-summary'],
  roots: ['<rootDir>'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  testMatch: ['**/*.unit.ts', '**/*.integration.ts'],
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1'
  }
}
