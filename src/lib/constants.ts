/**
 * Checks if the code is running in a browser environment.
 *
 * @returns {boolean} True if running in a browser, false if running on the server.
 *
 * @example
 * ```typescript
 * if (browser) {
 *   // Browser-specific code
 *   localStorage.setItem('key', 'value');
 * }
 * ```
 */
export const browser = typeof window !== 'undefined'
