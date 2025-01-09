// Types et interfaces
interface ValueColorMapping {
  [key: string | number]: string | number;
}

interface ColorValueMapping {
  [key: string]: number;
}

interface ColorMapping {
  [key: number]: string;
}

// Constantes des couleurs
export const COLORS: ColorMapping = {
  1: "",
  2: "black", // Mur
  3: "blue", // Eau
  4: "green", // Herbe
  5: "lightblue", // Glace
  6: "#afafaf", // Départ
  7: "#9b1111", // Arrivée
};

// Valeurs associées aux couleurs
export const COLOR_VALUES: ColorValueMapping = {
  "": 2, // Défaut
  undefined: 2, // Défaut
  lightgrey: 2, // Défaut
  black: -1, // Mur
  blue: 5, // Eau
  green: 3, // Herbe
  lightblue: 1, // Glace
  start: 0, // Départ
  end: 0, // Arrivée
};

// Mapping des valeurs vers les couleurs
export const VALUE_TO_COLOR: ValueColorMapping = {
  "2": "lightgrey", // Défaut
  "-1": "black", // Mur
  "5": "blue", // Eau
  "3": "green", // Herbe
  "1": "lightblue", // Glace
};

// Messages d'erreur
export const ERROR_MESSAGES = {
  ALGO_IN_PROGRESS: "Veuillez attendre la fin de l'algorithme en cours",
  RESET_ALGO: "Veuillez d'abord réinitialiser l'algorithme en cours",
  GENERIC_ERROR: "Une erreur est survenue",
  NO_PATH: "Aucun chemin trouvé",
  INVALID_START: "Position de départ invalide",
  INVALID_END: "Position d'arrivée invalide",
};

// Labels des algorithmes
export const ALGORITHM_LABELS = {
  DIJKSTRA: "Dijkstra",
  BELLMAN_FORD: "Bellman-Ford",
  ASTAR: "A*",
  DFS: "DFS",
  BFS: "BFS",
  RESET: "Réinitialiser",
};

// Chemins des algorithmes
export const ALGORITHM_PATHS = {
  DIJKSTRA: "dijkstra",
  BELLMAN_FORD: "bellman_ford",
  ASTAR: "astar",
  DFS: "dfs",
  BFS: "bfs",
};

// Tooltips
export const TOOLTIPS = {
  DIJKSTRA: "Algorithme de Dijkstra",
  BELLMAN_FORD : "Algorithme de Bellman-Ford",
  ASTAR: "Heuristique de Manhattan",
  DFS: "Parcours en profondeur",
  BFS: "Parcours en largeur",
  RESET_ALGO: "Réinitialiser l'algorithme en cours",
  NO_ALGORITHM_CHANGE_SIZE:
    "Impossible de changer la taille de la grille pendant un algorithme",
};

// Alerts
export const ALERTS = {
  HEXA_DEFAULT_VALUE: "Les hexagones ont un poids par défaut de 2",
  CHANGE_SIZE_ALERT: "Changer la taille réinitialise la grille.",
};
