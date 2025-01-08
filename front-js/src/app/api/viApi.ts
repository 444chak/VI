import apiClient from "@/utils/apiClient";

export async function getAlgorithm(
  name: string,
  params: { grid: number[][]; start: number[]; end: number[] }
) {
  const response = await apiClient.post(`/${name}/`, params);
  const data = response.data as { result: number[][] };
  console.log(data.result);
  return data.result;
}
