from fastapi import APIRouter, HTTPException
from models.grid import GridModel
from algorithmes.dijskstra import dijkstra
from classes.hexa import Hexa
from classes.grid import Grid as G

router = APIRouter()


@router.post("/", summary="Dijskstra algorithm")
async def dijskstra(grid: GridModel) -> dict:
    """Dijskstra algorithm."""
    start = Hexa(*grid.start)
    end = Hexa(*grid.end)
    grid_model = G(grid.grid)
    result = dijkstra(grid_model, start, end)
    if len(result) == 0:
        raise HTTPException(status_code=400, detail="No path found.")
    return {"result": result}
