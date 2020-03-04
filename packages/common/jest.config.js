module.exports = {
  displayName: '@endnote/common',
  roots: ['./src'],
  setupFilesAfterEnv: ['./jest/setupTests.ts'],
  snapshotResolver: './jest/snapshotResolver.js',
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  }
};
