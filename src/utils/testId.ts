/**
 * Helper to prefix data-testid attributes.
 * Keeps selectors DRY across page objects.
 */
export function testId(id: string): string {
  return `[data-testid="${id}"]`;
}
