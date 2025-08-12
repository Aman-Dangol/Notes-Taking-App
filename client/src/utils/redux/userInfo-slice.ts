import type { RootState } from "@/utils/redux/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UserInfoSlice {
  value: {
    userInfo: {
      email: string;
      userName: string;
    };
    noteCount: number;
    categories: {
      name: string;
      id: number;
      userID: string;
    }[];
  };
}

const initialState: UserInfoSlice = {
  value: {
    userInfo: {
      email: "placeHolder@data.com",
      userName: "Place Holder",
    },
    categories: [],
    noteCount: 0,
  },
};

export const UserInfoSlice = createSlice({
  name: "accessUserInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfoSlice["value"]>) => {
      state.value = { ...action.payload };
    },
  },
});

export const userInfoReducer = UserInfoSlice.reducer;

export const { setUserInfo } = UserInfoSlice.actions;

export const selectUserInfo = (state: RootState) => state.userInfo;
