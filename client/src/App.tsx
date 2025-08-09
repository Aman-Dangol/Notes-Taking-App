import {
  useAppDisptach,
  useAppSelector,
} from "@/utils/hooks/redux-hook/store-hooks";
import { Login } from "./Pages/login";
import { Outlet, useLocation } from "react-router";
import { useGet } from "@/utils/hooks/axios-hooks/useGet";
import { useEffect } from "react";
import { setInterceptor } from "@/utils/axios";
import { ToastContainer } from "react-toastify";
function App() {
  const token = useAppSelector((state) => state.accessToken.value);
  const appDispatcher = useAppDisptach();

  const { pathname } = useLocation();

  let Element = <Login />;

  useEffect(() => {
    setInterceptor(appDispatcher);
  }, [appDispatcher]);

  const { isLoading, refetch } = useGet<{
    message: "string";
    accessToken: string;
  }>({
    queryKey: ["validateToken", pathname],
    url: "/verify-token",
    options: {
      refetchOnWindowFocus: false,
      enabled: false,
      retry: false,
    },
  });

  useEffect(() => {
    refetch();
  }, [pathname, refetch]);

  if (isLoading) {
    Element = <div>loading</div>;
  }

  if (token) {
    Element = (
      <section>
        <Outlet />
      </section>
    );
  }

  return (
    <div>
      {Element}
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
