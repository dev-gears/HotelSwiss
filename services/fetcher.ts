import axios from "axios";

export const fetcher = async <T>(url: string): Promise<T> => {
  try {
    const response = await axios.get(url, {
      baseURL: "http://192.168.0.26:3000/api",
      headers: {
        Authorization: "Basic " + btoa("root:12345678"),
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
