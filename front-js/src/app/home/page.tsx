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
import Logo from "../components/Logo";
import InfoIcon from "../components/icons/Info";
import WarningIcon from "../components/icons/Warning";
import { getAlgorithm } from "../api/viApi";
import {
  ALGORITHM_LABELS,
  ERROR_MESSAGES,
  TOOLTIPS,
  VALUE_TO_COLOR,
} from "../dict";

export default function Home() {
  // const Columns = 20;
  // const Rows = 16;
  const [Rows, setRows] = useState(16);
  const [Columns, setColumns] = useState(20);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(max-width:960px)");
  const isMediumLargeScreen = useMediaQuery("(max-width:1280px)");
  const isLargeScreen = useMediaQuery("(max-width:1440px)");
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

  const [grid, setGrid] = useState(Array(Columns * Rows).fill(2));

  const colors: { [key: number]: string } = {
    1: "",
    2: "black",
    3: "blue",
    4: "green",
    5: "lightblue",
    6: "#afafaf",
    7: "#9b1111",
  };

  const colorValues: { [key: string]: number } = {
    "": 2,
    undefined: 2,
    lightgrey: 2,
    black: -1,
    blue: 5,
    green: 3,
    lightblue: 1,
    start: 0,
    end: 0,
  };

  // Gestion de l'état des couleurs pour chaque hexagone
  const [hexColors, setHexColors] = useState(
    Array(Columns * Rows).fill("") // Init with empty colors
  );

  // Réinitialise toutes les couleurs
  const resetColors = () => {
    if (inProgress) {
      setError(ERROR_MESSAGES.ALGO_IN_PROGRESS);
      return;
    }
    setError("");
    setResultSize(0);
    setHexColors(Array(Columns * Rows).fill(""));
    setGrid(Array(Columns * Rows).fill(2));
    setStartState({ x: 0, y: 0 });
    setEndState({ x: Columns - 1, y: Rows - 1 });
    const newColors = [];
    newColors[0] = "#afafaf";
    newColors[Columns * Rows - 1] = "#9b1111";
    setHexColors(newColors);
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[0] = colorValues.start;
      newGrid[Columns * Rows - 1] = colorValues.end;
      return newGrid;
    });
  };

  const resetAlgo = () => {
    if (inProgress) {
      setError(ERROR_MESSAGES.ALGO_IN_PROGRESS);
      return;
    }
    // set colors which are on the grid
    const updatedColors = [...hexColors];
    for (let i = 0; i < Columns * Rows; i++) {
      if (updatedColors[i] === "red") {
        updatedColors[i] = VALUE_TO_COLOR[grid[i]];
      }
    }
    setHexColors(updatedColors);
    setInProgress(false);
    setError("");
    setResultSize(0);
    setAlgo(false);
  };

  const [startState, setStartState] = useState({ x: 0, y: 0 });
  const [endState, setEndState] = useState({
    x: Columns - 1,
    y: Rows - 1,
  });

  // Change la couleur d'un hexagone au clic
  const handleHexClick = (index: number, color: string) => {
    if (activeButton === 6) {
      setStart(index);
    } else if (activeButton === 7) {
      setEnd(index);
    } else if (activeButton !== 0) {
      if (hexColors[index] !== colors[6] && hexColors[index] !== colors[7]) {
        const newColors = [...hexColors];
        newColors[index] = color;
        setHexColors(newColors);
        setGrid((prevGrid) => {
          const newGrid = [...prevGrid];
          newGrid[index] = colorValues[color];
          return newGrid;
        });
      }
    }
  };

  const setStart = (index?: number) => {
    if (index === undefined) {
      index = startState.x * Rows + startState.y;
    }
    const old_start = startState;
    // set new start
    setStartState({ x: Math.floor(index / Rows), y: index % Rows });
    const updatedColors = [...hexColors];
    updatedColors[index] = "#afafaf";
    setHexColors(updatedColors);
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[index] = colorValues.start;
      return newGrid;
    });

    // remove old start
    const old_start_index = old_start.x * Rows + old_start.y;
    if (old_start_index !== index) {
      updatedColors[old_start_index] = "";
      setHexColors(updatedColors);
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        newGrid[old_start_index] = colorValues[""];
        return newGrid;
      });
    }
  };
  const setEnd = (index?: number) => {
    if (index === undefined) {
      index = endState.x * Rows + endState.y;
    }

    const old_end = endState;
    // set new end
    setEndState({ x: Math.floor(index / Rows), y: index % Rows });
    const updatedColors = [...hexColors];

    updatedColors[index] = "#9b1111";
    setHexColors(updatedColors);
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[index] = colorValues.end;
      return newGrid;
    });

    // remove old end
    const old_end_index = old_end.x * Rows + old_end.y;
    if (old_end_index !== index) {
      updatedColors[old_end_index] = "";
      setHexColors(updatedColors);
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        newGrid[old_end_index] = colorValues[""];
        return newGrid;
      });
    }
  };

  useEffect(() => {
    resetColors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Désactiver la sélection du texte pour les éléments
    const noSelectElements = document.querySelectorAll(".no-select");
    noSelectElements.forEach((element) => {
      (element as HTMLElement).style.userSelect = "none";
    });
  }, []);

  const [mouseStatus, setMouseStatus] = useState(false); // false = souris relâchée, true = souris enfoncée
  // vérifier quand le bouton de souris est enfoncé
  useEffect(() => {
    const handleMouseDown = () => {
      setMouseStatus(true);
    };
    window.addEventListener("mousedown", handleMouseDown);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  // vérifier quand le bouton de souris est relâché
  useEffect(() => {
    const handleMouseUp = () => {
      setMouseStatus(false);
    };
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Gestion du survol de la souris
  const handleMouseEnter = (index: number, color: string) => {
    if (mouseStatus) {
      handleHexClick(index, color);
    }
  };

  const [activeButton, setActiveButton] = useState(0);
  const [activeColor, setActiveColor] = useState("");

  const handleOnActionButtons = (index: number) => {
    setActiveButton(activeButton === index ? 0 : index);
    setActiveColor(colors[index]);
  };

  const mapGrid = (grid: number[]) => {
    // row is x, column is y
    const newGrid: number[][] = [];
    for (let i = 0; i < Columns; i++) {
      const row = [];
      for (let j = 0; j < Rows; j++) {
        row.push(grid[i * Rows + j]);
      }
      newGrid.push(row);
    }
    return newGrid;
  };

  const [resultSize, setResultSize] = useState(0);

  const [error, setError] = useState("");

  const [inProgress, setInProgress] = useState(false);

  const timeForAlgorithm = 100;

  const [algo, setAlgo] = useState(false);

  const callAlgorithm = async (name: string) => {
    if (inProgress) {
      setError(ERROR_MESSAGES.ALGO_IN_PROGRESS);
      return;
    }
    if (algo) {
      setError(ERROR_MESSAGES.RESET_ALGO);
      return;
    }
    const gridParam = mapGrid(grid);
    const params = {
      grid: gridParam,
      start: [startState.x, startState.y],
      end: [endState.x, endState.y],
    };
    const response = await getAlgorithm(name, params);
    if (response.length === 0) {
      setError(ERROR_MESSAGES.NO_PATH);
    } else if (response) {
      setInProgress(true);
      setError("");
      const updatedColors = [...hexColors];
      let size = 0;

      for (let i = 0; i < response.length; i++) {
        setTimeout(() => {
          const index = response[i][0] * Rows + response[i][1];
          if (
            index !== startState.x * Rows + startState.y &&
            index !== endState.x * Rows + endState.y
          ) {
            const color = updatedColors[index];
            size += colorValues[color];
            updatedColors[index] = "red";
            setResultSize(size);

            setHexColors([...updatedColors]);
          }
        }, i * timeForAlgorithm);
      }
      setTimeout(() => {
        setInProgress(false);
        setAlgo(true);
      }, response.length * timeForAlgorithm);
    }
  };

  return (
    <>
      <Box display="flex" flexDirection={"column"} alignItems={"center"}>
        <Logo />
        {/* TODO: Changer l'affichage de la taille du chemin */}
        <Typography level="h1" sx={{ mb: 2 }}>
          {resultSize}
        </Typography>
      </Box>
      <Grid2 container spacing={2}>
        <Grid2 size={isMediumScreen ? 12 : 3}>
          <Space direction="vertical" space={"30px"}>
            <Box display="flex" flexDirection={"column"} alignItems={"center"}>
              <Typography level="h2" sx={{ mb: 2 }}>
                Outils
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection={"column"}
              alignItems={"center"}
              paddingLeft={"2rem"}
              paddingRight={"2rem"}
            >
              <Alert
                color="primary"
                startDecorator={<InfoIcon color="currentColor" />}
                size="sm"
              >
                Les hexagones ont un poids de 2 par défaut.
              </Alert>
            </Box>
            <Box display="flex" flexDirection={"column"} alignItems={"center"}>
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
                    color: "success" as const,
                    label: "Départ",
                    tooltip: "Place le point de départ",
                    variant: "soft",
                    onClick: () => handleOnActionButtons(6),
                    startDecorator: <HouseIcon color="#1F7A1F" />,
                  },
                  {
                    color: "warning" as const,
                    label: "Objectif",
                    tooltip: "Place le point d'arrivée",
                    onClick: () => handleOnActionButtons(7),
                    startDecorator: <FlagIcon color="#9A5B13" />,
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
              Changer la taille réinitialise la grille.
            </Alert>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-evenly"}
            gap={"20px"}
          >
            <Typography level="h3">Lignes</Typography>
            <Typography level="h3">Colonnes</Typography>
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
              aria-label="Custom marks"
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
              aria-label="Custom marks"
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
                {error ==
                  "Veuillez d'abord réinitialiser l'algorithme en cours" &&
                  algo && (
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
            <ButtonGroup orientation="vertical" size="lg" variant="outlined">
              {[
                {
                  color: "neutral" as const,
                  label: ALGORITHM_LABELS.DIJKSTRA,
                  tooltip: TOOLTIPS.DIJKSTRA,
                  onClick: () => callAlgorithm("dijskstra"),
                },
                {
                  color: "neutral" as const,
                  label: ALGORITHM_LABELS.ASTAR,
                  tooltip: TOOLTIPS.ASTAR,
                  onClick: () => callAlgorithm("a*"),
                },
                {
                  color: "neutral" as const,
                  label: ALGORITHM_LABELS.DFS,
                  tooltip: TOOLTIPS.DFS,
                  onClick: () => callAlgorithm("dfs"),
                },
                {
                  color: "neutral" as const,
                  label: ALGORITHM_LABELS.BFS,
                  tooltip: TOOLTIPS.BFS,
                  onClick: () => callAlgorithm("bfs"),
                },
                {
                  color: "danger" as const,
                  label: ALGORITHM_LABELS.RESET,
                  tooltip: TOOLTIPS.RESET_ALGO,
                  onClick: resetAlgo,
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
                    variant="outlined"
                    onClick={buttonProps.onClick}
                  >
                    {buttonProps.label}
                  </Button>
                </Tooltip>
              ))}
            </ButtonGroup>
          </Box>
        </Grid2>
      </Grid2>
    </>
  );
}
