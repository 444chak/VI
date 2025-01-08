"use client";

import { Box, Button } from "@mui/joy";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import { BlurGradientBg } from "./modules/BlurGradientBg.module";
import { useEffect } from "react";
import HexagonSvg from "./components/HexagonSvg/HexagonSvg";
import Logo from "./components/Logo/Logo";
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

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
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
      />
      <div>
        <HexagonSvg />
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
          height="10vh"
        >
          <div className="logo"
            style={{
              background: "#E0E0E0",
              width: "100vw",
              display: "flex",
              justifyContent: "center",
              borderBottom: "3px solid #000",
            }}
          >
            <Logo />
          </div>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="90vh"
        >
          <Button color="danger" variant="solid" size="lg" component="a" href="/home">Débuter</Button>
        </Box>
      </div>
    </CssVarsProvider>
  );
}