import { ConfigContext } from "expo/config";

module.exports = ({ config }: ConfigContext) => {
  config.extra = {
    ...config.extra,
    API_ENDPOINT: process.env.API_ENDPOINT,
  };
  return config;
};
