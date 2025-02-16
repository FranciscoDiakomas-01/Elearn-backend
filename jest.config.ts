import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'], // Localização dos testes
  collectCoverage: true, // Gera relatório de cobertura
  coverageDirectory: 'coverage', // Diretório de saída do relatório
  moduleFileExtensions: ['ts', 'js'], // Extensões de arquivo suportadas
};

export default config;
