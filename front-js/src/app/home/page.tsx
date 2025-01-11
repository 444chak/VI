"use client";

import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Button,
  ButtonGroup,
  Tooltip,
  Slider,
  Alert,
  Link,
} from "@mui/joy";
import Hexa from "../components/Hexagon/Hexagon";
import { Grid2 } from "@mui/material";
import EraserIcon from "../components/icons/Eraser";
import CrossIcon from "../components/icons/Cross";
import WaterIcon from "../components/icons/Water";
import IceIcon from "../components/icons/Ice";
import HerbIcon from "../components/icons/Herb";
import WallIcon from "../components/icons/Wall";
import Space from "../components/Space/Space";
import FlagIcon from "../components/icons/Flag";
import HouseIcon from "../components/icons/House";
import useMediaQuery from "@mui/material/useMediaQuery";
import Logo from "../components/Logo/Logo";
import InfoIcon from "../components/icons/Info";
import WarningIcon from "../components/icons/Warning";
import { getAlgorithm } from "../api/viApi";
import {
  ALERTS,
  ALGORITHM_LABELS,
  ALGORITHM_PATHS,
  BUTTONS,
  COLOR_VALUES,
  COLORS,
  ERROR_MESSAGES,
  TOOLTIPS,
  VALUE_TO_COLOR,
} from "../dict";

