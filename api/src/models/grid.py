"""Grid model module."""


class Grid:
    """Grid model class."""

    def __init__(
        self,
        width: int,
        height: int,
        start: tuple[int, int] = (-1, -1),
        end: tuple[int, int] = (-1, -1),
    ) -> None:
        """Create a grid.

        Args:
            width (int): Width of the grid.
            height (int): Height of the grid.

        """
        self.width = width
        self.height = height
        self.grid = [[0 for _ in range(width)] for _ in range(height)]
        self.grid_path = [[0 for _ in range(width)] for _ in range(height)]
        self.start = start
        self.end = end
