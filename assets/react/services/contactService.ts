import axios, { AxiosResponse } from "axios";
import { Contact } from "../types/contact";

const apiClient = axios.create({
  baseURL: "/api/contacts",
  withCredentials: true,
  timeout: 10000,
});

interface ApiResponse<T> {
  data: T;
}

export const fetchContacts = async (): Promise<ApiResponse<[Contact]>> => {
  try {
    const response: AxiosResponse<[Contact]> = await apiClient.get("/");
    return { data: response.data };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const updateContact = async (
  contact: Contact
): Promise<ApiResponse<Contact>> => {
  const response: AxiosResponse<Contact> = await apiClient.put(
    `/${contact.id}`,
    contact
  );
  return { data: response.data };
};

export const createContact = async (
  contact: Contact
): Promise<ApiResponse<Contact>> => {
  const response: AxiosResponse<Contact> = await apiClient.post("", contact);
  return { data: response.data };
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
