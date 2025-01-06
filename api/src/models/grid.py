"""Grid model module."""


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
        self.grid_path = [[0 for _ in range(width)] for _ in range(height)]
