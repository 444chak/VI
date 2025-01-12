"""A* algorithm implementation for hexagonal grid."""

from heapq import heappop, heappush

from classes.hexagon import Hexagon
from classes.hexagon_grid import HexagonGrid, get_path


def manhattan_distance(pos: Hexagon, end: Hexagon) -> int:
    """Calculate Manhattan distance between two points.

    Args:
        pos (Hexagon): current position
        end (Hexagon): end position

    Returns:
        int: Manhattan distance

    """
    return abs(pos.x - end.x) + abs(pos.y - end.y)


def a_star(
    hexagon_grid: HexagonGrid,
) -> tuple[list[tuple[int, int]], list[tuple[tuple[int, int], int]]]:
    """Return result of A* algorithm with exploration steps.

    Returns:
        tuple[list[tuple[int, int]], list[tuple[tuple[int, int], int]]]:
            - Shortest path found
            - List of (point_coordinates, point_weight) for each visited point

    """
    start = hexagon_grid.start
    end = hexagon_grid.end

    # File de priorité pour stocker les noeuds à explorer
    # Format: (f_score, hexagone_courant, chemin_actuel)
    queue = [(0, start, [start])]
    
    # Ensemble des noeuds déjà visités
    visited = {start}
    
    # Dictionnaire stockant le coût pour atteindre chaque noeud
    g_score = {start: 0}
    
    # Dictionnaire stockant le score total estimé (g_score + heuristique)
    f_score = {start: manhattan_distance(start, end)}
    
    # Liste pour garder trace de l'ordre d'exploration
    exploration_steps = []

    while queue:
        # Récupère le noeud avec le plus petit f_score
        _, current, current_path = heappop(queue)

        # Si on atteint l'objectif, on retourne le chemin
        if current == end:
            return get_path(
                [Hexagon(pos.x, pos.y, pos.value) for pos in current_path],
            ), exploration_steps

        for neighbor in current.neighbors():
            # Vérifie si le voisin est valide et non visité
            if (
                neighbor not in visited
                and hexagon_grid.in_bounds(neighbor)
                and hexagon_grid.get_value(neighbor) != -1
            ):
                # Calcule le nouveau score g pour ce voisin
                tentative_g = g_score[current] + hexagon_grid.get_value(neighbor)

                # Met à jour les scores si on trouve un meilleur chemin
                if neighbor not in g_score or tentative_g < g_score[neighbor]:
                    g_score[neighbor] = tentative_g
                    f_score[neighbor] = tentative_g + manhattan_distance(neighbor, end)
                    new_path = [*current_path, neighbor]
                    heappush(queue, (f_score[neighbor], neighbor, new_path))
                    visited.add(neighbor)
                    exploration_steps.append(
                        ((current.x, current.y), (neighbor.x, neighbor.y)),
                    )

    # Aucun chemin trouvé
    return [], exploration_steps
