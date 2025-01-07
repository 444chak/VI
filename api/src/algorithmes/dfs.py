"""DFS (Depth-First Search) algorithm."""

from classes.grid import Grid
from classes.hexa import Hexa


def dfs(grid: Grid) -> list[Hexa]:
    """Get Depth-First Search (DFS) path from start to end.

    Args:
        grid (Grid): grid object.

    Returns:
        list[Hexa]: Return the path from start to end.

    """
    start = grid.start
    end = grid.end

    # Pile pour le DFS
    stack = [start]
    # Dictionnaire pour conserver les prédécesseurs (pour reconstruire le chemin)
    came_from = {start: None}

    while stack:
        current = stack.pop()

        # Si on atteint l'hexagone d'arrivée
        if current == end:
            # Reconstruire le chemin à partir de `came_from`
            path = []
            while current is not None:
                path.append(current)
                current = came_from[current]
            path.reverse()
            return path

        # Explorer les voisins de l'hexagone courant
        for neighbor in grid.get_neighbors(current):
            if neighbor not in came_from:  # Si le voisin n'a pas encore été visité
                stack.append(neighbor)
                came_from[neighbor] = current

    # Aucun chemin trouvé
    return []
