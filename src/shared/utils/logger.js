/**
 * Structured client-side logging utility.
 * Enriches logs with timestamps, error context, and X-Request-ID headers from the backend.
 */
export const logger = {
  info(message, context = {}) {
    const timestamp = new Date().toISOString();
    console.log(`[INFO] [${timestamp}] ${message}`, context);
  },

  warn(message, context = {}) {
    const timestamp = new Date().toISOString();
    console.warn(`[WARN] [${timestamp}] ${message}`, context);
  },

  error(message, errorObj = {}) {
    const timestamp = new Date().toISOString();
    
    // Extract metadata if it is an API error object
    const details = {
      code: errorObj?.code || 'UNKNOWN_ERROR',
      status: errorObj?.status || null,
      requestId: errorObj?.requestId || null,
      details: errorObj?.details || {}
    };

    console.error(`[ERROR] [${timestamp}] ${message}`, {
      message: errorObj?.message || String(errorObj),
      ...details
    });
  }
};
