import { store } from "@/store";

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
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
};

export const getFincas = (): Promise<Finca[]> => {
  const authToken = store.getState().auth.auth?.accessToken;
  return fetch(`${API_ENDPOINT}/System/List`, {
    headers: {
      Authorization: `Bearer ${authToken?.token}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
};

export const getAtlas = (
  idFinca: number,
  init: number = 1,
  limit: number = 10,
): Promise<AtlasResponse> => {
  const authToken = store.getState().auth.auth?.accessToken;
  return fetch(
    `${API_ENDPOINT}/systems/${idFinca}/Atlas/?Init=${init}&Limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${authToken?.token}`,
      },
    },
  )
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
};

export const getAtlasDetails = (
  idFinca: number,
  imei: string,
): Promise<AtlasDetails> => {
  const authToken = store.getState().auth.auth?.accessToken;
  return fetch(`${API_ENDPOINT}/systems/${idFinca}/Atlas/${imei}`, {
    headers: {
      Authorization: `Bearer ${authToken?.token}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
};
