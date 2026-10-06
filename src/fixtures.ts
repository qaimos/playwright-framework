import { test as base } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import { BaseApi } from './api/baseApi';

/** Custom test context — extends Playwright base with typed fixtures */
type TestFixtures = {
  /** LoginPage instance */
  loginPage: LoginPage;
  /** API client */
  api: BaseApi;
};

/** Export test with custom fixtures */
export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  api: async ({ request }, use) => {
    await use(new BaseApi(request));
  },
});

export { expect } from '@playwright/test';
