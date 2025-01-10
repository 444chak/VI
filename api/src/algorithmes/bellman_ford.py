"""Bellman-Ford algorithm implementation for hexagonal grid."""

from classes.hexagon_grid import Hexagon, HexagonGrid, get_path


def bellman_ford(  # noqa: C901, PLR0912
    hexagon_grid: HexagonGrid,
) -> tuple[list[tuple[int, int]], list[tuple[tuple[int, int], int]]]:
    """Bellman-Ford algorithm for hexagonal grid.

    Returns:
        tuple[list[tuple[int, int]], list[tuple[tuple[int, int], int]]]:
            - Shortest path found
            - List of (point_coordinates, point_weight) for each visited point

    """
    start = hexagon_grid.start
    end = hexagon_grid.end

    # Create flat list of all valid hexagons
    all_hexagons = []
    exploration_steps = []

    # Initialize distances and predecessors using coordinates as keys
    distance = {}
    predecessor = {}

    # Build grid of valid hexagons
    for x in range(len(hexagon_grid.grid)):
        for y in range(len(hexagon_grid.grid[0])):
            if hexagon_grid.grid[x][y] != -1:
                hex_coords = (x, y)
                all_hexagons.append(hex_coords)
                distance[hex_coords] = float("inf")
                predecessor[hex_coords] = None

    start_coords = (start.x, start.y)
    distance[start_coords] = 0

    # Relax edges |V|-1 times
    for _ in range(len(all_hexagons) - 1):
        for hex_coords in all_hexagons:
            current = Hexagon(hex_coords[0], hex_coords[1])
            for neighbor in current.neighbors():
                neighbor_coords = (neighbor.x, neighbor.y)
                if neighbor_coords in distance:  # Check if neighbor is valid
                    weight = hexagon_grid.get_value(neighbor)
                    if distance[hex_coords] + weight < distance[neighbor_coords]:
                        distance[neighbor_coords] = distance[hex_coords] + weight
                        predecessor[neighbor_coords] = hex_coords

    # Check for negative cycles
    for hex_coords in all_hexagons:
        current = Hexagon(hex_coords[0], hex_coords[1])
        for neighbor in current.neighbors():
            neighbor_coords = (neighbor.x, neighbor.y)
            if neighbor_coords in distance:
                exploration_steps.append((hex_coords, neighbor_coords))
                weight = hexagon_grid.get_value(neighbor)
                if distance[hex_coords] + weight < distance[neighbor_coords]:
                    msg = "Graph contains a negative weight cycle"
                    raise ValueError(msg)

    # Reconstruct path
    path = []
    current_coords = (end.x, end.y)
    while current_coords is not None:
        current = Hexagon(current_coords[0], current_coords[1])
        path.append(current)
        current_coords = predecessor[current_coords]

    if not path or (path[-1].x, path[-1].y) != (start.x, start.y):
        return [], exploration_steps

    return get_path(path[::-1]), exploration_steps
