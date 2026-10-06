import { BasePage } from './basePage';

/**
 * Page Object Model for StoreShots editor.
 * Uses CSS selectors and role-based selectors for precision.
 */
export class HomePage extends BasePage {
  // Device toggle buttons - buttons with specific data-device attribute
  readonly deviceToggleIphone = 'button[data-device="iphone"] >> text=iPhone';
  readonly deviceToggleDuo = 'button[data-device="duo"] >> text=Duo';
  readonly deviceToggleIpad = 'button[data-device="ipad"] >> text=iPad';
  readonly deviceToggleAndroid = 'button[data-device="android"] >> text=Android';

  // Gallery templates - buttons in the gallery section
  readonly galleryTemplate = (name: string) => `section >> text="${name}"`;

  // Create project
  readonly startBlankButton = '#btnBlankProject';

  // Slide management
  readonly addSlideButton = '#btnAddSlide';

  // Screenshot replacement
  readonly replaceScreenshotButton = '#btnUploadScreenTop';

  // Text editing controls
  readonly headlineInput = 'input[name="headline"]';
  readonly captionInput = 'input[name="caption"]';
  readonly textPanel = '[data-panel="text"]';
  readonly devicePanel = '[data-panel="device"]';

  // Tool panel tabs
  readonly toolTabText = 'text=Text';
  readonly toolTabExport = 'text=Export';

  // Background controls
  readonly uploadBgButton = '#btnUploadBg';
  readonly applyToAllScreensButton = '#btnApplyBgAll';

  // Stickers
  readonly uploadStickerButton = '#btnUploadSticker';

  // Export controls
  readonly previewRowButton = '#btnPreviewRow';
  readonly downloadPngButton = '#btnExportOne';
  readonly downloadZipButton = '#btnExportAll';
  readonly keepInSessionButton = '#btnSave';

  // Preview strip
  readonly previewStripAllSlides = '.chip[data-row-scope="all"]';
  readonly previewStripActiveSpan = '.chip[data-row-scope="span"]';

  // Paywall overlay
  readonly paywallBackdrop = '.paywall-backdrop';
  readonly notNowButton = '#paywallNotNow';
  readonly continueToPaymentButton = '#btnPaywallUnlock';

  /** Navigate to StoreShots */
  async navigate() {
    await this.page.goto('https://storeshots.qaimos.co.uk/', { waitUntil: 'domcontentloaded' });
    await this.page.waitForSelector('body', { timeout: 10_000 });
  }

  /** Start a blank project */
  async startBlankProject() {
    await this.click('#btnBlankProject');
  }

  /** Select device type */
  async selectDevice(device: 'iphone' | 'duo' | 'ipad' | 'android') {
    await this.click(`button[data-device="${device}"]`);
  }

  /** Click a gallery template by name */
  async selectGalleryTemplate(name: string) {
    await this.page.click(`section >> text="${name}"`);
  }

  /** Add a new slide */
  async addSlide() {
    await this.click('#btnAddSlide');
  }

  /** Open text panel */
  async openTextPanel() {
    await this.click('#panelText');
  }

  /** Open export panel */
  async openExportPanel() {
    await this.click('#panelExport');
  }

  /** Open preview strip */
  async openPreviewStrip() {
    await this.click('#btnPreviewRow');
  }

  /** Close preview strip */
  async closePreviewStrip() {
    await this.click('#btnRowPreviewClose');
  }

  /** Attempt to export (triggers paywall) */
  async attemptExport() {
    await this.click('#btnExportOne');
  }

  /** Check if paywall is visible */
  async isPaywallVisible(): Promise<boolean> {
    return await this.page.locator('.paywall-backdrop').isVisible();
  }

  /** Click "Not now" on paywall */
  async dismissPaywall() {
    await this.click('#paywallNotNow');
  }

  /** Click "Continue to payment" on paywall */
  async proceedToPayment() {
    await this.click('#btnPaywallUnlock');
  }

  /** Screenshot the current page */
  async screenshot(name: string) {
    await this.page.screenshot({
      path: `assets/screenshots/${name}-${Date.now()}.png`,
      fullPage: true,
    });
  }
}