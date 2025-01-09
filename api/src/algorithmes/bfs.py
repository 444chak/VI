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
    queue = deque([(start, [start])])
    visited = {start}
    parent = {start: None}
    exploration_steps = []  # Will store (point_coords, point_weight)

    while queue:
        current, current_path = queue.popleft()

        # Add current point and its weight to exploration steps
        point_coords = (current.x, current.y)
        point_weight = hexagon_grid.get_value(current)
        if (point_coords, point_weight) not in exploration_steps:
            exploration_steps.append((point_coords, point_weight))

        if current == end:
            break

        for neighbour_coords in explore_neighbours(current, hexagon_grid):
            neighbour = Hexagon(*neighbour_coords)
            if neighbour not in visited:
                visited.add(neighbour)
                parent[neighbour] = current
                new_path = [*current_path, neighbour]
                queue.append((neighbour, new_path))

    # Reconstruct final path
    path = []
    step = end
    while step is not None:
        path.append(step)
        step = parent.get(step)
    path.reverse()

    if path == [end]:
        return [], exploration_steps

    return get_path(path), exploration_steps
