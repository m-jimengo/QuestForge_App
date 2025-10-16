// Utils/http/queryString.ts
export type Primitive = string | number | boolean | Date;
export type ParamValue = Primitive | Primitive[] | null | undefined;

export interface BuildQueryOptions {

  arrayFormat?: "repeat" | "comma" | "indices";
  skipNulls?: boolean;
  encode?: boolean;
  keyCase?: "camel" | "snake" | "kebab" | ((key: string) => string);
}

const toKeyCase = (key: string, keyCase?: BuildQueryOptions["keyCase"]) => {
  if (!keyCase) return key;
  if (typeof keyCase === "function") return keyCase(key);
  if (keyCase === "snake") return key.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`);
  if (keyCase === "kebab") return key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
  return key; 
};

const stringify = (v: Primitive): string =>
  v instanceof Date ? v.toISOString() : String(v);

const shouldSkip = (v: ParamValue, skipNulls?: boolean) =>
  !!skipNulls && (v === null || v === undefined || (typeof v === "string" && v === ""));

export function buildQuery(
  params: Record<string, ParamValue>,
  opts: BuildQueryOptions = {}
): string {
  const {
    arrayFormat = "repeat",
    skipNulls = true,
    encode = true,
    keyCase,
  } = opts;

  const parts: string[] = [];

  const push = (k: string, val: Primitive) => {
    const key = toKeyCase(k, keyCase);
    const v = stringify(val);
    const enc = (s: string) => (encode ? encodeURIComponent(s) : s);
    parts.push(`${enc(key)}=${enc(v)}`);
  };

  Object.entries(params).forEach(([key, value]) => {
    if (shouldSkip(value, skipNulls)) return;

    if (Array.isArray(value)) {
      const arr = value.filter((x) => !shouldSkip(x as any, skipNulls)) as Primitive[];

      if (arr.length === 0) return;

      switch (arrayFormat) {
        case "comma":
          push(key, arr.map(stringify).join(","));
          break;
        case "indices":
          arr.forEach((v, i) => {
            const enc = (s: string) => (encode ? encodeURIComponent(s) : s);
            const k = `${toKeyCase(key, keyCase)}[${i}]`;
            parts.push(`${enc(k)}=${enc(stringify(v))}`);
          });
          break;
        case "repeat":
        default:
          arr.forEach((v) => push(key, v));
      }
      return;
    }

    push(key, value as Primitive);
  });

  return parts.join("&");
}

export function withQuery(
  baseUrl: string,
  params: Record<string, ParamValue>,
  opts?: BuildQueryOptions
) {
  const qs = buildQuery(params, opts);
  if (!qs) return baseUrl;
  return baseUrl.includes("?") ? `${baseUrl}&${qs}` : `${baseUrl}?${qs}`;
}
