
import {
  API_ERROR_MESSAGES,
  GENERIC_ERROR_MESSAGES,
  getErrorMessage,
} from "@/app/Errors/ErrorsMessage";

export function getErrorsFromBack<
  C extends keyof typeof API_ERROR_MESSAGES = keyof typeof API_ERROR_MESSAGES,
  A extends keyof (typeof API_ERROR_MESSAGES)[C] = keyof (typeof API_ERROR_MESSAGES)[C]
>(
  error: unknown,
  context?: C,
  action?: A
): string {
  const err = error as any;

  const statusCode = err?.response?.status || err?.status;
  if (statusCode) return getErrorMessage(statusCode);

  if (err?.response?.message) return String(err.response.message);
  if (err?.message && typeof err.message === "string") return err.message;

  if (err?.context && err?.action) {
    const ctx = err.context as keyof typeof API_ERROR_MESSAGES;
    const act = err.action as keyof (typeof API_ERROR_MESSAGES)[typeof ctx];
    const msg = API_ERROR_MESSAGES[ctx]?.[act];
    if (msg) return msg;
  }

  if (context && action && API_ERROR_MESSAGES[context]?.[action]) {
    return API_ERROR_MESSAGES[context][action] as string;
  }

  if (err?.message?.includes("NetworkError") || err?.name === "TypeError") {
    return GENERIC_ERROR_MESSAGES.NETWORK;
  }

  return GENERIC_ERROR_MESSAGES.UNKNOWN;
}
