"""Bellman-Ford algorithm implementation for hexagonal grid."""

from classes.hexagon_grid import Hexagon, HexagonGrid, get_path

def bellman_ford(hexagon_grid: HexagonGrid) -> list[tuple[int, int]]:
    """Bellman-Ford algorithm for hexagonal grid.

    Args:
        hexagon_grid (HexagonGrid): hexagonal grid

    Returns:
        list[tuple[int, int]]: path from start to end or empty list if no path exists.
    """
    start = hexagon_grid.start
    end = hexagon_grid.end
    grid = hexagon_grid.grid

    distance = {hex: float('inf') for hex in grid}
    distance[start] = 0
    predecessor = {hex: None for hex in grid}

    for _ in range(len(grid) - 1):
        for hex in grid:
            neighbors = hexagon_grid.get_neighbors(hex)
            for neighbor in neighbors:
                weight = hexagon_grid.get_cost(hex, neighbor)
                if distance[hex] + weight < distance[neighbor]:
                    distance[neighbor] = distance[hex] + weight
                    predecessor[neighbor] = hex

    for hex in grid:
        neighbors = hexagon_grid.get_neighbors(hex)
        for neighbor in neighbors:
            weight = hexagon_grid.get_cost(hex, neighbor)
            if distance[hex] + weight < distance[neighbor]:
                raise ValueError("Graph contains a negative weight cycle")

    path = []
    current = end
    while current is not None:
        path.append(current)
        current = predecessor[current]

    if path[-1] != start:
        return []

    return get_path(path[::-1])
