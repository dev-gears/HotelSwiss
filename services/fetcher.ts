import axios from "axios";

export const fetcher = async <T>(
  url: string,
  params: Record<string, any> = {},
): Promise<T> => {
  const response = await axios.get<T>(url, { params });
  return response.data;
};
