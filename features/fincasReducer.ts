import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface FincasState {
  fincas: Finca[];
  loading: boolean;
  error: string | null;
}

const initialState: FincasState = {
  fincas: [],
  loading: false,
  error: null,
};

const fincasSlice = createSlice({
  name: "fincas",
  initialState,
  reducers: {
    setFincas(state, action: PayloadAction<Finca[]>) {
      state.fincas = action.payload;
      state.error = null;
    },
    setFincasLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setFincasError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    resetFincas(state) {
      state.fincas = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setFincas, setFincasLoading, setFincasError, resetFincas } =
  fincasSlice.actions;

export const selectFincas = (state: RootState): Finca[] => state.fincas.fincas;

export const selectFincasLoading = (state: RootState): boolean =>
  state.fincas.loading;

export const selectFincasError = (state: RootState): string | null =>
  state.fincas.error;

export default fincasSlice.reducer;
