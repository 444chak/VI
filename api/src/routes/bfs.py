"""BFS route."""

from fastapi import APIRouter, HTTPException

from algorithmes.bfs import bfs
from classes.grid import Grid
from classes.hexa import Hexa
from models.grid import GridModel

router = APIRouter()


@router.post("/", summary="BFS algorithm")
async def bfs_route(grid: GridModel) -> dict:
    """BFS algorithm."""
    start = Hexa(*grid.start)
    end = Hexa(*grid.end)
    grid_model = Grid(grid.grid)
    grid_model.set_start(start)
    grid_model.set_end(end)
    result = bfs(grid_model)
    if len(result) == 0:
        raise HTTPException(status_code=400, detail="No path found.")
    return {"result": result}
