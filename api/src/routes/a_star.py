"""A* route."""

from fastapi import APIRouter, HTTPException

from algorithmes.a_star import a_star
from classes.hexagon import Hexagon
from classes.hexagon_grid import HexagonGrid
from models.grid import GridModel

router = APIRouter()


@router.post("/", summary="A* algorithm")
async def a_star_route(grid: GridModel) -> dict:
    """A* algorithm."""  # noqa: D401
    start = Hexagon(*grid.start)
    end = Hexagon(*grid.end)
    grid_model = HexagonGrid(
        width=len(grid.grid),
        height=len(grid.grid[0]),
        grid=grid.grid,
    )
    grid_model.set_start(start)
    grid_model.set_end(end)
    result, paths = a_star(grid_model)
    if len(result) == 0:
        raise HTTPException(status_code=400, detail="No path found.")
    return {"result": result, "paths": paths}
