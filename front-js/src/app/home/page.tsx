"use client";

import React, { useEffect, useState } from "react";
import { Typography, Box, Button, ButtonGroup, Tooltip } from "@mui/joy";
import Hexa from "../components/Hexagon/Hexagon";
import { Grid2 } from "@mui/material";
import EraserIcon from "../components/icons/Eraser";
import CrossIcon from "../components/icons/Cross";
import WaterIcon from "../components/icons/Water";
import IceIcon from "../components/icons/Ice";
import HerbIcon from "../components/icons/Herb";
import WallIcon from "../components/icons/Wall";
import Space from "../components/Space/Space";
import useMediaQuery from "@mui/material/useMediaQuery";
import Logo from "../components/Logo";

export default function Home() {
  const numberColumns = 20;
  const numberRows = 16;
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

  const [grid, setGrid] = useState(Array(numberColumns * numberRows).fill(2));

  const colors: { [key: number]: string } = {
    1: "",
    2: "black",
    3: "blue",
    4: "green",
    5: "lightblue",
  };

  const colorValues: { [key: string]: number } = {
    "": 2,
    black: -1,
    blue: 5,
    green: 3,
    lightblue: 1,
  };

  // Gestion de l'état des couleurs pour chaque hexagone
  const [hexColors, setHexColors] = useState(
    Array(numberColumns * numberRows).fill("") // Init with empty colors
  );

  // Réinitialise toutes les couleurs
  const resetColors = () => {
    setHexColors(Array(numberColumns * numberRows).fill(""));
    setGrid(Array(numberColumns * numberRows).fill(2));
  };

  // Change la couleur d'un hexagone au clic
  const handleHexClick = (index: number, color: string) => {
    if (activeButton !== 0) {
      const newColors = [...hexColors];
      newColors[index] = color;
      setHexColors(newColors);
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        newGrid[index] = colorValues[color];
        return newGrid;
      });
    }
  };

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

  return (
    <>
      {grid.map((value, index) => {
        return index % numberRows === 0
          ? `[${value},`
          : index % numberRows === numberRows - 1
          ? `${value}],`
          : `${value},`;
      })}
      <Box display="flex" flexDirection={"column"} alignItems={"center"}>
        <Typography level="h1" sx={{ mt: 3, mb: 2 }}>
          <Logo />
        </Typography>
      </Box>
      <Grid2 container spacing={2}>
        <Grid2 size={isMediumScreen ? 12 : 3}>
          <Box display="flex" flexDirection={"column"} alignItems={"center"}>
            <Typography level="h2" sx={{ mb: 2 }}>
              Outils
            </Typography>
            {/*
                TODO : Each child of a grid should have a unique key prop.
            */}
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
                  color: "danger" as const,
                  label: "Réinitialiser",
                  tooltip: "Réinitialise tous les hexagones",
                  onClick: resetColors,
                  variant: "soft",
                  startDecorator: <CrossIcon color="#C41C1C" />,
                },
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
                  key={index}
                >
                  <Button
                    key={index}
                    color={buttonProps.color}
                    variant={
                      index === 0
                        ? "outlined"
                        : activeButton === index
                        ? "soft"
                        : "outlined"
                    }
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
            <Space direction="vertical" space="60px">
              <Tooltip
                title="Les hexagones par défauts ont un poid de 2 points"
                variant="soft"
                placement="bottom"
              >
                <Typography>Infos *</Typography>
              </Tooltip>
            </Space>
          </Box>
        </Grid2>
        <Grid2 size={isMediumScreen ? 12 : 6}>
          {/* Grille principale */}

          <Box
            display="flex"
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography level="h2" sx={{ mb: 2 }}>
              Grille
            </Typography>
            <Box display="flex" flexDirection="row" className="no-select">
              {[...Array(numberColumns)].map((_, colIndex) => (
                <div
                  key={colIndex}
                  style={
                    colIndex % 2 !== 0
                      ? {
                          marginTop: `${size * 0.45}px`,
                          marginLeft: `${-size * 0.2}px`,
                          marginRight: `${-size * 0.2}px`,
                        }
                      : {}
                  }
                >
                  {[...Array(numberRows)].map((_, rowIndex) => {
                    const index = colIndex * numberRows + rowIndex; // Calcul de l'index unique pour chaque hexagone
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
                  label: "Dijkstra",
                  onClick: () => {},
                },
                {
                  color: "neutral" as const,
                  label: "A*",
                  tooltip: "Heuristique de Manhattan",
                  onClick: () => {},
                },
                {
                  color: "neutral" as const,
                  label: "DFS",
                  tooltip: "Parcours en profondeur",
                  onClick: () => {},
                },
                {
                  color: "neutral" as const,
                  label: "BFS",
                  tooltip: "Parcours en largeur",
                  onClick: () => {},
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
