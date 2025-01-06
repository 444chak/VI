"use client";

import React, { useEffect, useState } from "react";
import { Typography, Box, Button, ButtonGroup } from "@mui/joy";
import Hexa from "../components/Hexagon/Hexagon";
import { Grid2 } from "@mui/material";
import EraserIcon from "../components/icons/Eraser";

export default function Home() {
  const numberColumns = 20;
  const numberRows = 16;
  const size = 64; // min 64

  // Gestion de l'état des couleurs pour chaque hexagone
  const [hexColors, setHexColors] = useState(
    Array(numberColumns * numberRows).fill("") // Init with empty colors
  );

  // Réinitialise toutes les couleurs
  const resetColors = () => {
    setHexColors(Array(numberColumns * numberRows).fill(""));
  };

  // Change la couleur d'un hexagone au clic
  const handleHexClick = (index: number, color: string) => {
    const newColors = [...hexColors];
    newColors[index] = color;
    setHexColors(newColors);
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

  const colors: { [key: number]: string } = {
    1: "",
    2: "black",
    3: "blue",
    4: "green",
    5: "lightblue",
  };

  const handleOnActionButtons = (index: number) => {
    setActiveButton(activeButton === index ? 0 : index);
    setActiveColor(colors[index]);
  };

  return (
    <>
      <Grid2 container spacing={2} sx={{ mt: 10 }}>
        <Grid2 size={3}>
          <Box display="flex" flexDirection={"column"} alignItems={"center"}>
            <ButtonGroup orientation="vertical" size="lg" variant="outlined">
              {[
                {
                  color: "danger" as const,
                  label: "Réinitialiser la grille",
                  onClick: resetColors,
                  variant: "soft",
                },
                {
                  color: "neutral" as const,
                  label: "Gomme",
                  onClick: () => handleOnActionButtons(1),
                  startDecorator: <EraserIcon color="#121212" />,
                },
                {
                  color: "primary" as const,
                  label: "Ajouter des murs",
                  onClick: () => handleOnActionButtons(2),
                },

                {
                  color: "primary" as const,
                  label: "Ajouter de l'eau",
                  onClick: () => handleOnActionButtons(3),
                },
                {
                  color: "success" as const,
                  label: "Ajouter de l'herbe",
                  onClick: () => handleOnActionButtons(4),
                },
                {
                  color: "primary" as const,
                  label: "Ajouter de la glace",
                  onClick: () => handleOnActionButtons(5),
                },
              ].map((buttonProps, index) => (
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
                >
                  {buttonProps.label}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
        </Grid2>
        <Grid2 size={6}>
          {/* Grille principale */}
          <Box
            display="flex"
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
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
        <Grid2 size={3}>
          <Box display="flex" flexDirection={"column"} alignItems={"center"}>
            <Typography>Right</Typography>
          </Box>
        </Grid2>
      </Grid2>
    </>
  );
}
