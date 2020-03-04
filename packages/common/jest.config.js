module.exports = {
  displayName: '@endnote/common',
  roots: ['./src'],
  snapshotResolver: './jest/snapshotResolver.js',
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  }
};
