const API_ENDPOINT = "https://apicore.spherag.com/System";
const API_LOGIN_ENDPOINT = "https://api.spherag.com/Authentication";

export const login = (username: string, password: string): Promise<Auth> => {
  return fetch(`${API_LOGIN_ENDPOINT}/Login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
};

export const getFincas = (): Promise<Finca[]> => {
  return fetch(`${API_ENDPOINT}/List`)
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
  return fetch(`${API_ENDPOINT}/${idFinca}/Atlas/?Init=${init}&Limit=${limit}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
};

export const getAtlasDetails = (
  idFinca: number,
  imei: string,
): Promise<AtlasDetails> => {
  return fetch(`${API_ENDPOINT}/${idFinca}/Atlas/${imei}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
};
