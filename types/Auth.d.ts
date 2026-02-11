interface Auth {
  accessToken: AuthToken;
  refreshToken: AuthToken;
}

interface AuthToken {
  token: string;
  expiration: string;
}
