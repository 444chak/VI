"""Grid model module."""

from pydantic import BaseModel


class GridCreation(BaseModel):
    """Model for creating a grid."""

    width: int
    height: int


class GridModel(BaseModel):
    """Model for a grid."""

    grid: list[list[int]]
