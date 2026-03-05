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

const DEFAULT_TIMEOUT_MS = 15000;
const RETRY_TIMEOUT_MS = 25000;

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const getApiBaseUrl = () => {
  const raw = import.meta.env.VITE_API_BASE_URL?.trim();
  if (!raw) {
    return "";
  }
  return trimTrailingSlash(raw);
};

const buildApiUrl = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const base = getApiBaseUrl();
  return `${base}${normalizedPath}`;
};

const isTimeoutError = (err: unknown) => {
  return err instanceof DOMException && (err.name === "TimeoutError" || err.name === "AbortError");
};

const sendEmailRequest = async (payload: SendEmailPayload, timeoutMs: number) => {
  const response = await fetch(buildApiUrl("/api/send-email"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(timeoutMs),
  });

  const data = (await response.json().catch(() => ({}))) as ApiSuccessResponse & ApiErrorResponse;

  if (!response.ok) {
    throw new Error(data.error || "API request failed");
  }

  return {
    success: data.success ?? true,
    message: data.message,
  };
};

export const sendEmail = async (payload: SendEmailPayload, timeoutMs = DEFAULT_TIMEOUT_MS): Promise<ApiSuccessResponse> => {
  try {
    return await sendEmailRequest(payload, timeoutMs);
  } catch (err) {
    // Render cold starts can exceed short client timeouts, so retry once with a longer timeout.
    if (isTimeoutError(err)) {
      try {
        return await sendEmailRequest(payload, Math.max(RETRY_TIMEOUT_MS, timeoutMs));
      } catch (retryErr) {
        if (isTimeoutError(retryErr)) {
          throw new Error("Server slow response. Please try again in 10-20 seconds.");
        }
        throw retryErr;
      }
    }
    throw err;
  }
};
