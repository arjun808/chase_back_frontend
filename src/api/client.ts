export interface ApiErrorResponse {
  message?: string | string[];
  statusCode?: number;
  error?: string;
}

export class ApiError extends Error {
  public statusCode: number;
  public details?: ApiErrorResponse;

  constructor(message: string, statusCode: number, details?: ApiErrorResponse) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

/**
 * Base URL: Defaults to empty string to leverage the Vite proxy (/auth, /gmail, /api),
 * or can be overridden via VITE_API_URL environment variable.
 */
const BASE_URL = import.meta.env.VITE_API_URL || '';

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;

  const headers = new Headers(options.headers || {});
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  headers.set('Accept', 'application/json');

  const config: RequestInit = {
    ...options,
    headers,
    credentials: 'include', // Crucial for sending & receiving httpOnly cookies
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    let errorData: ApiErrorResponse | undefined;
    try {
      errorData = await response.json();
    } catch {
      // Non-JSON error body
    }

    const errorMessage =
      (Array.isArray(errorData?.message)
        ? errorData?.message.join(', ')
        : errorData?.message) ||
      errorData?.error ||
      `Request failed with status ${response.status}: ${response.statusText}`;

    throw new ApiError(errorMessage, response.status, errorData);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),
};
