import axios from 'axios';

const axiosClient = axios.create(
    {
        baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    }
);

axiosClient.defaults.withCredentials = true;

// Interceptor to add the access token to the Authorization header
// adds access tokens in all api requests
// this interceptor is only added when the auth0 instance is ready and exports the getAccessTokenSilently method
//https://stackoverflow.com/questions/69011315/how-to-get-auth0-token-from-outside-react-components - reference
export const addAccessTokenInterceptor = (getAccessTokenSilently: any) => {
    axiosClient.interceptors.request.use(async (config: any) => {
      const token = await getAccessTokenSilently({
        audience: "https://truthmirror/api"
      });
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  };

export default axiosClient;
