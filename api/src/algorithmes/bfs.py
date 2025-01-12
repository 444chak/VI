"""Pathfinding algorithm on a hexagonal grid."""

from collections import deque

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


def bfs(
    hexagon_grid: HexagonGrid,
) -> tuple[list[tuple[int, int]], list[tuple[tuple[int, int], int]]]:
    """Breadth-first search on a hexagonal grid with exploration tracking.

    Returns:
        tuple[list[tuple[int, int]], list[tuple[tuple[int, int], int]]]:
            - First path found
            - List of (point_coordinates, point_weight) for each visited point

    """
    start = hexagon_grid.start
    end = hexagon_grid.end
    
    # File pour BFS avec le noeud de départ et son chemin initial
    queue = deque([(start, [start])])

    visited = {start}           # Noeuds visités
    parent = {start: None}      # Parents de chaque noeud
    exploration_steps = []      # Étapes d'exploration (parent -> enfant)
    cost = {start: 0}           # Coût pour atteindre chaque noeud

    while queue:
        # Récupère le prochain noeud à explorer
        current, current_path = queue.popleft()

        # Si on atteint l'objectif, on sort de la boucle
        if current == end:
            break

        for neighbour_coords in explore_neighbours(current, hexagon_grid):
            neighbour = Hexagon(*neighbour_coords)
            new_cost = cost[current] + hexagon_grid.get_value(neighbour)

            # Si le voisin n'est pas visité ou si on trouve un meilleur chemin
            if neighbour not in visited or new_cost < cost[neighbour]:
                visited.add(neighbour)
                parent[neighbour] = current
                cost[neighbour] = new_cost
                new_path = [*current_path, neighbour]
                queue.append((neighbour, new_path))

                # Enregistre l'étape d'exploration
                parent_coords = (current.x, current.y)
                child_coords = (neighbour.x, neighbour.y)
                exploration_steps.append((parent_coords, child_coords))

    # Reconstruction du chemin final en remontant les parents
    path = []
    step = end
    while step is not None:
        path.append(step)
        step = parent.get(step)
    path.reverse()

    # Si pas de chemin trouvé, retourne liste vide
    if path == [end]:
        return [], exploration_steps

    return get_path(path), exploration_steps
