"use client";

import React, { useEffect, useState } from "react";
import { Typography, Box, Button } from "@mui/joy";
import Hexa from "../components/hexa/Hexa";
import Space from "../components/Space/Space";

export default function Home() {
  const numberColumns = 20;
  const numberRows = 16;
  const size = 64; // min 64

  // Gestion de l'état des paramètres de la grille (Algo ou Hexa)
  const [isActive, setIsActive] = useState<"Hexa" | "Algo">("Hexa");

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
      <Space
        direction="horizontal"
        margin={{ top: "50px", left: "20px", right: "20px" }}
        sizes={["50%", "50%"]}
        space="50px"
      >
        {/* Boutons Hexa et Algo */}
        <Box display="flex" flexDirection={"row"} alignItems={"center"} justifyContent={"center"} gap={2}>
          <Button
            color={isActive === "Hexa" ? "primary" : "neutral"}
            onClick={() => setIsActive("Hexa")}
          >
            Hexa
          </Button>
          <Button
            color={isActive === "Algo" ? "primary" : "neutral"}
            onClick={() => setIsActive("Algo")}
          >
            Algo
          </Button>
        </Box>

        {/* Grille paramètre Algo */}
        {isActive === "Algo" && 
        (<>
          <Typography>Algo</Typography>
        </>)
        }

        {/* Grille paramètre Hexa */}
        {isActive === "Hexa" && 
        (<>
          <Typography>Hexa</Typography>
        </>)
        }

        {/* Grille principale */}
        <Box display="flex" flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
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
        </Box>
      </Space>
    </>
  );
}
