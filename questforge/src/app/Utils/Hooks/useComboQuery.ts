// hooks/useComboQuery.ts
"use client";
import { useMemo } from "react";
import { useQuery, QueryKey } from "@tanstack/react-query";

export type Option = { label: string; value: string };

type CommonResponse<T> = { success: boolean; response?: T; message?: string };

type Params<T> = {
  queryKey: QueryKey;
  fetcher: () => Promise<CommonResponse<T[]>>;   
  labelKey?: keyof T;                            
  valueKey?: keyof T;
  mapOption?: (row: T) => Option;                 
  enabled?: boolean;
  staleTime?: number;
  refetchOnWindowFocus?: boolean;
};

export function useComboQuery<T>({
  queryKey,
  fetcher,
  labelKey,
  valueKey,
  mapOption,
  enabled = true,
  staleTime = 1000 * 60 * 5,
  refetchOnWindowFocus = false,
}: Params<T>) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey,
    queryFn: async () => {
      const res = await fetcher();
      if (!res.success) throw new Error(res.message || "Fetch error");
      return res.response ?? [];
    },
    enabled,
    staleTime,
    refetchOnWindowFocus,
  });

  const options: Option[] = useMemo(() => {
    if (!data) return [];
    if (mapOption) return data.map(mapOption);
    if (!labelKey || !valueKey) {
      throw new Error("Provide labelKey & valueKey or a mapOption");
    }
    return data.map((row) => ({ label: String(row[labelKey]), value: String(row[valueKey]) }));
  }, [data, mapOption, labelKey, valueKey]);

  return { options, data, isLoading, isError, error, refetch };
}
