import { configureStore } from "@reduxjs/toolkit";

import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import userSlice from "./slice/user-slice"; 
import systemSlice from "./slice/system-slice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    system: systemSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
