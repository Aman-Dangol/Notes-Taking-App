import { useGet } from "@/utils/hooks/axios-hooks/useGet";
import {
  useAppDispatch,
  useAppSelector,
} from "@/utils/hooks/redux-hook/store-hooks";
import { setAccessToken } from "@/utils/redux/auth-slice";
import * as Popover from "@radix-ui/react-popover";
import { useQueryClient } from "@tanstack/react-query";
import { FaUserCircle } from "react-icons/fa";

export const UserProfile = () => {
  const qc = useQueryClient();
  const dispatch = useAppDispatch();

  const userInfo = useAppSelector((s) => s.userInfo.value);

  const { refetch } = useGet({
    queryKey: ["logout"],
    url: "/logout",
    options: {
      enabled: false,
    },
  });

  const logoutHandler = () => {
    refetch();
    dispatch(setAccessToken(""));
    qc.removeQueries();
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className="inline-flex cursor-pointer size-[35px] items-center justify-center rounded-full bg-white text-violet11 shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-red-900"
          aria-label="Update dimensions"
        >
          <FaUserCircle color="82181a" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="w-[260px] rounded bg-white p-5 mx-2 "
          // sideOffset={5
        >
          <div>{userInfo.userInfo.userName}</div>
          <div>{userInfo.userInfo.email}</div>
          <hr className="mt-8 mb-2" />
          <div onClick={logoutHandler} className="cursor-pointer">
            Logout
          </div>

          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
