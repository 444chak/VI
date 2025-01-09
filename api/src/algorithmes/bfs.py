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
    exploration_steps = []  # Will store (parent_coords, child_coords)
    cost = {start: 0}

    while queue:
        current, current_path = queue.popleft()

        if current == end:
            break

        for neighbour_coords in explore_neighbours(current, hexagon_grid):
            neighbour = Hexagon(*neighbour_coords)
            new_cost = cost[current] + hexagon_grid.get_value(neighbour)
            if neighbour not in visited or new_cost < cost[neighbour]:
                visited.add(neighbour)
                parent[neighbour] = current
                cost[neighbour] = new_cost
                new_path = [*current_path, neighbour]
                queue.append((neighbour, new_path))

                # Add parent and child coordinates to exploration steps
                parent_coords = (current.x, current.y)
                child_coords = (neighbour.x, neighbour.y)
                exploration_steps.append((parent_coords, child_coords))

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
