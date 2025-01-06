"""Classes package."""

import logging
import threading
import time

# Configure logging to match uvicorn style
logging.basicConfig(format="%(levelname)s:     %(message)s", level=logging.INFO)

logger = logging.getLogger("vi-api")

grids = {}  # grid_id: Grid


def cleanup_grids() -> None:
    """Cleanup all grids that are 1 hour old."""
    logger.info("Cleanup thread started")
    while True:
        now = time.time()
        current_grids = len(grids)
        logger.debug("Current grids: %d", current_grids)

        to_delete = [
            grid_id
            for grid_id, data in grids.items()
            if now - data.created_at > 60 * 60
        ]

        logger.debug("Found %d grids to delete", len(to_delete))

        for grid_id in to_delete:
            grids.pop(grid_id)
            logger.info("Grid %s deleted due to expiration.", grid_id)

        time.sleep(10)


cleanup_thread = threading.Thread(target=cleanup_grids, daemon=True)
cleanup_thread.start()
