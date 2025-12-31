/**
 * API Client
 *
 * Core HTTP client for making API requests to the Laravel backend
 * Handles authentication, error handling, caching, and request formatting
 */

import { getApiBaseUrl, API_CONFIG } from './config';
import { ApiError, parseApiError, handleFetchError } from './errors';
import type { ApiErrorResponse } from '@/types/api';

/**
 * Request options for API client
 */
export interface ApiRequestOptions extends RequestInit {
  /**
   * Revalidation time in seconds for Next.js caching
   * Set to 0 or false to disable caching
   */
  revalidate?: number | false;

  /**
   * Timeout in milliseconds (optional)
   */
  timeout?: number;

  /**
   * Skip error parsing and throw raw error
   */
  skipErrorParsing?: boolean;
}

/**
 * Make a GET request to the API
 */
export async function apiGet<T>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { revalidate, timeout, skipErrorParsing, ...fetchOptions } = options;

  const url = `${getApiBaseUrl()}${path}`;

  const requestOptions: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...fetchOptions.headers,
    },
    ...fetchOptions,
  };

  // Apply Next.js caching strategy
  if (revalidate !== undefined) {
    if (revalidate === false || revalidate === 0) {
      requestOptions.cache = 'no-store';
    } else {
      requestOptions.next = { revalidate };
    }
  }

  try {
    const controller = new AbortController();
    const timeoutId = timeout
      ? setTimeout(() => controller.abort(), timeout)
      : null;

    const response = await fetch(url, {
      ...requestOptions,
      signal: controller.signal,
    });

    if (timeoutId) clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData: ApiErrorResponse | undefined = await response
        .json()
        .catch(() => undefined);

      throw parseApiError(response, errorData);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (skipErrorParsing) {
      throw error;
    }
    throw handleFetchError(error);
  }
}

/**
 * Make a POST request to the API
 */
export async function apiPost<TRequest, TResponse>(
  path: string,
  body: TRequest,
  options: ApiRequestOptions = {}
): Promise<TResponse> {
  const { timeout, skipErrorParsing, ...fetchOptions } = options;

  const url = `${getApiBaseUrl()}${path}`;

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...fetchOptions.headers,
    },
    body: JSON.stringify(body),
    cache: 'no-store', // POST requests should never be cached
    ...fetchOptions,
  };

  try {
    const controller = new AbortController();
    const timeoutId = timeout
      ? setTimeout(() => controller.abort(), timeout)
      : null;

    const response = await fetch(url, {
      ...requestOptions,
      signal: controller.signal,
    });

    if (timeoutId) clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData: ApiErrorResponse | undefined = await response
        .json()
        .catch(() => undefined);

      throw parseApiError(response, errorData);
    }

    // Return both response data and headers for special cases
    const data = await response.json();

    // For magic link subscriptions, we need to extract headers
    if (path.includes('/magic-links/')) {
      return {
        ...data,
        headers: {
          alreadySubscribed:
            response.headers.get('X-Already-Subscribed') === 'true',
          hasPublishedPosts:
            response.headers.get('X-Has-Published-Posts') === 'true',
        },
      } as TResponse;
    }

    return data;
  } catch (error) {
    if (skipErrorParsing) {
      throw error;
    }
    throw handleFetchError(error);
  }
}

/**
 * Helper to build query string from object
 */
export function buildQueryString(
  params: Record<string, string | number | boolean | undefined>
): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}
