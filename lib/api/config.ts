/**
 * API Configuration
 *
 * Centralized configuration for API endpoints and settings
 */

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  version: process.env.NEXT_PUBLIC_API_VERSION || 'v1',

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
