type LoadingState = 'pending' | 'loading' | 'success' | 'error';

interface AtlasList {
  list: Atlas[];
  loadingState: LoadingState;
  loadingMoreState: LoadingState;
  error: string | null;
  page: number;
  hasNextPage: boolean;
}

interface AtlasDetailsList {
  details: AtlasDetails | null;
  loadingState: LoadingState;
  loadingMoreState: LoadingState;
  error: string | null;
}