export default function Home() {
  const [Rows, setRows] = useState(16); // Nombre de lignes
  const [Columns, setColumns] = useState(20); // Nombre de colonnes
  const isSmallScreen = useMediaQuery("(max-width:600px)"); // Vérifie si l'écran est petit
  const isMediumScreen = useMediaQuery("(max-width:960px)"); // Vérifie si l'écran est moyen
  const isMediumLargeScreen = useMediaQuery("(max-width:1280px)"); // Vérifie si l'écran est moyen-large
  const isLargeScreen = useMediaQuery("(max-width:1440px)"); // Vérifie si l'écran est grand

  // Taille de l'hexagone en fonction de la taille de l'écran

  const sizes = {
    small: 20,
    medium: 30,
    mediumLarge: 30,
    large: 40,
    ultraLarge: 50,
  };

  const size = isSmallScreen
    ? sizes.small
    : isMediumScreen
      ? sizes.medium
      : isMediumLargeScreen
        ? sizes.mediumLarge
        : isLargeScreen
          ? sizes.large
          : sizes.ultraLarge;

  // Grille contenant les valeurs de chaque hexagone (2 pour tous les hexagones par défaut)
  const [grid, setGrid] = useState(Array(Columns * Rows).fill(2));

  // Gestion de l'état des couleurs pour chaque hexagone
  const [hexColors, setHexColors] = useState(
    Array(Columns * Rows).fill("") // Init with empty colors
  );

  /**
   * Réinitialise les couleurs de la grille
   * @returns {void}
   */
  const resetColors = (): void => {
    if (inProgress) {
      // Si un algorithme est en cours, affiche un message d'erreur
      setError(ERROR_MESSAGES.ALGO_IN_PROGRESS);
      return;
    }
    setError(""); // Réinitialise le message d'erreur
    setResultSize(0); // Réinitialise la taille du résultat
    setAlgo(false); // Défini que aucun algorithme n'est en cours
    resetAlgo(); // Réinitialise l'algorithme
    setHexColors(Array(Columns * Rows).fill("")); // Réinitialise les couleurs
    setGrid(Array(Columns * Rows).fill(2)); // Réinitialise les valeurs de la grille
    setStartState({ x: 0, y: 0 }); // Réinitialise le point de départ
    setEndState({ x: Columns - 1, y: Rows - 1 }); // Réinitialise le point d'arrivée
    const newColors = [];
    newColors[0] = COLORS[6]; // Couleur du point de départ
    newColors[Columns * Rows - 1] = COLORS[7]; // Couleur du point d'arrivée
    setHexColors(newColors);
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[0] = COLOR_VALUES.start;
      newGrid[Columns * Rows - 1] = COLOR_VALUES.end;
      return newGrid;
    });
    setArrows([]);
  };

  /**
   * Réinitialise l'algorithme courant
   * @returns {void}
   */
  const resetAlgo = (): void => {
    if (inProgress) {
      // Si un algorithme est en cours, affiche un message d'erreur
      setError(ERROR_MESSAGES.ALGO_IN_PROGRESS);
      return;
    }
    const updatedColors = [...hexColors]; // Copie des couleurs actuelles
    for (let i = 0; i < Columns * Rows; i++) {
      // Parcours de chaque hexagone
      if (updatedColors[i] === "red") {
        // Si l'hexagone est rouge
        updatedColors[i] = VALUE_TO_COLOR[grid[i]]; // On le remet à sa couleur d'origine
      }
    }
    setBordereds(Array(Columns * Rows).fill(false)); // Réinitialise les bordures (chemin)
    setHexColors(updatedColors);
    setInProgress(false);
    setError("");
    setResultSize(0);
    setAlgo(false);
    setArrows([]);
  };

  const [startState, setStartState] = useState({ x: 0, y: 0 });
  const [endState, setEndState] = useState({
    x: Columns - 1,
    y: Rows - 1,
  });

  /**
   * Gère le clic sur un hexagone
   * @param {number} index Index de l'hexagone cliqué
   * @param {string} color Couleur de l'hexagone
   * @returns {void}
   */
  const handleHexClick = (index: number, color: string): void => {
    if (activeButton === 6) {
      // Si le bouton actif est le bouton de départ, on défini le point de départ
      setStart(index);
    } else if (activeButton === 7) {
      // Si le bouton actif est le bouton d'arrivée, on défini le point d'arrivée
      setEnd(index);
    } else if (activeButton !== 0) {
      // Si un autre bouton est actif, on change la couleur de l'hexagone
      if (hexColors[index] !== COLORS[6] && hexColors[index] !== COLORS[7]) {
        const newColors = [...hexColors];
        newColors[index] = color;
        setHexColors(newColors);
        setGrid((prevGrid) => {
          const newGrid = [...prevGrid];
          newGrid[index] = COLOR_VALUES[color];
          return newGrid;
        });
      }
    }
  };

  /** Définit le point de départ
   * @param {number} index Index de l'hexagone
   * @returns {void}
   */
  const setStart = (index?: number): void => {
    if (index === undefined) {
      // Si l'index n'est pas défini, on le défini à partir de l'état actuel
      index = startState.x * Rows + startState.y;
    }

    const old_start = startState; // Sauvegarde de l'ancien point de départ

    // Définit le nouveau point de départ
    setStartState({ x: Math.floor(index / Rows), y: index % Rows });
    const updatedColors = [...hexColors];
    updatedColors[index] = COLORS[6]; // Couleur du point de départ
    setHexColors(updatedColors);
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[index] = COLOR_VALUES.start;
      return newGrid;
    });

    // Supprime l'ancien point de départ
    const old_start_index = old_start.x * Rows + old_start.y;
    if (old_start_index !== index) {
      // Si le point de départ est différent de l'ancien point de départ, on le supprime
      updatedColors[old_start_index] = "";
      setHexColors(updatedColors);
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        newGrid[old_start_index] = COLOR_VALUES[""];
        return newGrid;
      });
    }
  };

  /**
   * Définit le point d'arrivée
   * @param {number} index Index de l'hexagone
   * @returns {void}
   */
  const setEnd = (index?: number): void => {
    if (index === undefined) {
      // Si l'index n'est pas défini, on le défini à partir de l'état actuel
      index = endState.x * Rows + endState.y;
    }

    const old_end = endState; // Sauvegarde de l'ancien point d'arrivée

    // Définit le nouveau point d'arrivée
    setEndState({ x: Math.floor(index / Rows), y: index % Rows });
    const updatedColors = [...hexColors];
    updatedColors[index] = COLORS[7]; // Couleur du point d'arrivée
    setHexColors(updatedColors);
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[index] = COLOR_VALUES.end;
      return newGrid;
    });

    // Supprime l'ancien point d'arrivée
    const old_end_index = old_end.x * Rows + old_end.y;
    if (old_end_index !== index) {
      // Si le point d'arrivée est différent de l'ancien point d'arrivée, on le supprime
      updatedColors[old_end_index] = "";
      setHexColors(updatedColors);
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        newGrid[old_end_index] = COLOR_VALUES[""];
        return newGrid;
      });
    }
  };

  // Réinitialise les couleurs de la grille au chargement de la page
  useEffect(() => {
    resetColors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Désactiver la sélection du texte pour les éléments avec la classe "no-select" (notamment les hexagones)
  useEffect(() => {
    const noSelectElements = document.querySelectorAll(".no-select");
    noSelectElements.forEach((element) => {
      (element as HTMLElement).style.userSelect = "none";
    });
  }, []);

  const [mouseStatus, setMouseStatus] = useState(false); // Status de la souris (false si le bouton de la souris est relâché)

  // Vérifier quand le bouton de souris est enfoncé
  useEffect(() => {
    const handleMouseDown = () => {
      setMouseStatus(true);
    };
    window.addEventListener("mousedown", handleMouseDown);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  // Vérifier quand le bouton de souris est relâché
  useEffect(() => {
    const handleMouseUp = () => {
      setMouseStatus(false);
    };
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  /**
   * Gère le survol de la souris sur un hexagone
   * @param {number} index Index de l'hexagone
   * @param {string} color Couleur de l'hexagone
   * @returns {void}
   */
  const handleMouseEnter = (index: number, color: string): void => {
    if (mouseStatus) {
      // Si le bouton de la souris est enfoncé, on change la couleur de l'hexagone
      handleHexClick(index, color);
    }
  };

  const [activeButton, setActiveButton] = useState(0); // Bouton actif (outil sélectionné)
  const [activeColor, setActiveColor] = useState(""); // Couleur actuelle sélectionnée

  /**
   * Gère les boutons d'actions
   * @param {number} index Index du bouton
   * @returns {void}
   */
  const handleOnActionButtons = (index: number): void => {
    setActiveButton(activeButton === index ? 0 : index); // Active ou désactive le bouton
    setActiveColor(COLORS[index]); // Définit la couleur actuelle
  };

  /**
   * Convertit la grille en tableau 2D (x,y) (lignes -> x, colonnes -> y)
   * @param {number[]} grid Grille
   * @returns {number[][]} Grille 2D
   */
  const mapGrid = (grid: number[]): number[][] => {
    const newGrid: number[][] = [];
    for (let i = 0; i < Columns; i++) {
      // Parcours des colonnes
      const row = [];
      for (let j = 0; j < Rows; j++) {
        // Parcours des lignes
        row.push(grid[i * Rows + j]); // Ajoute la valeur de l'hexagone à la ligne
      }
      newGrid.push(row); // Ajoute la ligne à la grille
    }
    return newGrid;
  };

  const [resultSize, setResultSize] = useState(0); // Taille du résultat (nombre de points)

  const [error, setError] = useState(""); // Message d'erreur

  const [inProgress, setInProgress] = useState(false); // Algorithme en cours

  const timeForAlgorithm = 50; // Temps pour chaque étape de l'algorithme

  const [algo, setAlgo] = useState(false); // Algorithme terminé

  const [activeAlgorithm, setActiveAlgorithm] = useState(""); // Algorithme actif

  /**
   * Fonction intermédiaire pour définir l'algorithme actif
   * @param {string} algo Algorithme
   * @returns {void}
   */
  const setActiveAlgorithmIntermediary = (algo: string): void => {
    if (activeAlgorithm === algo) {
      setActiveAlgorithm("");
    } else {
      setActiveAlgorithm(algo);
    }
  };

  /**
   * Démarre l'algorithme
   * @param {string} algo Algorithme
   * @returns {void}
   */
  const startAlgo = async (): Promise<void> => {
    if (activeAlgorithm === "") {
      // Vérifie si un algorithme est sélectionné et affiche un message d'erreur si ce n'est pas le cas
      setError(ERROR_MESSAGES.NO_ALGORITHM);
      return;
    }
    if (inProgress) {
      // Vérifie si un algorithme est en cours et affiche un message d'erreur si c'est le cas
      setError(ERROR_MESSAGES.ALGO_IN_PROGRESS);
      return;
    }
    if (algo) {
      // Si un algorithme est déjà sélectionné, on affiche un message d'erreur
      setError(ERROR_MESSAGES.RESET_ALGO);
      return;
    }

    const gridParam = mapGrid(grid);
    const params = {
      grid: gridParam,
      start: [startState.x, startState.y],
      end: [endState.x, endState.y],
    };
    const data = await getAlgorithm(activeAlgorithm, params);
    const response = data[0] as number[][]; // Récupère la réponse de l'algorithme (chemin)
    const paths = data[1] as { [key: string]: string[][] }; // Récupère tous les chemins essayés

    // Affiche les chemins essayés
    const newArrows = Array(Columns * Rows).fill([]);
    for (let i = 0; i < Columns; i++) {
      for (let j = 0; j < Rows; j++) {
        const index = i * Rows + j;
        if (paths[`${i},${j}`]) {
          setTimeout(
            () => {
              setArrows((prevArrows) => {
                const updatedArrows = [...prevArrows];
                newArrows[index] = paths[`${i},${j}`];
                updatedArrows[index] = newArrows[index];
                return updatedArrows;
              });
            },
            i * Rows + j // Durée de l'animation
          );
        }
      }
    }
    setTimeout(() => {
      callAlgorithm(response); // Appelle la fonction pour afficher le chemin
    }, Columns * Rows);
  };

  const [bordereds, setBordereds] = useState(Array(Columns * Rows).fill(false)); // Chemin

  /**
   * Affiche le chemin
   * @param {number[][]} response Chemin
   * @returns {void}
   */
  const callAlgorithm = async (response: number[][]): Promise<void> => {
    if (response.length === 0) {
      // Si le chemin est vide, affiche un message d'erreur
      setError(ERROR_MESSAGES.NO_PATH);
    } else if (response) {
      // Si le chemin est défini
      setInProgress(true);
      setError("");
      const updatedColors = [...hexColors];
      let size = 0;

      // Affiche le chemin
      for (let i = 0; i < response.length; i++) {
        setTimeout(() => {
          const index = response[i][0] * Rows + response[i][1];
          if (
            index !== startState.x * Rows + startState.y &&
            index !== endState.x * Rows + endState.y
          ) {
            setBordereds((prev) => {
              const newBordereds = [...prev];
              newBordereds[index] = true;
              return newBordereds;
            });
            const color = updatedColors[index];
            size += COLOR_VALUES[color];
            setResultSize(size);
          }
        }, i * timeForAlgorithm); // Durée de l'animation
      }
      setTimeout(() => {
        setInProgress(false);
        setAlgo(true);
      }, response.length * timeForAlgorithm);
    }
  };

  /**
   * Génère des couleurs aléatoires pour la grille
   * @returns {void}
   */
  const randomColors = (): void => {
    resetAlgo(); // Réinitialise l'algorithme

    // Change les couleurs de chaque hexagone de manière aléatoire
    const newColors = Array(Columns * Rows).fill("");
    const newGrid = Array(Columns * Rows).fill("");
    for (let i = 0; i < Columns * Rows; i++) {
      const randomColor = Math.floor(Math.random() * 5) + 1; // Couleur aléatoire
      newColors[i] = COLORS[randomColor];
      newGrid[i] = COLOR_VALUES[COLORS[randomColor]];
    }

    // Définit le point de départ et d'arrivée aléatoirement
    const newStart = Math.floor(Math.random() * (Columns * Rows));
    let newEnd = Math.floor(Math.random() * (Columns * Rows));
    while (newEnd === newStart) {
      // Vérifie que le point de départ et d'arrivée ne sont pas les mêmes
      newEnd = Math.floor(Math.random() * (Columns * Rows));
    }

    setStartState({ x: Math.floor(newStart / Rows), y: newStart % Rows });
    newColors[newStart] = COLORS[6];
    newGrid[newStart] = COLOR_VALUES.start;

    setEndState({ x: Math.floor(newEnd / Rows), y: newEnd % Rows });
    newColors[newEnd] = COLORS[7];
    newGrid[newEnd] = COLOR_VALUES.end;

    setHexColors(newColors);
    setGrid(newGrid);
  };

  const [arrows, setArrows] = useState([] as string[][]);

  return (
    <>
      <Link
        href="/"
        variant="plain"
        underline="none"
        sx={{ margin: "1rem", position: "absolute" }}
      >
        Retour à l&rsquo;accueil
      </Link>
      <Box display="flex" flexDirection={"column"} alignItems={"center"}>
        <Logo />
      </Box>
      <Grid2 container spacing={2}>
        <Grid2 size={isMediumScreen ? 12 : 3}>
          <Space direction="vertical" space={"30px"}>
            <Box display="flex" flexDirection={"column"} alignItems={"center"}>
              <Typography level="h2" sx={{ mb: 2 }}>
                Outils
              </Typography>
            </Box>
            <Box display="flex" flexDirection={"column"} alignItems={"center"}>
              <Tooltip
                title={TOOLTIPS.RANDOM_COLORS}
                arrow
                placement="right"
                variant="outlined"
              >
                <Button
                  color="warning"
                  variant="outlined"
                  onClick={randomColors}
                  sx={{ marginBottom: "1rem" }}
                >
                  Aléatoire
                </Button>
              </Tooltip>

              <Button
                color="danger"
                variant="outlined"
                onClick={resetColors}
                startDecorator={<CrossIcon color="#C41C1C" />}
                sx={{
                  "--Button-gap": "20px",
                  justifyContent: "left",
                }}
              >
                Réinitialiser
              </Button>
            </Box>
            <Box display="flex" flexDirection={"column"} alignItems={"center"}>
              <ButtonGroup
                orientation="vertical"
                variant="outlined"
                size={
                  isSmallScreen
                    ? "sm"
                    : isMediumScreen || isMediumLargeScreen
                      ? "md"
                      : "lg"
                }
              >
                {[
                  {
                    color: "neutral" as const,
                    label: "Gomme",
                    tooltip: "Efface la couleur de l'hexagone séléctionné",
                    onClick: () => handleOnActionButtons(1),
                    startDecorator: <EraserIcon color="#121212" />,
                  },
                  {
                    color: "neutral" as const,
                    label: "Murs",
                    tooltip: "Empêche le passage",
                    onClick: () => handleOnActionButtons(2),
                    startDecorator: <WallIcon color="#121212" />,
                  },

                  {
                    color: "primary" as const,
                    label: "Eau",
                    tooltip: "Ralenti, ajoute 5 points au chemin",
                    onClick: () => handleOnActionButtons(3),
                    startDecorator: <WaterIcon color="#0B6BCB" />,
                  },
                  {
                    color: "success" as const,
                    label: "Herbe",
                    tooltip: "Ralenti, ajoute 3 point au chemin",
                    onClick: () => handleOnActionButtons(4),
                    startDecorator: <HerbIcon color="#1F7A1F" />,
                  },
                  {
                    color: "primary" as const,
                    label: "Glace",
                    tooltip: "Accelère, enlève 1 point au chemin",
                    onClick: () => handleOnActionButtons(5),
                    startDecorator: <IceIcon color="#0B6BCB" />,
                  },
                ].map((buttonProps, index) => (
                  <Tooltip
                    title={buttonProps.tooltip ? buttonProps.tooltip : ""}
                    arrow
                    placement="right"
                    variant="outlined"
                    key={index + 1}
                  >
                    <Button
                      key={index + 1}
                      color={buttonProps.color}
                      variant={activeButton === index + 1 ? "soft" : "outlined"}
                      onClick={buttonProps.onClick}
                      startDecorator={buttonProps.startDecorator}
                      sx={{
                        "--Button-gap": "20px",
                        justifyContent: "left",
                      }}
                    >
                      {buttonProps.label}
                    </Button>
                  </Tooltip>
                ))}
              </ButtonGroup>
            </Box>
            <Box display="flex" flexDirection={"column"} alignItems={"center"}>
              <ButtonGroup
                orientation="vertical"
                variant="outlined"
                size={
                  isSmallScreen
                    ? "sm"
                    : isMediumScreen || isMediumLargeScreen
                      ? "md"
                      : "lg"
                }
              >
                {[
                  {
                    color: "warning" as const,
                    label: "Départ",
                    tooltip: "Place le point de départ",
                    variant: "soft",
                    onClick: () => handleOnActionButtons(6),
                    startDecorator: <HouseIcon color="#e6c850" />,
                  },
                  {
                    color: "danger" as const,
                    label: "Objectif",
                    tooltip: "Place le point d'arrivée",
                    onClick: () => handleOnActionButtons(7),
                    startDecorator: <FlagIcon color="#7D1212" />,
                  },
                ].map((buttonProps, index) => (
                  <Tooltip
                    title={buttonProps.tooltip ? buttonProps.tooltip : ""}
                    arrow
                    placement="right"
                    variant="outlined"
                    key={index + 6}
                  >
                    <Button
                      key={index + 6}
                      color={buttonProps.color}
                      variant={activeButton === index + 6 ? "soft" : "outlined"}
                      onClick={buttonProps.onClick}
                      startDecorator={buttonProps.startDecorator}
                      sx={{
                        "--Button-gap": "20px",
                        justifyContent: "left",
                      }}
                    >
                      {buttonProps.label}
                    </Button>
                  </Tooltip>
                ))}
              </ButtonGroup>
            </Box>
          </Space>
        </Grid2>
        <Grid2 size={isMediumScreen ? 12 : 6} zIndex={10}>
          {/* Grille principale */}
          <Box display="flex" flexDirection={"column"} alignItems={"center"}>
            <Typography level="h2" sx={{ mb: 2 }}>
              Grille
            </Typography>
            <Alert
              color="warning"
              startDecorator={<WarningIcon color="currentColor" />}
              size="sm"
              sx={{ margin: "1rem" }}
            >
              {ALERTS.CHANGE_SIZE_ALERT}
            </Alert>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-evenly"}
            gap={"20px"}
          >
            <Tooltip
              title={TOOLTIPS.NO_ALGORITHM_CHANGE_SIZE}
              arrow
              placement="top"
              variant="outlined"
              disableHoverListener={!(inProgress || algo)}
            >
              <Typography level="h3">Lignes</Typography>
            </Tooltip>
            <Tooltip
              title={TOOLTIPS.NO_ALGORITHM_CHANGE_SIZE}
              arrow
              placement="top"
              variant="outlined"
              disableHoverListener={!(inProgress || algo)}
            >
              <Typography level="h3">Colonnes</Typography>
            </Tooltip>
          </Box>

          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={"20px"}
            marginBottom={"20px"}
            paddingLeft={"5rem"}
            paddingRight={"5rem"}
          >
            <Slider
              disabled={inProgress || algo}
              defaultValue={20}
              step={1}
              min={2}
              max={40}
              valueLabelDisplay="auto"
              onChange={(event, newValue) => {
                setRows(newValue as number); // Mise à jour de l'état des lignes
              }}
              onChangeCommitted={() => {
                resetColors(); // Réinitialise la grille avec le nouveau nombre de lignes
              }}
            />
            <Slider
              disabled={inProgress || algo}
              defaultValue={20}
              step={1}
              valueLabelDisplay="auto"
              min={2}
              max={25}
              onChange={(event, newValue) => {
                setColumns(newValue as number); // Mise à jour de l'état des colonnes
              }}
              onChangeCommitted={() => {
                resetColors(); // Réinitialise la grille avec le nouveau nombre de colonnes
              }}
            />
          </Box>
          <Box
            display="flex"
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {error && (
              <Box
                display="flex"
                flexDirection={"column"}
                marginBottom={"2rem"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={"20px"}
              >
                <Alert
                  color="danger"
                  size="sm"
                  startDecorator={<CrossIcon color="currentColor" />}
                >
                  {error}
                </Alert>
                {error == ERROR_MESSAGES.RESET_ALGO && algo && (
                  <Button onClick={resetAlgo} color="danger" variant="soft">
                    Réinitialiser
                  </Button>
                )}
              </Box>
            )}

            <Box display="flex" flexDirection="row" className="no-select">
              {[...Array(Columns)].map((_, colIndex) => (
                <div
                  key={colIndex}
                  style={
                    colIndex % 2 !== 1
                      ? {
                          marginTop: `${size * 0.45}px`,
                          marginLeft: `${-size * 0.2}px`,
                          marginRight: `${-size * 0.2}px`,
                        }
                      : {}
                  }
                >
                  {[...Array(Rows)].map((_, rowIndex) => {
                    const index = colIndex * Rows + rowIndex; // Calcul de l'index unique pour chaque hexagone
                    return (
                      <React.Fragment key={index}>
                        <Hexa
                          size={size}
                          color={hexColors[index]} // Passe la couleur actuelle
                          onMouseDown={() => handleHexClick(index, activeColor)} // Gestion du clic
                          onMouseEnter={
                            () => handleMouseEnter(index, activeColor) // Gestion du survol
                          }
                          className="no-select"
                          arrows={arrows[index]}
                          bordered={bordereds[index]}
                        />
                        <br />
                      </React.Fragment>
                    );
                  })}
                </div>
              ))}
            </Box>
          </Box>
        </Grid2>
        <Grid2 size={isMediumScreen ? 12 : 3}>
          <Box display="flex" flexDirection={"column"} alignItems={"center"}>
            <Typography level="h2" sx={{ mb: 2 }}>
              Algorithmes
            </Typography>
            <Tooltip
              title={TOOLTIPS.RESET_ALGO}
              arrow
              placement="left"
              variant="outlined"
            >
              <Button
                onClick={resetAlgo}
                color="danger"
                variant="outlined"
                size="lg"
                sx={{ marginBottom: "1rem" }}
              >
                {ALGORITHM_LABELS.RESET}
              </Button>
            </Tooltip>
            <ButtonGroup orientation="vertical" size="lg" variant="outlined">
              {[
                {
                  color: "neutral" as const,
                  label: ALGORITHM_LABELS.DIJKSTRA,
                  tooltip: TOOLTIPS.DIJKSTRA,
                  slug: ALGORITHM_PATHS.DIJKSTRA,
                  onClick: () =>
                    setActiveAlgorithmIntermediary(ALGORITHM_PATHS.DIJKSTRA),
                },
                {
                  color: "neutral" as const,
                  label: ALGORITHM_LABELS.ASTAR,
                  tooltip: TOOLTIPS.ASTAR,
                  slug: ALGORITHM_PATHS.ASTAR,
                  onClick: () =>
                    setActiveAlgorithmIntermediary(ALGORITHM_PATHS.ASTAR),
                },
                {
                  color: "neutral" as const,
                  label: ALGORITHM_LABELS.BELLMAN_FORD,
                  tooltip: TOOLTIPS.BELLMAN_FORD,
                  slug: ALGORITHM_PATHS.BELLMAN_FORD,
                  onClick: () =>
                    setActiveAlgorithmIntermediary(
                      ALGORITHM_PATHS.BELLMAN_FORD
                    ),
                },
                {
                  color: "neutral" as const,
                  label: ALGORITHM_LABELS.DFS,
                  tooltip: TOOLTIPS.DFS,
                  slug: ALGORITHM_PATHS.DFS,
                  onClick: () =>
                    setActiveAlgorithmIntermediary(ALGORITHM_PATHS.DFS),
                },
                {
                  color: "neutral" as const,
                  label: ALGORITHM_LABELS.BFS,
                  tooltip: TOOLTIPS.BFS,
                  slug: ALGORITHM_PATHS.BFS,
                  onClick: () =>
                    setActiveAlgorithmIntermediary(ALGORITHM_PATHS.BFS),
                },
              ].map((buttonProps, index) => (
                <Tooltip
                  title={buttonProps.tooltip ? buttonProps.tooltip : ""}
                  arrow
                  placement="left"
                  variant="outlined"
                  key={"tooltip_" + index}
                >
                  <Button
                    key={index}
                    color={buttonProps.color}
                    variant={
                      activeAlgorithm === buttonProps.slug ? "soft" : "outlined"
                    }
                    onClick={buttonProps.onClick}
                  >
                    {buttonProps.label}
                  </Button>
                </Tooltip>
              ))}
            </ButtonGroup>
            <Button
              onClick={startAlgo}
              color="neutral"
              variant="outlined"
              size="lg"
              sx={{ marginTop: "1rem" }}
            >
              {BUTTONS.START}
            </Button>
            {resultSize > 0 && (
              <Box
                display="flex"
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Typography level="h3" sx={{ mt: 2 }}>
                  {resultSize}
                </Typography>
              </Box>
            )}
          </Box>
        </Grid2>
      </Grid2>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection={"column"}
      >
        <Alert
          color="neutral"
          startDecorator={<InfoIcon color="currentColor" />}
          size="sm"
          sx={{ margin: "1rem" }}
        >
          <Typography fontSize="sm" padding={"1rem"}>
            Pour placer le point de départ et d&rsquo;arrivée, cliquez sur les
            boutons correspondants puis sur l&rsquo;hexagone de votre choix.
            <br />
            L&rsquo;objectif est de trouver le chemin le plus court entre ces
            deux points. <br />
            Vous pouvez également personnaliser la grille en ajoutant des
            obstacles et des bonus/malus.
            <br />
            <br />
            Légende des couleurs :<br />
            <Hexa size={20} color={COLORS[1]} /> : Chemin par défaut, 2 points{" "}
            <br />
            <Hexa size={20} color={COLORS[2]} /> : Mur, impossible de passer
            <br />
            <Hexa size={20} color={COLORS[3]} /> : Eau, 5 points
            <br />
            <Hexa size={20} color={COLORS[4]} /> : Herbe, 3 points
            <br />
            <Hexa size={20} color={COLORS[5]} /> : Glace, 1 point
            <br />
            <Hexa size={20} color={COLORS[6]} /> : Départ
            <br />
            <Hexa size={20} color={COLORS[7]} /> : Arrivée
          </Typography>
        </Alert>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="10vh"
        width="100vw"
        style={{ background: "#fff", opacity: 0.8 }}
      >
        <Typography style={{ color: "black", fontSize: "1rem" }}>
          © Tous droits réservés : BARKER, OUALI, OUVRARD, RUBIO, GRAVIER
        </Typography>
      </Box>
    </>
  );
}
