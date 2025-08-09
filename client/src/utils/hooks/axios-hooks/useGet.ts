import api from "@/utils/axios";
import { useAppSelector } from "@/utils/hooks/redux-hook/store-hooks";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface props<TQueryOutput, TQueryInput> {
  queryKey: unknown[];
  url: string;
  params?: TQueryInput;
  options?: Omit<
    UseQueryOptions<TQueryOutput, AxiosError>,
    "queryKey" | "queryFn"
  >;
}
const useGet = <TQueryOutput = unknown, TQueryInput = unknown>({
  queryKey,
  url,
  params,
  options,
}: props<TQueryOutput, TQueryInput>) => {
  const accessToken = useAppSelector((state) => state.accessToken.value);

  const query = useQuery<TQueryOutput, AxiosError>({
    queryKey,
    queryFn: async () => {
      const response = await api.get(`${url}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
        params,
      });
      return response.data;
    },
    ...options,
  });

  return query;
};

export { useGet };
