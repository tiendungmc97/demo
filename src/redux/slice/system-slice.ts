import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SystemState {
  loading: boolean;
  error: string | null;
}

const initialState: SystemState = {
  loading: false,
  error: null,
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setLoadingGlobal(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setErrorGlobal(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearErrorGlobal(state) {
      state.error = null;
    },
  },
});

export const { setLoadingGlobal, setErrorGlobal, clearErrorGlobal } =
  systemSlice.actions;
export default systemSlice.reducer
