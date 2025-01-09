"""A* algorithm implementation for hexagonal grid."""

from heapq import heappop, heappush

from classes.hexagon import Hexagon
from classes.hexagon_grid import HexagonGrid, get_path


def manhattan_distance(pos: Hexagon, end: Hexagon) -> int:
    """Calculate Manhattan distance between two points.

    Args:
        pos (Hexagon): current position
        end (Hexagon): end position

    Returns:
        int: Manhattan distance

    """
    return abs(pos.x - end.x) + abs(pos.y - end.y)


def a_star(
    hexagon_grid: HexagonGrid,
) -> tuple[list[tuple[int, int]], list[tuple[tuple[int, int], int]]]:
    """Return result of A* algorithm with exploration steps.

    Returns:
        tuple[list[tuple[int, int]], list[tuple[tuple[int, int], int]]]:
            - Shortest path found
            - List of (point_coordinates, point_weight) for each visited point

    """
    start = hexagon_grid.start
    end = hexagon_grid.end

    queue = [(0, start, [start])]
    visited = {start}
    g_score = {start: 0}
    f_score = {start: manhattan_distance(start, end)}
    exploration_steps = []  # Will store (point_coords, point_weight)

    while queue:
        _, current, current_path = heappop(queue)

        # Add current point and its weight to exploration steps
        point_coords = (current.x, current.y)
        point_weight = hexagon_grid.get_value(current)
        if (point_coords, point_weight) not in exploration_steps:
            exploration_steps.append((point_coords, point_weight))

        if current == end:
            return get_path(
                [Hexagon(pos.x, pos.y, pos.value) for pos in current_path],
            ), exploration_steps

        for neighbor in current.neighbors():
            if (
                neighbor not in visited
                and hexagon_grid.in_bounds(neighbor)
                and hexagon_grid.get_value(neighbor) != -1
            ):
                tentative_g = g_score[current] + hexagon_grid.get_value(neighbor)

                if neighbor not in g_score or tentative_g < g_score[neighbor]:
                    g_score[neighbor] = tentative_g
                    f_score[neighbor] = tentative_g + manhattan_distance(neighbor, end)
                    new_path = [*current_path, neighbor]
                    heappush(queue, (f_score[neighbor], neighbor, new_path))
                    visited.add(neighbor)

    return [], exploration_steps
