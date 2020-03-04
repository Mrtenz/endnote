module.exports = {
  displayName: '@endnote/frontend',
  roots: ['./src'],
  clearMocks: true,
  moduleNameMapper: {
    '\\.(woff|woff2|svg)$': './jest/fileMock.ts'
  },
  setupFilesAfterEnv: ['./jest/setupTests.ts'],
  snapshotResolver: './jest/snapshotResolver.js',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  }
};
