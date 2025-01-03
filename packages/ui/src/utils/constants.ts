import { BACKEND_URL, ON_SERVER, DOCKER_ENV } from "@repo/environment";

const getUrqlBackendUrl = (): string => {
  if (ON_SERVER) {
    if (DOCKER_ENV) {
      return "http://app:4000/api";
    }
    return BACKEND_URL;
  }

  return BACKEND_URL;
};

// Use absolute path when running on the server
export const URQL_BACKEND_URL = getUrqlBackendUrl();
