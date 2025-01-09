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


def a_star(hexagon_grid: HexagonGrid) -> list[tuple[int, int]]:
    """Return result of A* algorithm for hexagonal grid.

    Args:
        hexagon_grid (HexagonGrid): hexagonal grid

    Returns:
        list[tuple[int, int]]: path from start to end

    """
    start = hexagon_grid.start
    end = hexagon_grid.end

    queue = [(0, start)]
    visited = {start}
    came_from = {start: None}
    g_score = {start: 0}
    f_score = {start: manhattan_distance(start, end)}

    while queue:
        _, current = heappop(queue)

        if current == end:
            return get_path(came_from)

        for neighbor in current.neighbors():
            if (
                neighbor not in visited
                and hexagon_grid.in_bounds(neighbor)
                and hexagon_grid.get_value(neighbor) != -1
            ):
                tentative_g = g_score[current] + hexagon_grid.get_value(neighbor)

                if neighbor not in g_score or tentative_g < g_score[neighbor]:
                    came_from[neighbor] = current
                    g_score[neighbor] = tentative_g
                    f_score[neighbor] = tentative_g + manhattan_distance(neighbor, end)
                    heappush(queue, (f_score[neighbor], neighbor))
                    visited.add(neighbor)

    return []  # No path found
