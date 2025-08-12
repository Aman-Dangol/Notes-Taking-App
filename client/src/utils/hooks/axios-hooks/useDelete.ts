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

/** * Custom hook to perform DELETE requests using Axios and React Query.
 * * @param url - The endpoint URL for the DELETE request.
 * @param options - Optional configuration for the mutation, such as onSuccess, onError, etc.
 * * @returns A mutation object that can be used to trigger the DELETE request.
 * * @template OutputData - The expected data type of the response.
 * * @template InputData - The data type of the input to be sent with the DELETE request.
 */
export const useDelete = <OutputData = unknown, InputData = unknown>({
  url,
  options,
}: Props<OutputData, InputData>) => {
  const accessToken = useAppSelector((state) => state.accessToken.value);
  const mutation = useMutation({
    mutationFn: async (data: InputData) => {
      const response = await api.delete<OutputData>(`${url}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
        data,
      });

      return response.data;
    },
    ...options,
  });

  return mutation;
};
