"""Hexa class module."""

from dataclasses import dataclass


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

    def __hash__(self) -> int:
        """
        Returns a hash value for the hexagon.

        Returns:
            int: The hash value.
        """
        return hash((self.x, self.y))

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

    def encode(self) -> dict:
        """Encode the hexagon.

        Returns:
            dict: encoded hexagon

        """
        return {"x": self.x, "y": self.y}
