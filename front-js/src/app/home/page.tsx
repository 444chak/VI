"use client";

import React, { useEffect, useState } from "react";
import { Typography, Box, Button } from "@mui/joy";
import Hexa from "../components/hexa/Hexa";

export default function Home() {
  const numberColumns = 20;
  const numberRows = 16;
  const size = 64; // min 64

  // Gestion de l'état des couleurs pour chaque hexagone
  const [hexColors, setHexColors] = useState(
    Array(numberColumns * numberRows).fill("") // Initialisation avec des couleurs vides
  );

  // Réinitialise toutes les couleurs
  const resetColors = () => {
    setHexColors(Array(numberColumns * numberRows).fill(""));
  };

  // Change la couleur d'un hexagone au clic
  const handleHexClick = (index: number) => {
    const newColors = [...hexColors];
    newColors[index] = "blue"; // Définit la couleur bleue pour cet index
    setHexColors(newColors);
  };

  useEffect(() => {
    // Désactiver la sélection du texte pour les éléments
    const noSelectElements = document.querySelectorAll(".no-select");
    noSelectElements.forEach((element) => {
      (element as HTMLElement).style.userSelect = "none";
    });
  }, []);

  return (
    <>
      <Box display="flex" flexDirection="row" className="no-select" gap={2} mb={2}>
        <Typography>Home</Typography>
        <Button color="primary" onClick={resetColors}>
          Reset
        </Button>
      </Box>
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
                    onClick={() => handleHexClick(index)} // Gestion du clic
                  />
                  <br />
                </React.Fragment>
              );
            })}
          </div>
        ))}
      </Box>
    </>
  );
}
