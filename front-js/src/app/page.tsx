"use client";

import { Box, Button } from "@mui/joy";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import { BlurGradientBg } from "./modules/BlurGradientBg.module";
import Typography from "@mui/joy/Typography";
import { useEffect } from "react";
import HexagonSvg from "./components/HexagonSvg/HexagonSvg";
import Logo from "./components/Logo/Logo";
import Hexagon from "./components/Hexagon/Hexagon";

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {},
      },
    },
  },
});

export default function Home() {
  useEffect(() => {
    const handleResize = () => {
      new BlurGradientBg({
        dom: "box",
        colors: ["#3d1414", "#411b1b", "#521919", "#a30008"],
        loop: true,
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <CssVarsProvider theme={theme}>
      <div
        id="box"
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: -1,
        }}
      >
        <HexagonSvg />
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
          height="10vh"
        >
          <div
            className="logo"
            style={{
              background: "#fff",
              width: "100vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "10vh",
            }}
          >
            <Logo />
          </div>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            style={{
              position: "absolute",
              transform: "translateY(7.5vh)", // Place les hexagones à moitié sur la boîte
            }}
          >
            {Array.from({ length: 30 }).map((_, index) => (
              <Hexagon key={index} color="#fff" />
            ))}
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent="center"
          width="100vw"
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="45vh"
            width="100vw"
          >
            <Button
              color="danger"
              variant="soft"
              size="lg"
              component="a"
              href="/home"
              style={{ fontSize: "2rem" }}
            >
              Commencer
            </Button>
          </Box>
          <Box
            display="flex"
            flexDirection={"column"}
            justifyContent="center"
            alignItems="center"
            height="35vh"
            width="100vw"
            style={{ background: "#fff", position: "relative" }}
          >
            {/* Ligne d'hexagones noirs */}
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
              style={{
                position: "absolute",
                top: 0,
                transform: "translateY(-50%)", // Place les hexagones à moitié sur la boîte
              }}
            >
              {Array.from({ length: 30 }).map((_, index) => (
                <Hexagon key={index} color="#fff" />
              ))}
            </Box>

            {/* Contenu existant */}
            <Typography
              style={{
                color: "black",
                fontSize: "1.5rem",
                padding: "2vw 10vw",
                textAlign: "justify",
              }}
            >
              Découvrez notre application web éducative dédiée à la théorie des
              graphes ! Grâce à une grille hexagonale interactive, vous pouvez
              placer un point de départ, une destination, ainsi que des
              obstacles ou des murs pour explorer le fonctionnement des
              algorithmes comme A*, Dijkstra, ou BFS. Visualisez en temps réel
              leurs calculs et comprenez comment les chemins sont trouvés selon
              vos configurations. Ludique, intuitive et pédagogique, cette
              plateforme est idéale pour apprendre, enseigner ou simplement
              expérimenter avec les concepts fondamentaux des graphes.
            </Typography>
            <Typography
              level="h4"
              style={{ color: "black", fontSize: "1.5rem" }}
            >
              Essayez-la et transformez l’abstrait en concret !
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="10vh"
            width="100vw"
            style={{ background: "#fff" }}
          >
            <Typography style={{ color: "black", fontSize: "1rem" }}>
              © Tous droits réservés : BARKER, OUALI, OUVRARD, RUBIO, GRAVIER
            </Typography>
          </Box>
        </Box>
      </div>
    </CssVarsProvider>
  );
}
