import apiClient from "@/utils/apiClient";

export async function getAlgorithm(
  name: string,
  params: { grid: number[][]; start: number[]; end: number[] }
) {
  return apiClient.post(`/api/algorithms/${name}`, params);
}
