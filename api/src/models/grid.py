"""Grid model module."""

from pydantic import BaseModel


class GridModel(BaseModel):
    """Model for a grid."""

    grid: list[list[int]]
    start: tuple[int, int]
    end: tuple[int, int]
