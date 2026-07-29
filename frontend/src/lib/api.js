import axios from "axios";

/**
 * API base URL resolution (production-ready, env-driven only — NO hardcoded URLs):
 *  1. REACT_APP_API_URL -> used as-is (must already include the "/api" suffix).
 *                          Set this in frontend/.env.production for the custom domain.
 *  2. Same-origin "/api" -> fallback. Works in preview AND production because the
 *                          frontend and backend are served from the same domain
 *                          (ingress routes "/api" to the backend). This keeps the
 *                          bundle free of any environment-specific hardcoded URLs.
 */
const RAW_API_URL = process.env.REACT_APP_API_URL;

function resolveApiBase() {
  if (RAW_API_URL && RAW_API_URL.trim()) {
    return RAW_API_URL.replace(/\/+$/, ""); // strip trailing slash
  }
  return "/api"; // same-origin relative path
}

export const API = resolveApiBase();

const TOKEN_KEY = "elastech_admin_token";
const REQUEST_TIMEOUT_MS = 20000; // 20s timeout
const MAX_RETRIES = 2; // retry failed requests twice

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export const api = axios.create({
  baseURL: API,
  timeout: REQUEST_TIMEOUT_MS,
});

// Attach bearer token
api.interceptors.request.use((config) => {
  const t = getToken();
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

// Retry transient failures (network errors, timeouts, 5xx). Never retry 4xx.
function isRetryable(error) {
  if (error.code === "ECONNABORTED") return true; // timeout
  if (!error.response) return true; // network error / no response
  const status = error.response.status;
  return status >= 500 && status < 600;
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config || {};
    config.__retryCount = config.__retryCount || 0;

    if (isRetryable(error) && config.__retryCount < MAX_RETRIES) {
      config.__retryCount += 1;
      const delay = 400 * config.__retryCount; // simple backoff
      // eslint-disable-next-line no-console
      console.warn(
        `[API retry ${config.__retryCount}/${MAX_RETRIES}] ${config.method?.toUpperCase()} ${config.url} — ${error.message}`
      );
      await new Promise((r) => setTimeout(r, delay));
      return api(config);
    }

    // Log all final API errors to the browser console for debugging.
    // eslint-disable-next-line no-console
    console.error("[API error]", {
      url: config.baseURL ? `${config.baseURL}${config.url || ""}` : config.url,
      method: config.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    return Promise.reject(error);
  }
);

export function formatApiError(detail) {
  if (detail == null) return "Terjadi kesalahan. Coba lagi.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail))
    return detail
      .map((e) => (e && typeof e.msg === "string" ? e.msg : JSON.stringify(e)))
      .filter(Boolean)
      .join(" ");
  if (detail && typeof detail.msg === "string") return detail.msg;
  return String(detail);
}
