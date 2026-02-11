import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AtlasState {
  atlas: Record<number, Atlas>;
  loading: boolean;
  error: string | null;
}

const initialState: AtlasState = {
  atlas: {} as Record<number, Atlas>,
  loading: false,
  error: null,
};

const atlasSlice = createSlice({
  name: "atlas",
  initialState,
  reducers: {
    setAtlas(state, action: PayloadAction<Atlas>) {
      state.atlas[action.payload.id] = action.payload;
      state.error = null;
    },
    setAtlasLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setAtlasError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    resetAtlas(state) {
      state.atlas = {} as Record<number, Atlas>;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setAtlas, setAtlasLoading, setAtlasError, resetAtlas } =
  atlasSlice.actions;

export const selectAtlasById = (
  state: RootState,
  id: number,
): Atlas | undefined => state.atlas.atlas[id] ?? undefined;

export const selectAtlasLoading = (state: RootState): boolean =>
  state.atlas.loading;

export const selectAtlasError = (state: RootState): string | null =>
  state.atlas.error;

export default atlasSlice.reducer;
