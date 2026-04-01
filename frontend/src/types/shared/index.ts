/**
 * Shared type definitions used across frontend modules.
 * Matches the backend DTO shapes in backend/src/auth/dto/.
 */

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id:    string;
  name:  string;
  email: string;
  role:  string;
}

/** Shape returned by POST /api/auth/login and POST /api/auth/signup */
export interface AuthResponse {
  accessToken: string;
  tokenType:   string;
  user:        AuthUser;
}

// ─── API wrappers ─────────────────────────────────────────────────────────────

/** Standard success response envelope */
export interface ApiResponse<T> {
  data:       T;
  message:    string;
  success:    boolean;
  statusCode: number;
}

/** Paginated list response envelope */
export interface PaginatedResponse<T> {
  data:       T[];
  total:      number;
  page:       number;
  pageSize:   number;
  totalPages: number;
}

/**
 * Backend error shape from AllExceptionsFilter.
 * All non-2xx responses from the API conform to this shape.
 */
export interface ApiError {
  statusCode: number;
  error:      string;
  message:    string;
  timestamp:  string;
  path:       string;
}

/** Extracts a readable error message from an RTK Query error object */
export function extractErrorMessage(err: unknown): string {
  if (!err || typeof err !== 'object') return 'An unexpected error occurred.';
  const e = err as Record<string, unknown>;
  // RTK Query wraps the response body in e.data
  if (e.data && typeof e.data === 'object') {
    const data = e.data as Record<string, unknown>;
    if (typeof data.message === 'string') return data.message;
  }
  if (typeof e.message === 'string') return e.message;
  return 'An unexpected error occurred.';
}
