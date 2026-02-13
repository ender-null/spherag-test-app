import { RootState } from "@/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const API_LOGIN_ENDPOINT = "https://api.spherag.com/Authentication";

export const fetchAuth = createAsyncThunk<
  Auth,
  { username: string; password: string }
>("auth/fetch", ({ username, password }) => {
  return fetch(`${API_LOGIN_ENDPOINT}/Login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  }).then((response) => {
    if (!response.ok) {
      return response.json().then((error: any) => {
        throw new Error(
          error.errors?.[0]?.message ?? error.Message ?? "Unknown error",
        );
      });
    }
    return response.json();
  });
});

interface AuthState {
  auth: Auth | null;
  loadingState: LoadingState;
  error: string | null;
}

const initialState: AuthState = {
  auth: null,
  loadingState: "pending",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth(state) {
      state.auth = initialState.auth;
      state.loadingState = initialState.loadingState;
      state.error = initialState.error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state) => {
      state.loadingState = "loading";
    });
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.loadingState = "success";
      state.auth = action.payload;
      state.error = null;
    });
    builder.addCase(fetchAuth.rejected, (state, action) => {
      state.loadingState = "error";
      state.auth = null;
      state.error = action.error.message ?? null;
    });
  },
});

export const { resetAuth } = authSlice.actions;

export const selectAuthToken = (state: RootState): AuthToken | null =>
  state.auth.auth?.accessToken ?? null;

export const selectRefreshToken = (state: RootState): AuthToken | null =>
  state.auth.auth?.refreshToken ?? null;

export const selectAuthLoadingState = (state: RootState): LoadingState =>
  state.auth.loadingState;

export const selectAuthError = (state: RootState): string | null =>
  state.auth.error;

export default authSlice.reducer;
