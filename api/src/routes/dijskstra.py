"""Dijskstra route."""

from fastapi import APIRouter, HTTPException

from algorithmes.dijskstra import dijskstra
from classes.hexagon import Hexagon
from classes.hexagon_grid import HexagonGrid
from models.grid import GridModel

router = APIRouter()


@router.post("/", summary="Dijskstra algorithm")
async def dijskstra_route(grid: GridModel) -> dict:
    """Dijskstra algorithm."""
    start = Hexagon(*grid.start)
    end = Hexagon(*grid.end)
    grid_model = HexagonGrid(
        width=len(grid.grid), height=len(grid.grid[0]), grid=grid.grid
    )
    grid_model.set_start(start)
    grid_model.set_end(end)
    result = dijskstra(grid_model)
    if len(result) == 0:
        raise HTTPException(status_code=400, detail="No path found.")
    return {"result": result}
