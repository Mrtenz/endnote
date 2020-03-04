module.exports = {
  displayName: '@endnote/backend',
  roots: [
    './src'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**/*.ts?(x)'
  ],
  setupFilesAfterEnv: ['./jest/setupTests.ts'],
  snapshotResolver: './jest/snapshotResolver.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[t|j]sx?$': 'ts-jest'
  }
};
