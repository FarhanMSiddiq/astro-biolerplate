import axios, { type AxiosInstance } from "axios";

interface ApiClientOptions {
  baseURL: string;
}

/**
 * Create an Axios instance with baseURL
 *
 * @param {{ baseURL: string }} param0
 * @param {string} param0.baseURL
 * @returns {AxiosInstance}
 */ /**
 *
 *
 * @param {*} error
 */
const ApiClient = (options: ApiClientOptions): AxiosInstance => {
  const instance = axios.create({
    baseURL: options.baseURL,
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      console.error(error);

      throw error;
    },
  );

  return instance;
};

const setClientToken = (instance: AxiosInstance, token: string) => {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const apiClient = ApiClient({
  baseURL: "/api/",
});

export { apiClient, setClientToken };
