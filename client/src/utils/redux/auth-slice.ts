import type { RootState } from "@/utils/redux/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface TokenSlice {
  value: string;
}

const initialState: TokenSlice = {
  value: "",
};

export const tokenSlice = createSlice({
  name: "accessToken",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const tokenReducer = tokenSlice.reducer;

export const { setAccessToken } = tokenSlice.actions;

export const selectToken = (state: RootState) => state.accessToken.value;
