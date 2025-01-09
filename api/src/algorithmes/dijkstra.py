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
    queue = [(0, start, [start])]
    visited = {start}
    came_from = {start: None}
    cost_so_far = {start: 0}
    exploration_steps = []  # Will store (point_coords, point_weight)

    while queue:
        current_cost, current, current_path = heappop(queue)

        # Add current point and its weight to exploration steps
        point_coords = (current.x, current.y)
        point_weight = hexagon_grid.get_value(current)
        if (point_coords, point_weight) not in exploration_steps:
            exploration_steps.append((point_coords, point_weight))

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

    return [], exploration_steps
