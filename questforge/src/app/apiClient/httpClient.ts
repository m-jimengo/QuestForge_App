
import { handleResponse, handleCatch, CommonResponse } from "./response";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface HttpOptions {
  method?: HttpMethod;
  params?: Record<string, any>;
  body?: any;
  throwErrors?: boolean;
  closeSwal?: boolean;
}

export async function http<Data>(
  url: string,
  { method = "GET", params, body, throwErrors = true, closeSwal = true }: HttpOptions = {}
): Promise<CommonResponse<Data>> {
  try {
    const query = params
      ? `?${new URLSearchParams(
          Object.entries(params).reduce((acc, [k, v]) => {
            if (v !== undefined && v !== null) acc[k] = String(v);
            return acc;
          }, {} as Record<string, string>)
        ).toString()}`
      : "";

    const res = await fetch(`${url}${query}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });

    return await handleResponse<Data>({ response: res, throwErrors, closeSwal });
  } catch (error) {
    return handleCatch<Data>({ error, throwErrors, closeSwal });
  }
}
