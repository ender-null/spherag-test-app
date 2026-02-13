import { RootState } from '@/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Constants from 'expo-constants';

export const fetchFincas = createAsyncThunk<Finca[], void, { state: RootState }>(
  'fincas/fetch',
  async (_, { getState }) => {
    const authToken = getState().auth.auth?.accessToken;
    return fetch(`${Constants.expoConfig?.extra?.API_ENDPOINT}/System/List`, {
      headers: {
        Authorization: `Bearer ${authToken?.token ?? ''}`,
      },
    }).then((response) => {
      if (!response.ok) {
        return response.json().then((error: any) => {
          throw new Error(error.errors?.[0]?.message ?? error.Message ?? 'Unknown error');
        });
      }
      return response.json();
    });
  }
);

interface FincasState {
  fincas: Finca[];
  loadingState: LoadingState;
  error: string | null;
}

const initialState: FincasState = {
  fincas: [],
  loadingState: 'pending',
  error: null,
};

const fincasSlice = createSlice({
  name: 'fincas',
  initialState,
  reducers: {
    resetFincas(state) {
      state.fincas = initialState.fincas;
      state.loadingState = initialState.loadingState;
      state.error = initialState.error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFincas.pending, (state) => {
      state.loadingState = 'loading';
    });
    builder.addCase(fetchFincas.rejected, (state, action) => {
      state.loadingState = 'error';
      state.error = (action.error as Error).message ?? 'Unknown error';
    });
    builder.addCase(fetchFincas.fulfilled, (state, action) => {
      state.fincas = action.payload;
      state.loadingState = 'success';
    });
  },
});

export const { resetFincas } = fincasSlice.actions;

export const selectFincas = (state: RootState): Finca[] => state.fincas.fincas;

export const selectFincaById =
  (fincaId: number): ((state: RootState) => Finca | null) =>
  (state: RootState) =>
    state.fincas.fincas.find((finca) => finca.id === fincaId) ?? null;

export const selectFincasLoading = (state: RootState): LoadingState => state.fincas.loadingState;

export const selectFincasError = (state: RootState): string | null => state.fincas.error;

export default fincasSlice.reducer;
