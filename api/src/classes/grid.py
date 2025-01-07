"""Grid class module."""

from classes.hexa import Hexa


class Grid:
    """Grid class.

    Grid values:
        +2: default
        +5: water
        +3: grass
        +1: ice
        -1: wall (impassable)

    """

    def __init__(
        self,
        grid: list[list[int]],
    ) -> None:
        """Create a grid object.

        Args:
            grid (list[list[int]]): grid

        """
        self.grid = grid
        self.start = Hexa(0, 0)
        self.end = Hexa(len(grid) - 1, len(grid[0]) - 1)

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

    def is_traversable(self, hexa: Hexa) -> bool:
        """Check if a hexagon is traversable.

        Args:
            hexa (Hexa): Hexagon

        Returns:
            bool: True if the hexagon is traversable, False otherwise

        """
        return (
            0 <= hexa.x < len(self.grid)
            and 0 <= hexa.y < len(self.grid[0])
            and self.grid[hexa.x][hexa.y] != -1
        )

    def get_cost(self, hexa: Hexa) -> int:
        """Get the cost of traversing a hexagon.

        Args:
            hexa (Hexa): Hexagon

        Returns:
            int: Cost of traversing the hexagon

        """
        if 0 <= hexa.x < len(self.grid) and 0 <= hexa.y < len(self.grid[0]):
            return self.grid[hexa.x][hexa.y]
        return float("inf")
