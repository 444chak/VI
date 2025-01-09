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
) -> tuple[list[tuple[int, int]], list[tuple[list[tuple[int, int]], int]]]:
    """Depth-first search on a hexagonal grid with exploration tracking.

    Returns:
        tuple[list[tuple[int, int]], list[tuple[list[tuple[int, int]], int]]]:
            - First path found
            - List of (path, cost) for each exploration step
    """
    start = hexagon_grid.start
    end = hexagon_grid.end
    stack = [(start, [start])]
    visited = {start}
    cost = {start: 0}
    exploration_steps = []

    while stack:
        current, current_path = stack.pop()
        current_cost = cost[current]

        exploration_steps.append(
            (
                get_path([Hexagon(pos.x, pos.y, pos.value) for pos in current_path]),
                current_cost,
            ),
        )

        if current == end:
            return get_path(current_path), exploration_steps

        for neighbour_coords in explore_neighbours(current, hexagon_grid):
            neighbour = Hexagon(*neighbour_coords)
            if neighbour not in visited:
                visited.add(neighbour)
                cost[neighbour] = current_cost + hexagon_grid.get_value(neighbour)
                new_path = [*current_path, neighbour]
                stack.append((neighbour, new_path))

    return [], exploration_steps
