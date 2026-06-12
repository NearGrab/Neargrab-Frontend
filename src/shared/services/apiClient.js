import { supabase } from './supabase';

const DEFAULT_TIMEOUT = 10000; // 10 seconds

const apiClient = {
  onUnauthorized: null, // Registered by auth store to handle global logout

  async request(path, options = {}) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
    const normalizedPath = path.startsWith('/api/v1') 
      ? path 
      : (path.startsWith('/') ? `/api/v1${path}` : `/api/v1/${path}`);
    let url = `${baseUrl}${normalizedPath}`;

    if (options.params) {
      const searchParams = new URLSearchParams();
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            searchParams.set(key, value.join(','));
          } else {
            searchParams.set(key, String(value));
          }
        }
      });
      const queryStr = searchParams.toString();
      if (queryStr) {
        url += (url.includes('?') ? '&' : '?') + queryStr;
      }
    }

    const {
      timeout = DEFAULT_TIMEOUT,
      headers = {},
      method = 'GET',
      body,
      retrySafe = false,
      ...extraOptions
    } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const mergedHeaders = { ...headers };

    // Attach Supabase accessToken dynamically if available
    try {
      let accessToken = localStorage.getItem('neargrab_access_token');
      if (!accessToken) {
        const { data: { session } } = await supabase.auth.getSession();
        accessToken = session?.access_token;
      }
      if (accessToken && !mergedHeaders['Authorization']) {
        mergedHeaders['Authorization'] = `Bearer ${accessToken}`;
      }
    } catch (err) {
      console.error('Failed to retrieve active Supabase session:', err);
    }

    // Determine content type
    let finalBody = body;
    if (body && !(body instanceof FormData)) {
      mergedHeaders['Content-Type'] = 'application/json';
      finalBody = JSON.stringify(body);
    }

    const fetchOptions = {
      method,
      headers: mergedHeaders,
      body: finalBody,
      signal: controller.signal,
      ...extraOptions
    };

    let response;
    try {
      response = await fetch(url, fetchOptions);
      clearTimeout(id);
    } catch (error) {
      clearTimeout(id);
      if (error.name === 'AbortError') {
        throw {
          status: 408,
          code: 'TIMEOUT',
          message: 'Request timed out',
          details: {},
          requestId: null
        };
      }
      // Retry safe GET requests if network fails (idempotent retry)
      if (method === 'GET' && retrySafe) {
        let retryId;
        try {
          const retryController = new AbortController();
          retryId = setTimeout(() => retryController.abort(), timeout);
          response = await fetch(url, { ...fetchOptions, signal: retryController.signal });
          clearTimeout(retryId);
        } catch (retryError) {
          if (retryId) clearTimeout(retryId);
          throw {
            status: 0,
            code: 'NETWORK_ERROR',
            message: 'Network connection failed',
            details: {},
            requestId: null
          };
        }
      } else {
        throw {
          status: 0,
          code: 'NETWORK_ERROR',
          message: 'Network connection failed',
          details: {},
          requestId: null
        };
      }
    }

    const requestId = response.headers.get('x-request-id');

    // Handle unauthorized response (e.g. invalid/revoked Supabase token)
    if (response.status === 401) {
      clearTokensAndLogout();
      throw await parseErrorResponse(response, requestId);
    }

    if (!response.ok) {
      throw await parseErrorResponse(response, requestId);
    }

    return parseSuccessResponse(response);
  },

  get(path, options = {}) {
    return this.request(path, { ...options, method: 'GET' });
  },

  post(path, body, options = {}) {
    return this.request(path, { ...options, method: 'POST', body });
  },

  put(path, body, options = {}) {
    return this.request(path, { ...options, method: 'PUT', body });
  },

  patch(path, body, options = {}) {
    return this.request(path, { ...options, method: 'PATCH', body });
  },

  delete(path, options = {}) {
    return this.request(path, { ...options, method: 'DELETE' });
  }
};

async function parseSuccessResponse(response) {
  try {
    const resData = await response.json();
    return {
      success: resData.success ?? true,
      data: resData.data,
      meta: resData.meta || {}
    };
  } catch (e) {
    return { success: false, data: {}, meta: {} };
  }
}

async function parseErrorResponse(response, requestId) {
  let errorData;
  try {
    const json = await response.json();
    errorData = json.error;
  } catch (e) {
    // Non-JSON response
  }

  return {
    status: response.status,
    code: errorData?.code || 'UNKNOWN_ERROR',
    message: errorData?.message || response.statusText || 'Something went wrong',
    details: errorData?.details || {},
    requestId
  };
}

function clearTokensAndLogout() {
  localStorage.removeItem('neargrab_access_token');
  localStorage.removeItem('neargrab_refresh_token');
  localStorage.removeItem('neargrab_user');
  // Trigger Supabase signOut just in case
  supabase.auth.signOut().catch(() => {});
  if (apiClient.onUnauthorized) {
    apiClient.onUnauthorized();
  }
}

export default apiClient;
