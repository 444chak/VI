"""Dijkstra algorithm implementation for hexagonal grid."""

from heapq import heappop, heappush

from classes.hexagon_grid import HexagonGrid, get_path


def dijkstra(
    hexagon_grid: HexagonGrid,
) -> tuple[list[tuple[int, int]], list[tuple[tuple[int, int], int]]]:
    """Dijkstra algorithm for hexagonal grid with exploration tracking.

    Returns:
        tuple[list[tuple[int, int]], list[tuple[tuple[int, int], int]]]:
            - Shortest path
            - List of (point_coordinates, point_weight) for each visited point

    """
    start = hexagon_grid.start
    end = hexagon_grid.end

    queue = [(0, start, [start])]  # (coût, noeud, chemin)
    visited = {start}              # Noeuds explorés
    came_from = {start: None}      # Parents pour reconstruction
    cost_so_far = {start: 0}       # Coûts minimaux
    exploration_steps = []         # Suivi de l'exploration

    while queue:
        # Récupère le noeud avec le plus petit coût
        current_cost, current, current_path = heappop(queue)

        # Si on atteint l'objectif, reconstruction du chemin
        if current == end:
            path = []
            step = current
            while step:
                path.append(step)
                step = came_from[step]
            return get_path(path[::-1]), exploration_steps

        for next_pos in current.neighbors():
            # Vérifie si le voisin est valide et non visité
            if (
                hexagon_grid.in_bounds(next_pos)
                and next_pos not in visited
                and hexagon_grid.get_value(next_pos) != -1
            ):
                # Calcule le nouveau coût pour atteindre ce voisin
                new_cost = current_cost + hexagon_grid.get_value(next_pos)
                
                # Met à jour si on trouve un meilleur chemin
                if next_pos not in cost_so_far or new_cost < cost_so_far[next_pos]:
                    cost_so_far[next_pos] = new_cost
                    new_path = [*current_path, next_pos]
                    heappush(queue, (new_cost, next_pos, new_path))
                    came_from[next_pos] = current
                    visited.add(next_pos)

                    # Enregistre l'étape d'exploration
                    exploration_steps.append(
                        ((current.x, current.y), (next_pos.x, next_pos.y)),
                    )

    # Aucun chemin trouvé
    return [], exploration_steps
