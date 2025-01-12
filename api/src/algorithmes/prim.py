"""Prim's algorithm for a hexagonal grid."""

from heapq import heappop, heappush

from classes.hexagon_grid import HexagonGrid


def prim(hexagon_grid: HexagonGrid) -> dict:
    """Prim algorithm for hexagonal grid with exploration tracking.

    Returns:
        tuple[list[tuple[int, int]], list[tuple[list[tuple[int, int]], int]]]:
            - Shortest path
            - List of (path, cost) for each exploration step

    """
    start = hexagon_grid.start
    visited = {start}
    edges = []
    result = []
    paths = []

    for neighbor in start.neighbors():
        if hexagon_grid.in_bounds(neighbor) and hexagon_grid.get_value(neighbor) != -1:
            heappush(edges, (hexagon_grid.get_value(neighbor), start, neighbor))
            paths.append(((start.x, start.y), (neighbor.x, neighbor.y)))

    result.append([start.x, start.y])

    while edges:
        _, _, to = heappop(edges)

        if to in visited:
            continue

        visited.add(to)
        result.append([to.x, to.y])

        for neighbor in to.neighbors():
            if (
                neighbor not in visited
                and hexagon_grid.in_bounds(neighbor)
                and hexagon_grid.get_value(neighbor) != -1
            ):
                heappush(edges, (hexagon_grid.get_value(neighbor), to, neighbor))
                paths.append(((to.x, to.y), (neighbor.x, neighbor.y)))

    return result, paths
