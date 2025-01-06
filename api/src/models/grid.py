"""Grid model module."""


class Grid:
    """Grid model class."""

    def __init__(
        self,
        width: int,
        height: int,
        start: tuple[int, int] = (0, 0),
        end: tuple[int, int] = (-1, -1),
    ) -> None:
        """Create a grid.

        Args:
            width (int): Width of the grid.
            height (int): Height of the grid.
            start (tuple[int, int], optional): Start position. Defaults to (0, 0).
            end (tuple[int, int], optional): End position. Defaults to (width, height).

        """
        if end == (-1, -1):
            end = (width - 1, height - 1)
        self.width = width
        self.height = height
        self.grid = [[0 for _ in range(width)] for _ in range(height)]
        self.start = start
        self.end = end
