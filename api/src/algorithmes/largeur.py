from collections import deque
from classes import Grid, Hexa

def bfs(grid: Grid) -> list[Hexa]:
    """
    Parcours en largeur (BFS) sur une grille.

    Args:
        grid (Grid): Objet de la classe Grid.

    Returns:
        list[Hexa]: Le chemin du départ (start) à l'arrivée (end) sous forme d'une liste d'hexagones.
                    Retourne une liste vide si aucun chemin n'est trouvé.
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
                path.append(current)
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
