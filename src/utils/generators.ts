/** Generate a random string */
export function randomString(length = 8): string {
  return Math.random().toString(36).slice(2, 2 + length);
}

/** Generate a random email */
export function randomEmail(): string {
  return `user-${randomString(10)}@example.com`;
}
