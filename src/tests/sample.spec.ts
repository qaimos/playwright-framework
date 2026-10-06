import { test, expect } from '../fixtures';

test.describe('Sample Tests — Example.com', () => {
  test('should have correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Example Domain');
  });

  test('should display documentation text', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('p').first()).toBeVisible();
    await expect(page.locator('p').first()).toContainText('documentation examples');
  });

  test('test ID selector shorthand', async ({ page }) => {
    await page.setContent('<div data-testid="widget"><span>Content</span></div>');
    await expect(page.locator('[data-testid="widget"] span')).toHaveText('Content');
  });
});
