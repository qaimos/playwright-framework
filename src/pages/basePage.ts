import { Page, expect } from '@playwright/test';

/**
 * Base page object with flexible selector helpers.
 * Supports data-testid, CSS, text, and role-based selectors.
 */
export abstract class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a URL (relative to baseURL from config)
   */
  async goto(path: string = '') {
    await this.page.goto(path);
  }

  /**
   * Resolve a selector into a Playwright Locator.
   * Supports:
   *   - data-testid: "testId:foo"  → `[data-testid="foo"]`
   *   - CSS:        "css:button"   → `button`
   *   - text:       "text:Submit"  → `text=Submit`
   *   - role:       "role:button"  → `role=button`
   */
  resolve(selector: string) {
    const [type, ...rest] = selector.split(':');
    const value = rest.join(':');
    switch (type) {
      case 'testId':
        return this.page.locator(`[data-testid="${value}"]`);
      case 'css':
        return this.page.locator(value);
      case 'text':
        return this.page.getByText(value);
      case 'role':
        return this.page.getByRole(value as any);
      case 'label':
        return this.page.getByLabel(value);
      default:
        return this.page.locator(selector);
    }
  }

  /**
   * Wait for element to be visible
   */
  async waitForVisible(selector: string, timeout = 15_000) {
    await this.resolve(selector).waitFor({ state: 'visible', timeout });
  }

  /**
   * Click element after ensuring it's visible and enabled
   */
  async click(selector: string, timeout = 15_000) {
    const locator = this.resolve(selector);
    await locator.waitFor({ state: 'visible', timeout });
    await locator.click();
  }

  /**
   * Fill input field
   */
  async fill(selector: string, value: string, timeout = 15_000) {
    const locator = this.resolve(selector);
    await locator.waitFor({ state: 'visible', timeout });
    await locator.fill(value);
  }

  /**
   * Get text content of element
   */
  async getText(selector: string, timeout = 15_000): Promise<string> {
    const locator = this.resolve(selector);
    await locator.waitFor({ state: 'visible', timeout });
    return locator.textContent() ?? '';
  }

  /**
   * Assert element is visible
   */
  async assertVisible(selector: string, timeout = 15_000) {
    await expect(this.resolve(selector)).toBeVisible({ timeout });
  }

  /**
   * Assert element is hidden
   */
  async assertHidden(selector: string, timeout = 15_000) {
    await expect(this.resolve(selector)).toBeHidden({ timeout });
  }

  /**
   * Assert element contains specific text
   */
  async assertText(selector: string, expectedText: string, timeout = 15_000) {
    await expect(this.resolve(selector)).toHaveText(expectedText, { timeout });
  }

  /**
   * Assert current URL matches pattern
   */
  async assertURL(pattern: string | RegExp, timeout = 15_000) {
    await expect(this.page).toHaveURL(pattern, { timeout });
  }

  /**
   * Take screenshot with custom name
   */
  async screenshot(name: string) {
    await this.page.screenshot({
      path: `assets/screenshots/${name}-${Date.now()}.png`,
      fullPage: true
    });
  }

  /**
   * Check if element is visible (returns boolean)
   */
  async isVisible(selector: string, timeout = 1000): Promise<boolean> {
    try {
      await this.resolve(selector).waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }
}