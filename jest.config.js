module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore node_modules and dist directories
    transform: {
      '^.+\\.ts$': 'ts-jest', // Use ts-jest to transpile TypeScript files
    },
    reporters: [
      'default', // Default reporter
      ['jest-html-reporters', {
        pageTitle: 'Test Report',
        outputPath: 'reports/test-report.html', // Specify the output path for the HTML report
        includeFailureMsg: true, // Include failure messages in the report
        includeSuiteFailure: true, // Include suite failure in the report
        theme: 'dark', // Optional: Choose a theme for the report
      }],
    ],
  };
  