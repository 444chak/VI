"""Bellman ford route."""

from fastapi import APIRouter, HTTPException

from algorithmes.bellman_ford import bellman_ford
from classes.hexagon import Hexagon
from classes.hexagon_grid import HexagonGrid
from models.grid import GridModel
from utils.paths_utils import setup_paths

router = APIRouter()


@router.post("/", summary="Bellman-Ford algorithm")
async def bellman_route(grid: GridModel) -> dict:
    """Bellman-Ford algorithm."""
    start = Hexagon(*grid.start)
    end = Hexagon(*grid.end)
    grid_model = HexagonGrid(
        width=len(grid.grid),
        height=len(grid.grid[0]),
        grid=grid.grid,
    )
    grid_model.set_start(start)
    grid_model.set_end(end)
    result, paths = bellman_ford(grid_model)
    if len(result) == 0:
        raise HTTPException(status_code=400, detail="No path found.")
    return {"result": result, "paths": setup_paths(paths)}
