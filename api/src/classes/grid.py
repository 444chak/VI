"""Grid class module."""

import time

from classes.hexa import Hexa


class Grid:
    """Grid class."""

    def __init__(
        self,
        width: int,
        height: int,
    ) -> None:
        """Create a grid.

        Args:
            width (int): Width of the grid.
            height (int): Height of the grid.

        """
        self.width = width
        self.height = height
        self.grid = [[0 for _ in range(width)] for _ in range(height)]
        self.start = Hexa(0, 0)
        self.end = Hexa(width - 1, height - 1)
        self.created_at = time.time()

    def set_start(self, hexa: Hexa) -> None:
        """Set the start hexagon.

        Args:
            hexa (Hex): start hexagon

        """
        if not self.in_bounds(hexa):
            msg = "Start hexagon out of bounds."
            raise ValueError(msg)
        self.start = hexa

    def set_end(self, hexa: Hexa) -> None:
        """Set the end hexagon.

        Args:
            hexa (Hex): end hexagon

        """
        if not self.in_bounds(hexa):
            msg = "End hexagon out of bounds."
            raise ValueError(msg)
        self.end = hexa

    def in_bounds(self, hexa: Hexa) -> bool:
        """Return True if the hexagon is in bounds, False otherwise.

        Args:
            hexa (Hex): hexagon

        Returns:
            bool: True if the hexagon is in bounds, False otherwise

        """
        return 0 <= hexa.q < self.width and 0 <= hexa.r < self.height

    def get_neighbors(self, hexa: Hexa) -> list[Hexa]:
        """Get neighbors of the hexagon.

        Args:
            hexa (Hex): hexagon

        Returns:
            list[Hex]: all neighbors of the hexagon

        """
        neighbors = []
        for direction in range(6):
            neighbor = hexa.neighbor(direction)
            if self.in_bounds(neighbor):
                neighbors.append(neighbor)
        return neighbors

    def encode(self) -> dict:
        """Encode the grid.

        Returns:
            dict: encoded grid

        """
        return {
            "width": self.width,
            "height": self.height,
            "start": self.start.encode(),
            "end": self.end.encode(),
            "grid": [
                [self.grid[x][y] for y in range(self.width)] for x in range(self.height)
            ],
        }
