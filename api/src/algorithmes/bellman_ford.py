"""Bellman-Ford algorithm implementation for hexagonal grid."""

from classes.hexagon_grid import HexagonGrid, get_path


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

    distance = {hexa: float("inf") for hexa in grid}
    distance[start] = 0
    predecessor = {hexa: None for hexa in grid}

    for _ in range(len(grid) - 1):
        for hexa in grid:
            neighbors = hexagon_grid.get_neighbors(hexa)
            for neighbor in neighbors:
                weight = hexagon_grid.get_cost(hexa, neighbor)
                if distance[hexa] + weight < distance[neighbor]:
                    distance[neighbor] = distance[hexa] + weight
                    predecessor[neighbor] = hexa

    for hexa in grid:
        neighbors = hexagon_grid.get_neighbors(hexa)
        for neighbor in neighbors:
            weight = hexagon_grid.get_cost(hexa, neighbor)
            if distance[hexa] + weight < distance[neighbor]:
                msg = "Graph contains a negative weight cycle"
                raise ValueError(msg)

    path = []
    current = end
    while current is not None:
        path.append(current)
        current = predecessor[current]

    if path[-1] != start:
        return []

    return get_path(path[::-1])
