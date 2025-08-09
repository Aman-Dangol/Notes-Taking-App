import { useAppSelector } from "@/utils/hooks/redux-hook/store-hooks";
import { Login } from "./Pages/login";
import { Outlet } from "react-router";
function App() {
  const appSelector = useAppSelector((state) => state.accessToken.value);

  let Element = <Login />;

  if (appSelector) {
    Element = <Outlet />;
  }

  return <>{Element}</>;
}

export default App;
