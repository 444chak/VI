"""Dijkstra algorithm implementation for hexagonal grid."""

from heapq import heappop, heappush
from typing import Dict, Tuple, List
from classes.grid import Grid as G
from classes.hexa import Hexa


def dijkstra(grid: G, start: Hexa, end: Hexa) -> List[Tuple[int, int]]:
    queue = [(0, start)]
    visited = set()
    came_from = {start: None}

    while queue:
        cost, pos = heappop(queue)
        if pos in visited:
            continue
        visited.add(pos)
        if pos == end:
            path = []
            while pos:
                path.append((pos.x, pos.y))
                pos = came_from[pos]
            return path[::-1]  # Return reversed path
        for neighbor in pos.neighbors():
            if grid.is_traversable(neighbor) and neighbor not in visited:
                heappush(queue, (cost + 1, neighbor))
                came_from[neighbor] = pos
    return []  # Return empty list if no path found
