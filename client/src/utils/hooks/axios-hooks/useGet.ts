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

/**
 * Custom hook to perform GET requests using Axios and React Query.
 * @param queryKey - The unique key for the query, used for caching and refetching.
 * @param url - The endpoint URL for the GET request.
 * @param params - Optional parameters to be sent with the request.
 * @param options - Optional configuration for the query, such as onSuccess, onError, etc.
 * @returns A query object that contains the data, error, and status of the request.
 * @template TQueryOutput - The expected data type of the response.
 * @template TQueryInput - The data type of the input parameters for the request.
 */
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
