---
name: playwright-framework-build
description: Complete Playwright test automation framework for storeshots verification
metadata:
  type: project
---

# Playwright Framework Build — Completed & Monitoring

**Project:** `playwright-framework/` in `/Users/vas/Documents/claude5/playwright-framework/`

A production-grade Playwright test framework built from scratch with:
- TypeScript with strict mode
- Page Object Model pattern (basePage.ts, homePage.ts, loginPage.ts)
- Custom typed fixtures (loginPage, api)
- Flexible selector system (testId, css, text, role)
- Multi-project config (Chromium only)
- GitHub Actions CI workflow
- Dashboard-ready reporters (HTML + line + JSON)

## Key Files Created

| File | Purpose |
|------|---------|
| `package.json` | Dependencies, scripts (test/ui/ci/debug) |
| `playwright.config.ts` | Playwright config with reporters, 60s timeout, 2 retries |
| `tsconfig.json` | TypeScript strict configuration |
| `src/pages/basePage.ts` | Base page with selector resolution (testId/css/text/role) |
| `src/pages/homePage.ts` | StoreShots POM with device tabs, panels, export, paywall |
| `src/fixtures.ts` | Custom typed fixtures extending Playwright base test |
| `src/api/baseApi.ts` | Typed API client for HTTP tests |
| `src/tests/storeshots.spec.ts` | 14 verification tests against storeshots.qaimos.co.uk |
| `src/tests/sample.spec.ts` | Smoke tests against example.com |
| `src/tests/fixtures.spec.ts` | Custom fixture validation tests |
| `.github/workflows/ci.yml` | GitHub Actions CI pipeline |
| `MCP-INTEGRATION.md` | OpenRouter API + MCP integration guide for AI agent verification |
| `README.md` | Full documentation with quick start, features, scripts |
| `framework-demo.gif` | 30-frame animated demo (1000×560, 206K) showing framework architecture, test execution, storeshots verification flow, and 19/19 results |

## Test Results

- **5/5** sample + fixtures tests pass
- **14/14** storeshots tests pass (paywall flow, device tabs, gallery all verified)
- **19/19** total tests green (npm run test:ci, ~10s)
- All confirmed multiple times across autonomous loop ticks

## To Run

```bash
npm ci
npx playwright install --with-deps chromium
npm run test:ui     # Interactive mode
npm run test:ci     # Headless CI mode
npm run report      # Open HTML report
```

## MCP / AI Agent Verification

- OpenRouter API key from `claude-env.sh`: `sk-or-v1-...your-key-here...`
- MCP-INTEGRATION.md documents both Anthropic's official MCP server and custom proxy approach
- basePage.ts actions map 1:1 to MCP protocol actions
- `/loop` autonomous monitoring active (every 5m, checking test status)

## Next Steps for Full storeshots Verification

1. Handle gallery template selector edge cases (text spans multiple elements)
2. Add MCP server for AI-powered verification (using OpenRouter API key from claude-env.sh)
3. Add AI agent verification for visual regression testing
4. Expand test coverage for drag-drop, sticker interactions

## API Key (from claude-env.sh)

OpenRouter key: Set via `claude-env.sh` (see `.env.example`)