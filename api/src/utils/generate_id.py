"""Generate id module."""

import random


def generate_unique_id(grids: dict, min_value: int = 1, max_value: int = 10000) -> int:
    """Generate a unique id.

    Args:
        grids (dict): Grids dictionary.
        min_value (int, optional): Min value. Defaults to 1.
        max_value (int, optional): Max value. Defaults to 10000.

    Returns:
        int: Unique id

    """
    while True:
        new_id = random.randint(min_value, max_value)  # noqa: S311
        if new_id not in grids:
            return new_id
