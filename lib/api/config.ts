/**
 * API Configuration
 *
 * Centralized configuration for API endpoints and settings
 */

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  version: process.env.NEXT_PUBLIC_API_VERSION || 'v1',

  // Cache revalidation times (in seconds)
  revalidate: {
    tenant: 3600,        // 1 hour
    postsPage1: 600,     // 10 minutes
    postsOther: 900,     // 15 minutes
    postDetail: 1800,    // 30 minutes
    magicLink: 1800,     // 30 minutes
  },

  // Timeout settings
  timeout: {
    read: 10000,   // 10 seconds for GET requests
    write: 30000,  // 30 seconds for POST requests
  },
} as const;

/**
 * Get the full API base URL including version
 */
export function getApiBaseUrl(): string {
  return `${API_CONFIG.baseUrl}/api/${API_CONFIG.version}`;
}
