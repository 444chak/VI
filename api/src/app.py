"""FastAPI application."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import bfs

app = FastAPI(title="VI API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)


@app.get("/", summary="Get app version")
async def get_info() -> dict:
    """Get the app info."""
    info = {}
    info["title"] = app.title
    info["version"] = "v" + app.version
    info["author"] = "BORGO, IUT Vélizy"
    return info


# TODO: Adapter dijkstra et dfs en fonction de la structure de données utilisée pour BFS

# app.include_router(dijskstra.router, prefix="/dijkstra", tags=["dijkstra"])
app.include_router(bfs.router, prefix="/bfs", tags=["bfs"])
# app.include_router(dfs.router, prefix="/dfs", tags=["dfs"])
