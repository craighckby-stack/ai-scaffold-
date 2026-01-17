import type { Config } from 'jest';
import nextJest from 'next/jest';

// Setup Next.js specifics
// dir: Specifies the directory where the Next.js project is located (root of the repo).
const createJestConfig = nextJest({ dir: './' });

// Define the custom Jest configuration base
const customJestConfig: Config = {
  // --- Environment & Setup ---
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // --- Performance & Resolution ---
  // Explicitly define roots for faster module resolution
  roots: ['<rootDir>/src', '<rootDir>/__tests__'], 
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // --- Aliases & Mocks ---
  moduleNameMapper: {
    // 1. Alias Resolution (must match tsconfig paths)
    '^@/(.*)$': '<rootDir>/src/$1',
    // 2. Handle CSS/SCSS imports (Requires identity-obj-proxy)
    '^.+\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    // 3. Handle image/asset imports (Mocks file/url imports)
    '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  
  // --- Transformation & Ignoring ---
  transformIgnorePatterns: [
    // Ignore all node_modules except specific packages that need Babel transformation (e.g., ESM modules)
    '/node_modules/(?!@testing-library|other-esm-package-name)/',
    '/.next/',
  ],
  
  // --- Test Execution ---
  testMatch: [
    // Comprehensive test matching patterns
    '**/__tests__/**/*.(spec|test).{ts,tsx,js,jsx}',
    '**/?(*.)+(spec|test).{ts,tsx,js,jsx}',
  ],
  
  // --- Coverage Configuration ---
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',
    // Standard Exclusions
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/__tests__/**/*',
    // Next.js Boilerplate Exclusions
    '!src/pages/_app.tsx',
    '!src/pages/_document.tsx',
    '!src/pages/api/**/*',
    '!src/lib/mocks/**/*', // Assuming common mock folders
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};

// Export the merged configuration
export default createJestConfig(customJestConfig);