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
    stack = [(start, [start])]
    visited = {start}
    exploration_steps = []  # Will store (point_coords, point_weight)
    cost = {start: 0}

    while stack:
        current, current_path = stack.pop()

        # Add current point and its weight to exploration steps
        point_coords = (current.x, current.y)
        point_weight = hexagon_grid.get_value(current)
        weight = point_weight
        if len(exploration_steps) > 0:
            weight += exploration_steps[-1][1]
        if (point_coords, weight) not in exploration_steps:
            exploration_steps.append((point_coords, weight))

        if current == end:
            return get_path(current_path), exploration_steps

        for neighbour_coords in explore_neighbours(current, hexagon_grid):
            neighbour = Hexagon(*neighbour_coords)
            new_cost = cost[current] + hexagon_grid.get_value(neighbour)
            if neighbour not in visited or new_cost < cost[neighbour]:
                cost[neighbour] = new_cost
                visited.add(neighbour)
                new_path = [*current_path, neighbour]
                stack.append((neighbour, new_path))

    return [], exploration_steps
