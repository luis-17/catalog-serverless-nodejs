module.exports = {
  // ,'src/**/database.constant.js','src/data-access.js'
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: [
    'src/libs/*'
  ],
  testMatch: [
    '**/*.steps.js'
  ],
  testTimeout: 30000,
  coverageReporters: ['clover', 'json', 'lcov', 'text', 'text-summary'],
  collectCoverage: true,
  coverageDirectory: 'coverage/apps/channel-cnel-reports'
};
