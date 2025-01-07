"""Dijkstra algorithm implementation for hexagonal grid."""

from heapq import heappop, heappush

from classes.grid import Grid


def dijskstra(grid: Grid) -> list[tuple[int, int]]:
    """Dijkstra algorithm for hexagonal grid.

    Args:
        grid (Grid): grid object
        start (Hexa): start hexagon
        end (Hexa): end hexagon

    Returns:
        list[tuple[int, int]]: path from start to end

    """
    queue = [(0, grid.start)]
    visited = set()
    came_from = {grid.start: None}

    while queue:
        cost, pos = heappop(queue)
        if pos in visited:
            continue
        visited.add(pos)
        if pos == grid.end:
            path = []
            while pos:
                path.append((pos.x, pos.y))
                pos = came_from[pos]
            return path[::-1]  # Return reversed path
        for neighbor in pos.neighbors():
            if grid.is_traversable(neighbor) and neighbor not in visited:
                new_cost = cost + grid.get_cost(neighbor)
                heappush(queue, (new_cost, neighbor))
                came_from[neighbor] = pos
    return []  # Return empty list if no path found
