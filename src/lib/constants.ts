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
export const browser = typeof window !== 'undefined';

/**
 * Whether the code is running in a development environment.
 *
 * @returns {boolean} True if running in a development environment, false if running on the server.
 */
export const dev = import.meta.env.DEV;

/**
 * The base URL of the website.
 *
 * @returns {string} The base URL of the website.
 */
export const BASE_URL = dev ? 'http://localhost:3000' : 'https://plckr.dev';

export const WORK_POSITION = 'full stack engineer';

export const GITHUB_USERNAME = 'plckr';
export const GITHUB_PROFILE_IMAGE = 'https://avatars.githubusercontent.com/u/11768109';
export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

export const LINKEDIN_USERNAME = 'ricardoreis2';
export const LINKEDIN_PROFILE_URL = `https://www.linkedin.com/in/${LINKEDIN_USERNAME}`;
