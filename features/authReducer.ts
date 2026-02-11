import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AuthState {
  auth: Auth | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  auth: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<Auth>) {
      state.auth = action.payload;
      state.error = null;
    },
    setAuthLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setAuthError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    resetAuth(state) {
      state.auth = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setAuth, setAuthLoading, setAuthError, resetAuth } =
  authSlice.actions;

export const selectAuthToken = (state: RootState): AuthToken | null =>
  state.auth.auth?.accessToken ?? null;

export const selectRefreshToken = (state: RootState): AuthToken | null =>
  state.auth.auth?.refreshToken ?? null;

export const selectAuthLoading = (state: RootState): boolean =>
  state.auth.loading;

export const selectAuthError = (state: RootState): string | null =>
  state.auth.error;

export default authSlice.reducer;
