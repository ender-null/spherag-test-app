export const API_ENDPOINT = "https://apicore.spherag.com";
export const API_LOGIN_ENDPOINT = "https://api.spherag.com";

export const login = (username: string, password: string): Promise<Auth> => {
  return fetch(`${API_LOGIN_ENDPOINT}/Authentication/Login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
  .then((response) => {
    if (!response.ok) {
      return response.json().then((error: any) => {
        throw new Error(
          error.errors?.[0]?.message ?? error.Message ?? "Unknown error",
        );
      });
    }
    return response.json();
  })
};

export const getFincas = (accessToken: string): Promise<Finca[]> => {
  return fetch(`${API_ENDPOINT}/System/List`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  .then((response) => {
    if (!response.ok) {
      return response.json().then((error: any) => {
        throw new Error(
          error.errors?.[0]?.message ?? error.Message ?? "Unknown error",
        );
      });
    }
    return response.json();
  })
};

export const getAtlas = (
  accessToken: string,
  idFinca: number,
  init: number = 1,
  limit: number = 10,
): Promise<AtlasResponse> => {
  return fetch(
    `${API_ENDPOINT}/systems/${idFinca}/Atlas/?Init=${init}&Limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )
  .then((response) => {
    if (!response.ok) {
      return response.json().then((error: any) => {
        throw new Error(
          error.errors?.[0]?.message ?? error.Message ?? "Unknown error",
        );
      });
    }
    return response.json();
  })
};

export const getAtlasDetails = (
  accessToken: string,
  idFinca: number,
  imei: string,
): Promise<AtlasDetails> => {
  return fetch(`${API_ENDPOINT}/systems/${idFinca}/Atlas/${imei}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  .then((response) => {
    if (!response.ok) {
      return response.json().then((error: any) => {
        throw new Error(
          error.errors?.[0]?.message ?? error.Message ?? "Unknown error",
        );
      });
    }
    return response.json();
  })
};
