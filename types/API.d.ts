interface ErrorResponse {
  errors: ErrorDetail[];
  instance: string;
  status: number;
  title: string;
  traceId: string;
  type: string;
}

interface ErrorDetail {
  code: string;
  message: string;
  name: string;
}
