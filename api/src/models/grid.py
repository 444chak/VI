"""Grid model module."""

from dataclasses import dataclass


@dataclass
class Hexa:
    """Hexagon model class."""

    x: int
    y: int

    def __add__(self, other: "Hexa") -> "Hexa":
        """Add two hexagons.

        Args:
            other (Hex): other hexagon

        Returns:
            Hex: sum of two hexagons

        """
        return Hexa(self.x + other.x, self.y + other.y)

    def neighbor(self, direction: int) -> "Hexa":
        """Get a neighbor of the hexagon.

        Args:
            direction (int): direction of the neighbor
                0=right, 1=right-down, 2=left-down, 3=left, 4=left-up, 5=right-up

        Returns:
            Hex: neighbor hexagon

        """
        directions = [
            Hexa(1, 0),
            Hexa(1, -1),
            Hexa(0, -1),
            Hexa(-1, 0),
            Hexa(-1, 1),
            Hexa(0, 1),
        ]
        return self + directions[direction]


class Grid:
    """Grid model class."""

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
