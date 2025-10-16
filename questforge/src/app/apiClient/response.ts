
import Swal from "sweetalert2";

export type CommonResponse<Data> = {
  success: boolean;
  status: number;
  response?: Data;
  errors?: unknown;
};

async function parseBody(res: Response) {
  if (res.status === 204) return undefined;
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    try {
      return await res.json();
    } catch {
      return undefined;
    }
  }
  const text = await res.text().catch(() => "");
  try {
    return JSON.parse(text);
  } catch {
    return text || undefined;
  }
}

export async function handleResponse<Data>({
  response,
  throwErrors = true,
  closeSwal = true,
}: {
  response: Response;
  throwErrors?: boolean;
  closeSwal?: boolean;
}): Promise<CommonResponse<Data>> {
  const data = await parseBody(response);

  if (!throwErrors && closeSwal) Swal.close();

  if (!response.ok) {
    if (!throwErrors) {
      return { success: false, status: response.status, errors: data };
    } else {
      const list = Array.isArray((data as any)?.errors)
        ? (data as any).errors.map((e: any) =>
            e?.field
              ? `In ${e.field} field you have a "${e.description}" error`
              : `${e?.description ?? "Unknown error"}`
          )
        : [typeof data === "string" ? data : JSON.stringify(data)];
      throw new Error(list.join(" | "));
    }
  }

  const payload = (data as any)?.response ?? (data as any)?.data ?? data;
  return { success: true, status: response.status, response: payload as Data };
}

export function handleCatch<Data>({
  error,
  throwErrors = true,
  closeSwal = true,
}: {
  error: any;
  throwErrors?: boolean;
  closeSwal?: boolean;
}): CommonResponse<Data> {
  if (!throwErrors && closeSwal) Swal.close();
  if (throwErrors) throw new Error(error?.message ?? String(error));
  Swal.fire({
    title: "Error",
    icon: "error",
    text: error?.message ?? "Unknown error",
    confirmButtonColor: "#1a365c",
    confirmButtonText: "Close",
  });
  return { success: false, status: 0, errors: [] };
}
