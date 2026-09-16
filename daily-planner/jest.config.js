const transform = {
  '^.+\\.[jt]sx?$': ['babel-jest', {
    presets: [['@babel/preset-react', { runtime: 'automatic' }]],
    plugins: ['@babel/plugin-transform-modules-commonjs'],
  }],
}

export default {
  projects: [
    {
      displayName: 'unitarias',
      testEnvironment: 'node',
      transform,
      testMatch: ['<rootDir>/src/utils/**/*.test.js'],
    },
    {
      displayName: 'daily-planner',
      testEnvironment: 'jsdom',
      transform,
      moduleNameMapper: { '\\.css$': '<rootDir>/src/testStyles.js' },
      setupFilesAfterEnv: ['<rootDir>/src/testSetup.js'],
      testMatch: ['<rootDir>/src/**/*.test.js', '<rootDir>/src/**/*.test.jsx'],
      testPathIgnorePatterns: ['/node_modules/', '/src/utils/'],
    },
  ],
}
