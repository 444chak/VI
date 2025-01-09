"""Dijkstra algorithm implementation for hexagonal grid."""

from heapq import heappop, heappush

from classes.hexagon_grid import HexagonGrid, get_path


def dijkstra(
    hexagon_grid: HexagonGrid,
) -> tuple[list[tuple[int, int]], list[tuple[list[tuple[int, int]], int]]]:
    """Dijkstra algorithm for hexagonal grid with exploration tracking.

    Returns:
        tuple[list[tuple[int, int]], list[tuple[list[tuple[int, int]], int]]]:
            - Shortest path
            - List of (path, cost) for each exploration step

    """
    start = hexagon_grid.start
    end = hexagon_grid.end
    queue = [(0, start, [start])]  # Added current path tracking
    visited = {start}
    came_from = {start: None}
    cost_so_far = {start: 0}
    exploration_steps = []  # Track exploration history

    while queue:
        current_cost, current, current_path = heappop(queue)

        # Record current exploration step
        exploration_steps.append(
            (get_path(list(current_path)), current_cost),
        )

        if current == end:
            path = []
            step = current
            while step:
                path.append(step)
                step = came_from[step]
            return get_path(path[::-1]), exploration_steps

        for next_pos in current.neighbors():
            if (
                hexagon_grid.in_bounds(next_pos)
                and next_pos not in visited
                and hexagon_grid.get_value(next_pos) != -1
            ):
                new_cost = current_cost + hexagon_grid.get_value(next_pos)
                if next_pos not in cost_so_far or new_cost < cost_so_far[next_pos]:
                    cost_so_far[next_pos] = new_cost
                    new_path = [*current_path, next_pos]
                    heappush(queue, (new_cost, next_pos, new_path))
                    came_from[next_pos] = current
                    visited.add(next_pos)

    return [], exploration_steps  # No path found
