import { RootState } from "@/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FincasState {
  fincas: Finca[];
  loading: boolean;
  error: string | null;
}

const initialState: FincasState = {
  fincas: [
    {
      id: 5114,
      measuringSystemTypeId: 2,
      timeZone: "+01:00",
      latitude: "40.4182536",
      longitude: "-3.6844103",
      name: "Finca de Manzanos",
      timeZoneStandard: "Europe/Madrid",
      description: "",
      image: "",
      country: "ES",
      favourite: true,
      currencyTypeId: 1,
      currencySymbol: "€",
      createdDate: "2025-04-14T08:05:45.8745918",
      type: 1,
      userId: 1226,
    },
  ],
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
      state.fincas = initialState.fincas;
      state.loading = initialState.loading;
      state.error = initialState.error;
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
