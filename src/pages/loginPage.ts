import { BasePage } from './basePage';

export class LoginPage extends BasePage {
  /** Selectors for login page */
  readonly usernameField = '[data-testid="username"]';
  readonly passwordField = '[data-testid="password"]';
  readonly loginButton = '[data-testid="login-submit"]';
  readonly errorMessage = '[data-testid="error-message"]';

  /** Navigate to login page */
  async navigate() {
    await this.goto('/login');
  }

  /** Login with valid credentials */
  async login(username: string, password: string) {
    await this.fillTestId('username', username);
    await this.fillTestId('password', password);
    await this.clickTestId('login-submit');
    // Return to allow chaining; also validate we landed on the home page
    await this.assertURL('/');
  }

  /** Get error message when login fails */
  async getError(): Promise<string> {
    return this.getText('error-message');
  }
}