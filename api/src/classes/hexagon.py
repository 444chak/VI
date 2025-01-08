"""Hexagon class."""

from dataclasses import dataclass


@dataclass
class Hexagon:
    """Hexagon class."""

    x: int  # horizontal
    y: int  # vertical
    value: int = 2  # default values

    def __init__(self, x: int, y: int, value: int = 2) -> None:
        """Create a hexagon object.

        Args:
            x (int): horizontal
            y (int): vertical
            value (int): value

        """
        self.x = x
        self.y = y
        self.value = value

    def __add__(self, other: "Hexagon") -> "Hexagon":
        """Add two hexagons.

        Args:
            other (Hex): other hexagon

        Returns:
            Hex: sum of two hexagons

        """
        return Hexagon(self.x + other.x, self.y + other.y)

    def __hash__(self) -> int:
        """Return a hash value for the hexagon.

        Returns:
            int: The hash value.

        """
        return hash((self.x, self.y))

    def neighbor(self, direction: int) -> "Hexagon":
        """Get a neighbor of the hexagon.

        Args:
            direction (int): direction of the neighbor
                0=top, 1=left top, 2=right top, 3=bottom, 4=left bottom, 5=right bottom

        Returns:
            Hex: neighbor hexagon

        """
        odd_col = self.x % 2 == 0

        if odd_col:
            directions = [
                Hexagon(0, -1),  # top
                Hexagon(-1, 0),  # left top
                Hexagon(1, 0),  # right top
                Hexagon(0, 1),  # bottom
                Hexagon(1, 1),  # left bottom
                Hexagon(-1, 1),  # right bottom
            ]
        else:
            directions = [
                Hexagon(0, -1),  # top
                Hexagon(-1, -1),  # left top
                Hexagon(1, -1),  # right top
                Hexagon(0, 1),  # bottom
                Hexagon(-1, 0),  # left bottom
                Hexagon(1, 0),  # right bottom
            ]
        return self + directions[direction]

    def neighbors(self) -> list["Hexagon"]:
        """Get all neighbors of the hexagon.

        Returns:
            list[Hexagon]: List of neighbor hexagons

        """
        return [self.neighbor(i) for i in range(6)]
