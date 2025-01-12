"""Bellman-Ford algorithm implementation for hexagonal grid."""

from classes.hexagon_grid import Hexagon, HexagonGrid, get_path


def bellman_ford(  # noqa: C901, PLR0912
    hexagon_grid: HexagonGrid,
) -> tuple[list[tuple[int, int]], list[tuple[tuple[int, int], int]]]:
    """Bellman-Ford algorithm for hexagonal grid.

    Returns:
        tuple[list[tuple[int, int]], list[tuple[tuple[int, int], int]]]:
            - Shortest path found
            - List of (point_coordinates, point_weight) for each visited point

    """
    start = hexagon_grid.start
    end = hexagon_grid.end

    # Liste de tous les hexagones valides
    all_hexagons = []
    # Liste pour tracer l'exploration de l'algorithme
    exploration_steps = []

    # Dictionnaires pour stocker les distances et les prédécesseurs
    # Les clés sont les coordonnées (x,y) des hexagones
    distance = {}      # Distance minimale depuis le départ
    predecessor = {}   # Hexagone précédent dans le chemin optimal

    # Construction de la grille des hexagones valides
    # On ne garde que les hexagones accessibles (valeur != -1)
    for x in range(len(hexagon_grid.grid)):
        for y in range(len(hexagon_grid.grid[0])):
            if hexagon_grid.grid[x][y] != -1:
                hex_coords = (x, y)
                all_hexagons.append(hex_coords)
                distance[hex_coords] = float("inf") # Distance initiale infinie
                predecessor[hex_coords] = None

    # Le point de départ a une distance de 0
    start_coords = (start.x, start.y)
    distance[start_coords] = 0

    # Relaxation des arêtes |V|-1 fois
    # Cette étape permet de trouver les plus courts chemins
    for _ in range(len(all_hexagons) - 1):
        for hex_coords in all_hexagons:
            current = Hexagon(hex_coords[0], hex_coords[1])
            for neighbor in current.neighbors():
                neighbor_coords = (neighbor.x, neighbor.y)
                if neighbor_coords in distance:  # Vérifie si le voisin est valide
                    weight = hexagon_grid.get_value(neighbor)
                    # Mise à jour si on trouve un chemin plus court
                    if distance[hex_coords] + weight < distance[neighbor_coords]:
                        distance[neighbor_coords] = distance[hex_coords] + weight
                        predecessor[neighbor_coords] = hex_coords

    # Détection des cycles négatifs
    # Si on peut encore améliorer un chemin après |V|-1 itérations,
    # alors il existe un cycle négatif
    for hex_coords in all_hexagons:
        current = Hexagon(hex_coords[0], hex_coords[1])
        for neighbor in current.neighbors():
            neighbor_coords = (neighbor.x, neighbor.y)
            if neighbor_coords in distance:
                exploration_steps.append((hex_coords, neighbor_coords))
                weight = hexagon_grid.get_value(neighbor)
                if distance[hex_coords] + weight < distance[neighbor_coords]:
                    msg = "Graph contains a negative weight cycle"
                    raise ValueError(msg)

    # Reconstruction du chemin optimal
    # On part de la fin et on remonte jusqu'au début
    path = []
    current_coords = (end.x, end.y)
    while current_coords is not None:
        current = Hexagon(current_coords[0], current_coords[1])
        path.append(current)
        current_coords = predecessor[current_coords]

    # Vérifie si un chemin valide a été trouvé depuis le départ
    if not path or (path[-1].x, path[-1].y) != (start.x, start.y):
        return [], exploration_steps

    return get_path(path[::-1]), exploration_steps
