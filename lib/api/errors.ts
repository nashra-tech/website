/**
 * API Error Handling
 *
 * Custom error classes and error handling utilities for API requests
 */

import { ApiErrorCode, ApiErrorResponse } from '@/types/api';

/**
 * Custom API Error class with detailed error information
 */
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public code: ApiErrorCode | string,
    message: string,
    public details?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiError';
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  /**
   * Check if this is a specific error code
   */
  is(code: ApiErrorCode | string): boolean {
    return this.code === code;
  }

  /**
   * Get a user-friendly error message
   */
  getUserMessage(): string {
    switch (this.code) {
      case ApiErrorCode.TENANT_NOT_FOUND:
        return 'The requested workspace was not found.';
      case ApiErrorCode.POST_NOT_FOUND:
        return 'The requested post was not found.';
      case ApiErrorCode.MAGIC_LINK_INVALID:
        return 'This subscription link is invalid or has expired.';
      case ApiErrorCode.EMAIL_ALREADY_SUBSCRIBED:
        return 'This email is already subscribed.';
      case ApiErrorCode.SUBSCRIPTION_FAILED:
        return 'Failed to subscribe. Please try again.';
      case ApiErrorCode.MAGIC_LINK_SUBSCRIPTION_FAILED:
        return 'Failed to subscribe. Please try again.';
      case ApiErrorCode.VALIDATION_ERROR:
        return 'Please check your input and try again.';
      default:
        return this.message || 'An unexpected error occurred. Please try again.';
    }
  }

  /**
   * Get validation errors if available
   */
  getValidationErrors(): Record<string, string[]> | undefined {
    return this.details;
  }
}

/**
 * Parse error response from API
 */
export function parseApiError(
  response: Response,
  errorData?: ApiErrorResponse
): ApiError {
  if (errorData?.error) {
    return new ApiError(
      response.status,
      errorData.error.code,
      errorData.error.message,
      errorData.error.details
    );
  }

  // Fallback for non-standard error responses
  return new ApiError(
    response.status,
    'UNKNOWN_ERROR',
    `HTTP ${response.status}: ${response.statusText}`
  );
}

/**
 * Handle network or other fetch errors
 */
export function handleFetchError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error;
  }

  if (error instanceof TypeError && error.message.includes('fetch')) {
    return new ApiError(
      0,
      'NETWORK_ERROR',
      'Unable to connect to the server. Please check your internet connection.'
    );
  }

  return new ApiError(
    500,
    'UNKNOWN_ERROR',
    error instanceof Error ? error.message : 'An unknown error occurred'
  );
}
