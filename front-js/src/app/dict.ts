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
  2: "black",
  3: "blue",
  4: "green",
  5: "lightblue",
  6: "#afafaf",
  7: "#9b1111",
};

// Valeurs associées aux couleurs
export const COLOR_VALUES: ColorValueMapping = {
  "": 2,
  undefined: 2,
  lightgrey: 2,
  black: -1,
  blue: 5,
  green: 3,
  lightblue: 1,
  start: 0,
  end: 0,
};

// Mapping des valeurs vers les couleurs
export const VALUE_TO_COLOR: ValueColorMapping = {
  "2": "lightgrey",
  "-1": "black",
  "5": "blue",
  "3": "green",
  "1": "lightblue",
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
  ASTAR: "A*",
  DFS: "DFS",
  BFS: "BFS",
  RESET: "Réinitialiser",
};

// Chemins des algorithmes
export const ALGORITHM_PATHS = {
  DIJKSTRA: "dijkstra",
  ASTAR: "astar",
  DFS: "dfs",
  BFS: "bfs",
};

// Tooltips
export const TOOLTIPS = {
  DIJKSTRA: "Algorithme de Dijkstra",
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
