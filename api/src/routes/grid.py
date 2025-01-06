"""Grid routes."""

from fastapi import APIRouter, HTTPException

from classes import grids
from classes.grid import Grid
from models.grid import GridCreation, GridModel
from models.hexa import Hexa
from utils.generate_id import generate_unique_id

router = APIRouter()


@router.post("/", summary="Create a grid")
async def login(grid_creation: GridCreation) -> dict:
    """Create a grid with the given width and height."""
    if grid_creation.width < 1 or grid_creation.height < 1:
        raise HTTPException(
            status_code=400,
            detail="Width and height must be greater than 0.",
        )

    grid = Grid(grid_creation.width, grid_creation.height)

    grid_id: int = generate_unique_id(grids)
    grids[grid_id] = grid

    return {"grid_id": grid_id, "grid": grid.encode()}


@router.get("/{grid_id}", summary="Get a grid")
async def get_grid(grid_id: int) -> dict:
    """Get a grid by its id."""
    if grid_id not in grids:
        raise HTTPException(
            status_code=404,
            detail="Grid not found.",
        )

    grid = grids[grid_id]

    return {"grid_id": grid_id, "grid": grid.encode()}


@router.put("/{grid_id}/start", summary="Set the start point")
async def set_start(grid_id: int, hexa: Hexa) -> dict:
    """Set the start hexagon of the grid."""
    if grid_id not in grids:
        raise HTTPException(
            status_code=404,
            detail="Grid not found.",
        )

    grid = grids[grid_id]
    try:
        grid.set_start(hexa)
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        ) from e

    return {"grid_id": grid_id, "grid": grid.encode()}


@router.put("/{grid_id}/end", summary="Set the end point")
async def set_end(grid_id: int, hexa: Hexa) -> dict:
    """Set the end hexagon of the grid."""
    if grid_id not in grids:
        raise HTTPException(
            status_code=404,
            detail="Grid not found.",
        )

    grid = grids[grid_id]
    try:
        grid.set_end(hexa)
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        ) from e

    return {"grid_id": grid_id, "grid": grid.encode()}


@router.patch("/{grid_id}", summary="Update a grid")
async def update_grid(grid_id: int, new_grid: GridModel) -> dict:
    """Update a grid."""
    if grid_id not in grids:
        raise HTTPException(
            status_code=404,
            detail="Grid not found.",
        )

    grid = grids[grid_id]
    if grid.width != len(new_grid.grid) or grid.height != len(new_grid.grid[0]):
        raise HTTPException(
            status_code=400,
            detail="Grid size must be the same.",
        )
    grid.grid = new_grid.grid

    return {"grid_id": grid_id, "grid": grid.encode()}
