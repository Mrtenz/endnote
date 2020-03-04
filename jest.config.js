module.exports = {
  projects: ['<rootDir>/packages/*'],
  collectCoverage: true,
  collectCoverageFrom: ['**/*.ts?(x)', '!**/*.d.ts', '!jest/**/*'],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  }
};
