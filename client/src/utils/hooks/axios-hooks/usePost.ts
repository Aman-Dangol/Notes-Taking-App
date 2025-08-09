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

const usePost = <OutputData = unknown, InputData = unknown>({
  url,
  options,
}: Props<OutputData, InputData>) => {
  const accessToken = useAppSelector((state) => state.accessToken.value);
  const mutation = useMutation({
    mutationFn: async (data: InputData) => {
      const response = await api.post<OutputData>(`${url}`, data, {
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

export { usePost };
