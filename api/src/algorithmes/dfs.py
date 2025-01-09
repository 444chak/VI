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


def dfs(hexagon_grid: HexagonGrid) -> list[tuple[int, int]]:
    """Depth-first search on a hexagonal grid with shortest path tracking."""
    start = hexagon_grid.start
    end = hexagon_grid.end
    stack = [(start, [start])]  # Track path with each node
    visited = {start}
    best_path = None
    best_cost = float("inf")
    cost = {start: 0}

    while stack:
        current, current_path = stack.pop()
        current_cost = cost[current]

        if current == end:
            if current_cost < best_cost:
                best_cost = current_cost
                best_path = current_path
            continue

        for neighbour_coords in explore_neighbours(current, hexagon_grid):
            neighbour = Hexagon(*neighbour_coords)
            new_cost = cost[current] + hexagon_grid.get_value(neighbour)

            if (
                neighbour not in visited or new_cost < cost.get(neighbour, float("inf"))
            ) and new_cost < best_cost:
                visited.add(neighbour)
                cost[neighbour] = new_cost
                new_path = [*current_path, neighbour]
                stack.append((neighbour, new_path))

    return get_path(best_path) if best_path else []
