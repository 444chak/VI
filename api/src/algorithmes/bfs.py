"""BFS algorithm."""

from collections import deque

from classes.grid import Grid
from classes.hexa import Hexa


def bfs(grid: Grid) -> list[tuple[int, int]]:
    """Breadth-first search (BFS) on a grid.

    Args:
        grid (Grid): grid object.

    Returns:
        list[tuple[int, int]]: Return the path from start to end.

    """
    start = grid.start
    end = grid.end

    # File pour le BFS
    queue = deque([start])
    # Dictionnaire pour conserver les prédécesseurs (pour reconstruire le chemin)
    came_from = {start: None}

    while queue:
        current = queue.popleft()

        # Si on atteint l'hexagone d'arrivée
        if current == end:
            # Reconstruire le chemin à partir de `came_from`
            path = []
            while current is not None:
                path.append((current.x, current.y))
                current = came_from[current]
            path.reverse()
            return path

        # Explorer les voisins de l'hexagone courant
        for neighbor in grid.get_neighbors(current):
            if neighbor not in came_from:  # Si le voisin n'a pas encore été visité
                queue.append(neighbor)
                came_from[neighbor] = current

    # Aucun chemin trouvé
    return []
