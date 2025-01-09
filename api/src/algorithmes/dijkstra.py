"""Dijkstra algorithm implementation for hexagonal grid."""

from heapq import heappop, heappush

from classes.hexagon_grid import HexagonGrid, get_path


def dijkstra(hexagon_grid: HexagonGrid) -> list[tuple[int, int]]:
    """Dijkstra algorithm for hexagonal grid.

    Args:
        hexagon_grid (HexagonGrid): hexagonal grid

    Returns:
        list[tuple[int, int]]: path from start to end

    """
    start = hexagon_grid.start
    end = hexagon_grid.end
    grid = hexagon_grid.grid
    queue = [(0, start)]
    visited = {start}
    came_from = {start: None}
    cost_so_far = {start: 0}

    while queue:
        current_cost, current = heappop(queue)

        if current == end:
            path = []
            while current:
                path.append(current)
                current = came_from[current]
            return get_path(path[::-1])

        for next_pos in current.neighbors():
            if (
                hexagon_grid.in_bounds(next_pos)
                and next_pos not in visited
                and hexagon_grid.get_value(next_pos) != -1
            ):
                new_cost = current_cost + hexagon_grid.get_value(next_pos)
                if next_pos not in cost_so_far or new_cost < cost_so_far[next_pos]:
                    cost_so_far[next_pos] = new_cost
                    heappush(queue, (new_cost, next_pos))
                    came_from[next_pos] = current
                    visited.add(next_pos)

    return []  # No path found
