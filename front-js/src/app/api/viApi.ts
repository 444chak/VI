import apiClient from "@/utils/apiClient";

/**
 * Requête POST pour obtenir les résultats d'un algorithme
 * @param {string} name Nom de l'algorithme
 * @param {object} params Paramètres de l'algorithme (grille, départ, arrivée)
 * @returns Résultats de l'algorithme (chemin, chemins)
 */
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
