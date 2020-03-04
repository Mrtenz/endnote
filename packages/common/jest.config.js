module.exports = {
  displayName: '@endnote/common',
  roots: ['./src'],
  clearMocks: true,
  snapshotResolver: './jest/snapshotResolver.js',
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  }
};
