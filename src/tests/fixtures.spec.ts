import { test, expect } from '../fixtures';

test.describe('Custom fixtures', () => {
  test('loginPage fixture provides LoginPage instance', async ({ loginPage }) => {
    expect(loginPage).toBeInstanceOf(require('../pages/loginPage').LoginPage);
  });

  test('api fixture provides BaseApi instance', async ({ api }) => {
    expect(api).toBeInstanceOf(require('../api/baseApi').BaseApi);
  });
});