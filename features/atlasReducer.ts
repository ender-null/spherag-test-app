import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AtlasState {
  atlas: Record<string, Atlas[]>;
  loading: boolean;
  error: string | null;
}

const initialState: AtlasState = {
  atlas: {
    "5114": [
      {
        id: 70993,
        imei: "860813074958872",
        name: "Atlas X",
        isAtlasTwo: false,
        status: 7,
        batteryPercentage: 37.7,
        signalPercentage: 100,
        expiredDate: "2031-02-05T14:29:50.2246255Z",
        mainProductType: 4,
      },
      {
        id: 7094,
        imei: "865648065109613",
        name: "Atlas Plus",
        isAtlasTwo: false,
        status: 7,
        batteryPercentage: 97.21,
        signalPercentage: 100,
        expiredDate: "2031-02-05T14:29:50.2246268Z",
        mainProductType: 3,
      },
    ],
  },
  loading: false,
  error: null,
};

const atlasSlice = createSlice({
  name: "atlas",
  initialState,
  reducers: {
    setAtlas(state, action: PayloadAction<Atlas[]>) {
      state.atlas[action.payload[0].id] = action.payload;
      state.error = null;
    },
    setAtlasLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setAtlasError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    resetAtlas(state) {
      state.atlas = initialState.atlas;
      state.loading = initialState.loading;
      state.error = initialState.error;
    },
  },
});

export const { setAtlas, setAtlasLoading, setAtlasError, resetAtlas } =
  atlasSlice.actions;

export const selectAtlas = (state: RootState): Record<string, Atlas[]> =>
  state.atlas.atlas;

export const selectAtlasById =
  (fincaId: string): ((state: RootState) => Atlas[]) =>
  (state: RootState) =>
    state.atlas.atlas[fincaId] ?? [];

export const selectAtlasLoading = (state: RootState): boolean =>
  state.atlas.loading;

export const selectAtlasError = (state: RootState): string | null =>
  state.atlas.error;

export default atlasSlice.reducer;
