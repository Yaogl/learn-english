module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/assets/scripts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/assets/scripts/$1'
  }
};
