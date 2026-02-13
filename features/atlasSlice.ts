import { RootState } from '@/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Constants from 'expo-constants';

export const fetchAtlas = createAsyncThunk<
  AtlasResponse,
  {
    fincaId: number;
    init?: number;
    limit?: number;
  },
  { state: RootState }
>(
  'atlas/fetch',
  async (
    {
      fincaId,
      init = 1,
      limit = 10,
    }: {
      fincaId: number;
      init?: number;
      limit?: number;
    },
    { getState }
  ) => {
    const authToken = getState().auth.auth?.accessToken;
    return fetch(
      `${Constants.expoConfig?.extra?.API_ENDPOINT}/systems/${fincaId}/Atlas/?Init=${init}&Limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${authToken?.token ?? ''}`,
        },
      }
    ).then((response) => {
      if (!response.ok) {
        return response.json().then((error: any) => {
          throw new Error(error.errors?.[0]?.message ?? error.Message ?? 'Unknown error');
        });
      }
      return response.json();
    });
  }
);

export const fetchAtlasDetails = createAsyncThunk<
  AtlasDetails,
  {
    fincaId: number;
    imei: string;
  },
  { state: RootState }
>(
  'atlas/fetchDetails',
  async ({ fincaId, imei }: { fincaId: number; imei: string }, { getState }) => {
    const authToken = getState().auth.auth?.accessToken;
    return fetch(`${Constants.expoConfig?.extra?.API_ENDPOINT}/systems/${fincaId}/Atlas/${imei}`, {
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

interface AtlasState {
  list: Record<string, AtlasList>;
  details: Record<string, AtlasDetailsList>;
}

const initialState: AtlasState = {
  list: {},
  details: {},
};

const atlasSlice = createSlice({
  name: 'atlas',
  initialState,
  reducers: {
    resetAtlas(state) {
      state.list = initialState.list;
      state.details = initialState.details;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAtlas.pending, (state, action) => {
      if (!state.list[action.meta.arg.fincaId]) {
        state.list[action.meta.arg.fincaId] = {
          list: [],
          loadingState: 'pending',
          error: null,
          page: 1,
          hasNextPage: false,
        };
      }
      state.list[action.meta.arg.fincaId].loadingState = 'loading';
    });
    builder.addCase(fetchAtlas.rejected, (state, action) => {
      state.list[action.meta.arg.fincaId].loadingState = 'error';
      state.list[action.meta.arg.fincaId].error =
        (action.error as Error).message ?? 'Unknown error';
    });
    builder.addCase(fetchAtlas.fulfilled, (state, action) => {
      state.list[action.meta.arg.fincaId].loadingState = 'success';
      if (action.meta.arg.init === 1) {
        state.list[action.meta.arg.fincaId].list = action.payload.items;
      } else {
        state.list[action.meta.arg.fincaId].list = [
          ...state.list[action.meta.arg.fincaId].list,
          ...action.payload.items,
        ];
      }
      state.list[action.meta.arg.fincaId].page = action.payload.pageNumber;
      state.list[action.meta.arg.fincaId].hasNextPage = action.payload.hasNextPage;
    });
    builder.addCase(fetchAtlasDetails.pending, (state, action) => {
      if (!state.details[action.meta.arg.imei]) {
        state.details[action.meta.arg.imei] = {
          details: null,
          loadingState: 'loading',
          error: null,
        };
      }
      state.details[action.meta.arg.imei].loadingState = 'loading';
    });
    builder.addCase(fetchAtlasDetails.rejected, (state, action) => {
      state.details[action.meta.arg.imei].loadingState = 'error';
      state.details[action.meta.arg.imei].details = null;
      state.details[action.meta.arg.imei].error = (action.error as Error).message;
    });
    builder.addCase(fetchAtlasDetails.fulfilled, (state, action) => {
      state.details[action.meta.arg.imei].loadingState = 'success';
      state.details[action.meta.arg.imei].details = action.payload;
      state.details[action.meta.arg.imei].error = null;
    });
  },
});

export const { resetAtlas } = atlasSlice.actions;

export const selectAtlas = (state: RootState): Record<string, AtlasList> => state.atlas.list;

export const selectAtlasById =
  (fincaId: number): ((state: RootState) => Atlas[]) =>
  (state: RootState) =>
    state.atlas.list[fincaId]?.list ?? [];

export const selectAtlasLoadingById =
  (fincaId: number): ((state: RootState) => LoadingState) =>
  (state: RootState) =>
    state.atlas.list[fincaId]?.loadingState ?? 'pending';

export const selectAtlasLoadingMoreById =
  (fincaId: number): ((state: RootState) => LoadingState) =>
  (state: RootState) =>
    state.atlas.list[fincaId]?.loadingState ?? 'pending';

export const selectAtlasHasNextPageById =
  (fincaId: number): ((state: RootState) => boolean) =>
  (state: RootState) =>
    state.atlas.list[fincaId]?.hasNextPage ?? false;

export const selectAtlasErrorById =
  (fincaId: number): ((state: RootState) => string | null) =>
  (state: RootState) =>
    state.atlas.list[fincaId]?.error ?? null;

export const selectAtlasDetailsById =
  (imei: string): ((state: RootState) => AtlasDetails | null) =>
  (state: RootState) =>
    state.atlas.details[imei]?.details ?? null;

export const selectAtlasDetailsLoadingById =
  (imei: string): ((state: RootState) => LoadingState) =>
  (state: RootState) =>
    state.atlas.details[imei]?.loadingState ?? 'pending';

export const selectAtlasDetailsErrorById =
  (imei: string): ((state: RootState) => string | null) =>
  (state: RootState) =>
    state.atlas.details[imei]?.error ?? null;

export default atlasSlice.reducer;
