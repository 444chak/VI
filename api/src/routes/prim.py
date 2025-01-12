"""Prim route."""

from fastapi import APIRouter

from algorithmes.prim import prim
from classes.hexagon import Hexagon
from classes.hexagon_grid import HexagonGrid
from models.grid import GridModel
from utils.paths_utils import setup_paths

router = APIRouter()


@router.post("/", summary="Prim algorithm")
async def prim_route(grid: GridModel) -> dict:
    """Prim algorithm."""
    start = Hexagon(*grid.start)
    end = Hexagon(*grid.end)
    grid_model = HexagonGrid(
        width=len(grid.grid),
        height=len(grid.grid[0]),
        grid=grid.grid,
    )
    grid_model.set_start(start)
    grid_model.set_end(end)
    result, paths = prim(grid_model)
    return {"result": result, "paths": setup_paths(paths)}
