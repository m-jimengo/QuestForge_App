
export const HTTP_ERROR_MESSAGES = {
  400: "The request contains invalid or missing information. Please check your input and try again.",
  401: "Authentication required. Please log in to access this resource.",
  403: "Access denied. You don't have permission to perform this action.",
  404: "The requested page or resource was not found.",
  408: "The request timed out. Please try again.",
  409: "There was a conflict with your request. Please refresh and try again.",
  422: "The data provided couldn't be processed. Please check the format and try again.",
  429: "Too many requests. Please wait a moment before trying again.",

  500: "Internal server error. Our team has been notified and is working on a fix.",
  501: "This feature is not currently supported. Please try again later.",
  502: "Server is temporarily unavailable. Please try again in a few minutes.",
  503: "Service temporarily unavailable due to maintenance. Please try again later.",
  504: "Server response timed out. Please try again.",
  505: "HTTP version not supported. Please update your browser or contact support."
} as const;

export const GENERIC_ERROR_MESSAGES = {
  NETWORK: "We're having trouble connecting to our servers. Please check your internet connection and try again.",
  SERVER: "Our servers are experiencing some issues right now. Please try again in a few moments.",
  CLIENT: "There seems to be an issue with your request. Please refresh the page and try again.",
  AUTHENTICATION: "Your session has expired. Please log in again to continue.",
  AUTHORIZATION: "You don't have permission to access this resource. Please contact support if you believe this is an error.",
  VALIDATION: "The information provided is invalid or incomplete. Please check your input and try again.",
  NOT_FOUND: "The requested resource could not be found. It may have been moved or deleted.",
  TIMEOUT: "The request is taking longer than expected. Please try again.",
  UNKNOWN: "An unexpected error occurred. Please try again or contact support if the problem persists."
} as const;

export const API_ERROR_MESSAGES = {
  USERS: {
    NOT_FOUND: "User not found. Please check the user ID and try again.",
    FETCH_FAILED: "Failed to load users. Please refresh the page and try again.",
    UPDATE_FAILED: "Failed to update user information. Please try again.",
    CREATE_FAILED: "Failed to create user. Please check your input and try again.",
    DELETE_FAILED: "Failed to delete user. Please try again."
  },
  BOARD: {
    LOAD_FAILED: "Failed to load the board. Please refresh the page and try again.",
    FILTER_FAILED: "Failed to apply filters. Please try again.",
    SEARCH_FAILED: "Search failed. Please try again with different terms."
  },
  CHAT: {
    SEND_FAILED: "Failed to send message. Please check your connection and try again.",
    LOAD_FAILED: "Failed to load messages. Please refresh and try again.",
    CONNECTION_LOST: "Connection lost. Trying to reconnect..."
  }
} as const;

export const getErrorMessage = (statusCode?: number, fallbackMessage?: string): string => {
  if (statusCode && HTTP_ERROR_MESSAGES[statusCode as keyof typeof HTTP_ERROR_MESSAGES]) {
    return HTTP_ERROR_MESSAGES[statusCode as keyof typeof HTTP_ERROR_MESSAGES];
  }
  if (fallbackMessage) {
    return fallbackMessage;
  }
  return GENERIC_ERROR_MESSAGES.UNKNOWN;
};