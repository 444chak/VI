"""Hexa model module."""

from pydantic import BaseModel


class Hexa(BaseModel):
    """Model for Hexa point."""

    x: int
    y: int
