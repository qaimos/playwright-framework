# Playwright Test Automation Framework

A production-ready Playwright test framework (TypeScript) with:
- **Page Object Model** (POM) with flexible selector support
- **Typed custom fixtures** for pages and API clients
- **Multi-project configuration** (Chromium, Firefox, WebKit)
- **Playwright Dashboard** integration
- **CI/CD** via GitHub Actions

## Quick Start

```bash
# Install dependencies
npm ci

# Install browsers
npx playwright install --with-deps chromium

# Run tests in UI mode
npm run test:ui

# Run tests in CI mode (headless)
npm run test:ci

# View HTML report
npm run report
```

## Project Structure

```
playwright-framework/
├── package.json                 # dependencies, scripts
├── playwright.config.ts         # main config (retries, reporters, Dashboard)
├── tsconfig.json
├── .env.example                 # template for env vars
├── .github/workflows/ci.yml     # CI pipeline
├── src/
│   ├── api/                     # API clients
│   │   └── baseApi.ts
│   ├── pages/                   # Page Object Models
│   │   ├── basePage.ts          # shared actions/assertions (testId, css, text, role)
│   │   ├── homePage.ts          # StoreShots editor POM
│   │   └── loginPage.ts         # login page POM
│   ├── fixtures.ts              # custom typed fixtures (loginPage, api)
│   ├── tests/
│   │   ├── sample.spec.ts       # smoke tests (example.com)
│   │   ├── fixtures.spec.ts     # fixture validation
│   │   └── storeshots.spec.ts   # StoreShots verification
│   └── utils/
│       ├── testId.ts            # data-testid helpers
│       └── generators.ts        # random data generation
└── assets/                      # screenshots/traces (gitignored)
```

## Key Features

### Flexible Selectors (`basePage.ts`)
```typescript
page.resolve('testId:submit')   // [data-testid="submit"]
page.resolve('css:button.primary') // button.primary
page.resolve('text:Login')      // text=Login
page.resolve('role:button')     // role=button
```

### Custom Fixtures (`fixtures.ts`)
```typescript
test.use({ loginPage: new LoginPage(page) });
test.use({ api: new BaseApi(request) });
```

### StoreShots Verification
Tests cover:
- Homepage loading and title
- Device toggle tabs (iPhone, Duo, iPad, Android)
- Gallery template categories
- Blank project creation
- Editor panel navigation (Text, Export)
- Slide management (add slides)
- Screenshot replacement
- Preview strip
- Export buttons with pricing
- Paywall flow (export → paywall → dismiss)

## CI/CD

The GitHub Actions workflow (`.github/workflows/ci.yml`):
- Runs on push/PR to main/develop
- Installs dependencies (with npm cache)
- Installs Playwright Chromium
- Runs `npm run test:ci`
- Uploads report and test results as artifacts

### Required Secrets
- `BASE_URL` — target application URL
- `PLAYWRIGHT_TOKEN` — Playwright Cloud token (optional)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run test` | Run all tests (headed) |
| `npm run test:ui` | Interactive UI mode |
| `npm run test:ci` | Headless CI run with line + JSON reporters |
| `npm run test:debug` | Debug mode with inspector |
| `npm run report` | Open HTML report |

## Environment Variables

Copy `.env.example` to `.env`:
```bash
BASE_URL=https://your-app.com
PLAYWRIGHT_TOKEN=your-token
```