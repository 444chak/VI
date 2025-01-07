"""Dijskstra route."""

from fastapi import APIRouter, HTTPException

from algorithmes.dijskstra import dijkstra
from classes.grid import Grid
from classes.hexa import Hexa
from models.grid import GridModel

router = APIRouter()


@router.post("/", summary="Dijskstra algorithm")
async def dijskstra(grid: GridModel) -> dict:
    """Dijskstra algorithm."""
    start = Hexa(*grid.start)
    end = Hexa(*grid.end)
    grid_model = Grid(grid.grid)
    result = dijkstra(grid_model, start, end)
    if len(result) == 0:
        raise HTTPException(status_code=400, detail="No path found.")
    return {"result": result}
