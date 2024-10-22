const nodeCrypto = require('crypto');

module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.(t|j)sx?$': [
      'ts-jest',
      { tsconfig: '<rootDir>/jsconfig.test.json' },
    ],
  },
  transformIgnorePatterns: ['/node_modules/(?!(pretty-bytes|@react-hook)/)'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  testEnvironment: './src/__testutils__/jest-environment-jsdom-custom.js',
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  reporters: ['default', 'jest-junit'],
};
