"""DFS route."""

from fastapi import APIRouter, HTTPException

from algorithmes.dfs import dfs
from classes.hexagon import Hexagon
from classes.hexagon_grid import HexagonGrid
from models.grid import GridModel

router = APIRouter()


@router.post("/", summary="DFS algorithm")
async def dfs_route(grid: GridModel) -> dict:
    """DFS algorithm."""
    start = Hexagon(*grid.start)
    end = Hexagon(*grid.end)
    grid_model = HexagonGrid(
        width=len(grid.grid),
        height=len(grid.grid[0]),
        grid=grid.grid,
    )
    grid_model.set_start(start)
    grid_model.set_end(end)
    result, paths = dfs(grid_model)
    if len(result) == 0:
        raise HTTPException(status_code=400, detail="No path found.")
    return {"result": result, "paths": paths}
