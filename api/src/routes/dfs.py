"""DFS route."""

from fastapi import APIRouter, HTTPException

from algorithmes.dfs import dfs
from classes.grid import Grid
from classes.hexa import Hexa
from models.grid import GridModel

router = APIRouter()


@router.post("/", summary="DFS algorithm")
async def dfs_route(grid: GridModel) -> dict:
    """DFS algorithm."""
    start = Hexa(*grid.start)
    end = Hexa(*grid.end)
    grid_model = Grid(grid.grid)
    grid_model.set_start(start)
    grid_model.set_end(end)
    result = dfs(grid_model)
    if len(result) == 0:
        raise HTTPException(status_code=400, detail="No path found.")
    return {"result": result}
