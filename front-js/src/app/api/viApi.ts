import apiClient from "@/utils/apiClient";

export async function getAlgorithm(
  name: string,
  params: { grid: number[][]; start: number[]; end: number[] },
) {
  try {
    const response = await apiClient.post(`/${name}/`, params);
    const data = response.data as {
      result: number[][];
      paths: { [key: string]: string[][] };
    };
    return [data.result, data.paths];
  } catch {
    return [];
  }
}
