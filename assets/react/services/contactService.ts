import axios, { AxiosResponse } from "axios";

const apiClient = axios.create({
  baseURL: "/api/contacts",
  withCredentials: true,
  timeout: 10000,
});

interface ApiResponse<T> {
  data: T;
}

export const fetchContacts = async <T>(): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await apiClient.get("/");
    return { data: response.data };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const postData = async <T, D>(
  endpoint: string,
  data: D
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await apiClient.post(endpoint, data);
    return { data: response.data };
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
