"""BFS route."""

from fastapi import APIRouter, HTTPException

from algorithmes.bfs import bfs
from classes.hexagon import Hexagon
from classes.hexagon_grid import HexagonGrid
from models.grid import GridModel

router = APIRouter()


@router.post("/", summary="BFS algorithm")
async def bfs_route(grid: GridModel) -> dict:
    """BFS algorithm."""
    start = Hexagon(*grid.start)
    end = Hexagon(*grid.end)
    grid_model = HexagonGrid(
        width=len(grid.grid),
        height=len(grid.grid[0]),
        grid=grid.grid,
    )
    grid_model.set_start(start)
    grid_model.set_end(end)
    result, paths = bfs(grid_model)
    # if len(result) == 0:
    #     raise HTTPException(status_code=400, detail="No path found.")
    return {"result": result, "paths": setup_paths(paths)}


def get_path(parent: tuple, child: tuple) -> str:  # noqa: PLR0911
    """Determine the direction from the parent hexagon to the child hexagon.

    Args:
        parent (tuple): A tuple representing the coordinates (x, y) of the
            parent hexagon.
        child (tuple): A tuple representing the coordinates (x, y) of the
            child hexagon.

    Returns:
        str: A string representing the direction from the parent hexagon to
            the child hexagon. Possible values are "top", "bottom",
            "bottom-right", "top-right", "bottom-left", "top-left".

    """
    parent = Hexagon(*parent)
    child = Hexagon(*child)
    if parent.x == child.x:
        if parent.y > child.y:
            return "top"
        return "bottom"
    if parent.x < child.x:
        if parent.y == child.y:
            return "bottom-right"
        if parent.y < child.y:
            return "top-right"
        return "bottom-left"
    if parent.y == child.y:
        return "top-left"
    if parent.y < child.y:
        return "top-right"
    return "bottom-left"


def setup_paths(
    paths: list[tuple[tuple[int, int], tuple[int, int]]],
) -> dict[int, list[str]]:
    """Process a list of paths and return a mapping of hexagons to their directions.

    Args:
        paths (list of tuples): A list of tuples where each tuple contains two elements,
            representing the parent and child nodes of a path.

    Returns:
        dict: A dictionary where the keys are hexagon identifiers and the values are lists
            of directions from the parent to the child node for each path associated with
            that hexagon.

    Example:
        paths = [(1, 2), (2, 3), (1, 3)]
        directions_map = setup_paths(paths)
        # directions_map might look like:
        # {1: ['top', 'bottom'], 2: ['top-right']}

    """
    directions = []
    for path in paths:
        parent, child = path
        direction = get_path(parent, child)
        directions.append((parent, direction))

    directions_map = {}
    for hexagon, direction in directions:
        if hexagon not in directions_map:
            directions_map[hexagon] = []
        directions_map[hexagon].append(direction)

    return directions_map
