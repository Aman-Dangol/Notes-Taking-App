import api from "@/utils/axios";
import { useAppSelector } from "@/utils/hooks/redux-hook/store-hooks";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface Props<OutputData, InputData> {
  url: string;
  options?: Omit<
    UseMutationOptions<OutputData, AxiosError<{ message: string }>, InputData>,
    "mutationFn"
  >;
}

/**
 * Custom hook to perform PUT requests using Axios and React Query.
 * @param url - The endpoint URL for the PUT request.
 * @param options - Optional configuration for the mutation, such as onSuccess, onError, etc.
 * @returns A mutation object that can be used to trigger the PUT request.
 * @template OutputData - The expected data type of the response.
 * @template InputData - The data type of the input to be sent with the PUT request.
 */
export const usePut = <OutputData = unknown, InputData = unknown>({
  url,
  options,
}: Props<OutputData, InputData>) => {
  const accessToken = useAppSelector((state) => state.accessToken.value);
  const mutation = useMutation({
    mutationFn: async (data: InputData) => {
      const response = await api.put<OutputData>(`${url}`, data, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });

      return response.data;
    },

    ...options,
  });

  return mutation;
};
