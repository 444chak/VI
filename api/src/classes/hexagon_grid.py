"""Hexagone Grid Class module."""

from dataclasses import dataclass

from classes.hexagon import Hexagon


@dataclass
class HexagonGrid:
    """Hexagon Grid class."""

    width: int  # horizontal (max x)
    height: int  # vertical (max y)
    grid: list[list[int]]

    def __init__(
        self,
        width: int,
        height: int,
        grid: list[list[int]],
        # start: tuple[int, int],
        # end: tuple[int, int],
    ) -> None:
        """Initialize the Hexagon Grid."""
        self.width = width
        self.height = height
        self.grid = grid

    def set_start(self, hexagon: Hexagon) -> None:
        """Set the start hexagon.

        Args:
            hexagon (Hex): start hexagon

        """
        if not self.in_bounds(hexagon):
            msg = "Start hexagon out of bounds."
            raise ValueError(msg)
        self.start = hexagon

    def set_end(self, hexagon: Hexagon) -> None:
        """Set the end hexagon.

        Args:
            hexagon (Hex): end hexagon

        """
        if not self.in_bounds(hexagon):
            msg = "End hexagon out of bounds."
            raise ValueError(msg)
        self.end = hexagon

    def in_bounds(self, hexagon: Hexagon) -> bool:
        """Return True if the hexagon is in bounds, False otherwise.

        Args:
            hexagon (Hex): hexagon

        Returns:
            bool: True if the hexagon is in bounds, False otherwise

        """
        return 0 <= hexagon.x < self.width and 0 <= hexagon.y < self.height

    def get_value(self, hexagon: Hexagon) -> int:
        """Return the value of the hexagon.

        Args:
            hexagon (Hex): hexagon

        Returns:
            int: value of the hexagon

        """
        return self.grid[hexagon.x][hexagon.y]


def get_path(path: list[Hexagon]) -> list[Hexagon]:
    """Get the path from start to end.

    Args:
        path (list[Hexagon]): list of hexagons

    Returns:
        list[tuple[int, int]]: path from start to end

    """
    return [(hexagon.x, hexagon.y) for hexagon in path]
