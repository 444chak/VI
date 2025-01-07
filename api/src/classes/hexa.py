"""Hexa class module."""

from dataclasses import dataclass
from typing import List


@dataclass
class Hexa:
    """Hexagon class."""

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

    def neighbors(self) -> List["Hexa"]:
        """Get all neighbors of the hexagon.

        Returns:
            List[Hexa]: List of neighbor hexagons
        """
        return [self.neighbor(direction) for direction in range(6)]

    def encode(self) -> tuple[int, int]:
        """Encode the hexagon.

        Returns:
            dict: encoded hexagon

        """
        return (self.x, self.y)

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Hexa):
            return NotImplemented
        return self.x == other.x and self.y == other.y

    def __hash__(self) -> int:
        return hash((self.x, self.y))

    def __lt__(self, other: "Hexa") -> bool:
        """Compare hexagons for priority queue."""
        return (self.x, self.y) < (other.x, other.y)

    def __repr__(self) -> str:
        """String representation of the hexagon."""
        return f"({self.x},{self.y})"
