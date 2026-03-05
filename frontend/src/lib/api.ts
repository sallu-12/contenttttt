type SendEmailPayload = {
  to?: string;
  subject?: string;
  text?: string;
  html?: string;
  name?: string;
  email?: string;
  instagram?: string;
  channelLink?: string;
  niche?: string;
  message?: string;
};

type ApiSuccessResponse = {
  success: boolean;
  message?: string;
};

type ApiErrorResponse = {
  error?: string;
};

const DEFAULT_TIMEOUT_MS = 30000;
const RETRY_TIMEOUT_MS = 60000;

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const unique = (values: string[]) => Array.from(new Set(values));

const getApiBaseCandidates = () => {
  const envPrimary = import.meta.env.VITE_API_BASE_URL?.trim();
  const envFallback = import.meta.env.VITE_API_FALLBACK_URL?.trim();
  const sameOrigin = typeof window !== "undefined" ? window.location.origin : "";

  return unique([
    envPrimary || "",
    sameOrigin,
    envFallback || "",
    "https://bolzaa-backend.onrender.com",
  ].map((value) => trimTrailingSlash(value)).filter(Boolean));
};

const buildApiUrl = (base: string, path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
};

const isTimeoutError = (err: unknown) => {
  return err instanceof DOMException && (err.name === "TimeoutError" || err.name === "AbortError");
};

const parseHttpError = (error: unknown) => {
  if (!(error instanceof Error)) {
    return null;
  }

  const match = /^HTTP_(\d{3}):(.*)$/.exec(error.message);
  if (!match) {
    return null;
  }

  return {
    status: Number(match[1]),
    message: match[2] || "API request failed",
  };
};

const sendEmailRequest = async (url: string, payload: SendEmailPayload, timeoutMs: number) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(timeoutMs),
  });

  const data = (await response.json().catch(() => ({}))) as ApiSuccessResponse & ApiErrorResponse;

  if (!response.ok) {
    throw new Error(`HTTP_${response.status}:${data.error || "API request failed"}`);
  }

  return {
    success: data.success ?? true,
    message: data.message,
  };
};

export const sendEmail = async (payload: SendEmailPayload, timeoutMs = DEFAULT_TIMEOUT_MS): Promise<ApiSuccessResponse> => {
  const endpoints = getApiBaseCandidates().map((base) => buildApiUrl(base, "/api/send-email"));
  const attemptTimeouts = [timeoutMs, Math.max(RETRY_TIMEOUT_MS, timeoutMs)];
  let lastError: unknown = null;

  for (const endpoint of endpoints) {
    for (const attemptTimeout of attemptTimeouts) {
      try {
        return await sendEmailRequest(endpoint, payload, attemptTimeout);
      } catch (error) {
        lastError = error;

        const httpError = parseHttpError(error);
        if (httpError) {
          // Try fallback endpoints only for infra/route issues.
          if ([404, 502, 503, 504].includes(httpError.status)) {
            break;
          }
          throw new Error(httpError.message);
        }

        if (isTimeoutError(error)) {
          continue;
        }

        // Network/CORS/other fetch issues should try next endpoint.
        break;
      }
    }
  }

  if (isTimeoutError(lastError)) {
    throw new Error("Server slow response. Please try again in 20-30 seconds.");
  }

  throw new Error("Server connection issue. Please refresh and try again.");
};
