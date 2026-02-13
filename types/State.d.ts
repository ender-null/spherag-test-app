type LoadingState = 'pending' | 'loading' | 'success' | 'error';

interface AtlasList {
  list: Atlas[];
  loadingState: LoadingState;
  error: string | null;
  page: number;
  hasNextPage: boolean;
}

interface AtlasDetailsList {
  details: AtlasDetails | null;
  loadingState: LoadingState;
  error: string | null;
}
