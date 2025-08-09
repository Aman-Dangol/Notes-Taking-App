import { tokenReducer } from "@/utils/redux/auth-slice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    accessToken: tokenReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
type AppStore = typeof store;

export type { AppDispatch, AppStore, RootState };
export { store };
