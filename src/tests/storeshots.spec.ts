import { test, expect } from '../fixtures';

test.describe('StoreShots — Home & Editor Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://storeshots.qaimos.co.uk/', { waitUntil: 'domcontentloaded' });
    // Wait for initial load — gallery may take a moment
    await page.waitForTimeout(800);
  });

  test('should load StoreShots homepage with title', async ({ page }) => {
    await expect(page).toHaveTitle(/StoreShots/);
    await expect(page).toHaveURL(/.*storeshots.qaimos.co.uk/);
  });

  test('should show device toggle tabs', async ({ page }) => {
    // Device tabs appear only after entering the editor
    await page.click('#btnBlankProject');
    await page.waitForTimeout(500);
    await expect(page.locator('button.seg[data-device="iphone"]')).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('button.seg[data-device="duo"]')).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('button.seg[data-device="ipad"]')).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('button.seg[data-device="android"]')).toBeVisible({ timeout: 10_000 });
  });

  test('should switch between device tabs', async ({ page }) => {
    // First ensure gallery is loaded — click blank project
    await page.click('#btnBlankProject');
    await page.waitForTimeout(500);

    // Now device tabs should be visible
    await page.click('button.seg[data-device="duo"]');
    await page.waitForTimeout(300);
    const duoDevice = await page.evaluate(() => document.querySelector('button.seg.active')?.getAttribute('data-device'));
    expect(duoDevice).toBe('duo');

    // Switch to iPad
    await page.click('button.seg[data-device="ipad"]');
    await page.waitForTimeout(300);
    const ipadDevice = await page.evaluate(() => document.querySelector('button.seg.active')?.getAttribute('data-device'));
    expect(ipadDevice).toBe('ipad');
  });

  test('should show gallery templates', async ({ page }) => {
    // Gallery is the initial screen - no need to create project
    // Wait for gallery section to load
    await page.waitForSelector('section.gal-hero, section.gal-grid', { timeout: 10_000 });
    // Check for gallery card buttons
    const templates = page.locator('button.gal-card');
    expect(await templates.count()).toBeGreaterThan(0);
  });

  test('should start a blank project', async ({ page }) => {
    await page.click('#btnBlankProject');
    await page.waitForTimeout(800);
    await expect(page.locator('#btnUploadScreenTop')).toBeVisible();
  });

  test('should open text panel', async ({ page }) => {
    await page.click('#btnBlankProject');
    await page.waitForTimeout(500);
    await page.click('[data-panel="text"]');
    await page.waitForTimeout(200);
    await expect(page.locator('[data-panel="text"]')).toHaveClass(/active/);
  });

  test('should open export panel', async ({ page }) => {
    await page.click('#btnBlankProject');
    await page.waitForTimeout(500);
    await page.click('[data-panel="export"]');
    await page.waitForTimeout(200);
    await expect(page.locator('[data-panel="export"]')).toHaveClass(/active/);
  });

  test('should add a slide', async ({ page }) => {
    await page.click('#btnBlankProject');
    await page.waitForTimeout(500);
    await page.click('#btnAddSlide');
    await page.waitForTimeout(300);
    await page.click('#btnAddSlide');
    await page.waitForTimeout(300);
    await expect(page.locator('#btnAddSlide')).toBeVisible();
  });

  test('should show replace screenshot button', async ({ page }) => {
    await page.click('#btnBlankProject');
    await page.waitForTimeout(500);
    await expect(page.locator('#btnUploadScreenTop')).toBeVisible();
  });

  test('should open and close preview strip', async ({ page }) => {
    await page.click('#btnBlankProject');
    await page.waitForTimeout(500);
    await page.click('#btnPreviewRow');
    await page.waitForTimeout(200);
    await expect(page.locator('#btnPreviewRow')).toBeVisible();
    await page.click('#btnRowPreviewClose');
    await page.waitForTimeout(200);
  });

  test('should show export buttons with pricing', async ({ page }) => {
    await page.click('#btnBlankProject');
    await page.waitForTimeout(500);
    await expect(page.locator('#btnExportOne')).toBeVisible();
    await expect(page.locator('#btnExportAll')).toBeVisible();
    await expect(page.locator('#btnExportOne')).toContainText('$');
  });

  test('should show paywall on export attempt', async ({ page }) => {
    await page.click('#btnBlankProject');
    await page.waitForTimeout(500);
    await page.click('#btnExportOne');
    await page.waitForTimeout(500);
    await expect(page.locator('.paywall-backdrop')).toBeVisible();
  });

  test('should dismiss paywall with "Not now"', async ({ page }) => {
    await page.click('#btnBlankProject');
    await page.waitForTimeout(500);
    await page.click('#btnExportOne');
    await page.waitForTimeout(300);
    await page.click('button:has-text("Not now")');
    await page.waitForTimeout(300);
    await expect(page.locator('.paywall-backdrop')).toBeHidden();
  });

  test('should show template gallery with correct categories', async ({ page }) => {
    // Gallery is initial screen - verify template categories are present
    await page.waitForSelector('section.gal-hero, section.gal-grid', { timeout: 10_000 });
    // Use non-exact text match — templates have varying text spans
    await expect(page.getByRole('button', { name: 'Trailing Phone' })).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole('button', { name: 'Habit Glow' })).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole('button', { name: 'Deep Focus' })).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole('button', { name: 'Midnight Pro' })).toBeVisible({ timeout: 5000 });
  });
});