"""Depth-first search on a hexagonal grid."""

from classes.hexagon_grid import Hexagon, HexagonGrid, get_path


def explore_neighbours(
    hexagon: Hexagon,
    hexagon_grid: HexagonGrid,
) -> list[tuple[int, int]]:
    """Explore the neighbors of a hexagon within the grid."""
    neighbors = hexagon.neighbors()
    return [
        (neighbor.x, neighbor.y)
        for neighbor in neighbors
        if hexagon_grid.in_bounds(neighbor) and hexagon_grid.get_value(neighbor) != -1
    ]


def dfs(
    hexagon_grid: HexagonGrid,
) -> tuple[list[tuple[int, int]], list[tuple[tuple[int, int], int]]]:
    """Depth-first search on a hexagonal grid with exploration tracking.

    Returns:
        tuple[list[tuple[int, int]], list[tuple[tuple[int, int], int]]]:
            - First path found
            - List of (point_coordinates, point_weight) for each visited point

    """
    start = hexagon_grid.start
    end = hexagon_grid.end
    
    stack = [(start, [start])]     # Pile DFS avec (noeud, chemin)
    visited = {start}              # Noeuds visités
    exploration_steps = []         # Suivi de l'exploration
    cost = {start: 0}             # Coûts des chemins

    while stack:
        # Récupère le dernier noeud ajouté (LIFO)
        current, current_path = stack.pop()

        # Si on atteint l'objectif, on retourne le chemin
        if current == end:
            return get_path(current_path), exploration_steps

        for neighbour_coords in explore_neighbours(current, hexagon_grid):
            neighbour = Hexagon(*neighbour_coords)
            new_cost = cost[current] + hexagon_grid.get_value(neighbour)

            # Si nouveau noeud ou meilleur chemin trouvé
            if neighbour not in visited or new_cost < cost[neighbour]:
                cost[neighbour] = new_cost
                visited.add(neighbour)
                new_path = [*current_path, neighbour]
                stack.append((neighbour, new_path))

                # Enregistre l'étape d'exploration
                exploration_steps.append(
                    ((current.x, current.y), (neighbour.x, neighbour.y)),
                )

    # Aucun chemin trouvé
    return [], exploration_steps
