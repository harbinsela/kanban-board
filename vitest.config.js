import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // simulate browser (localStorage, DOM)
  },
});
