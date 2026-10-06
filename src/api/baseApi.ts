import { APIRequestContext } from '@playwright/test';

/**
 * Typed API client for programmatic API testing.
 * Reusable across tests via the `api` fixture.
 */
export class BaseApi {
  constructor(private request: APIRequestContext, private basePath = '') {}

  /** GET request */
  async get(path: string, init?: RequestInit) {
    return this.request.get(`${this.basePath}${path}`, init);
  }

  /** POST request */
  async post(path: string, body?: unknown, init?: RequestInit) {
    return this.request.post(`${this.basePath}${path}`, {
      ...init,
      data: body,
    });
  }

  /** PUT request */
  async put(path: string, body?: unknown, init?: RequestInit) {
    return this.request.put(`${this.basePath}${path}`, {
      ...init,
      data: body,
    });
  }

  /** DELETE request */
  async delete(path: string, init?: RequestInit) {
    return this.request.delete(`${this.basePath}${path}`, init);
  }

  /** Helper to parse JSON from response */
  static async json<T = unknown>(response: Awaited<ReturnType<APIRequestContext['get']>>): Promise<T> {
    return response.json() as Promise<T>;
  }
}
