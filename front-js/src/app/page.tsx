"use client";

import { Box, Button } from "@mui/joy";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  useEffect(() => {
    const handleResize = () => {
      new BlurGradientBg({
        dom: "box",
        colors: ["#3d1414","#411b1b","#521919","#a30008"],
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
      ></div>
      <div>
        <HexagonSvg/>
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
        <Logo/>
        <Button
          color="primary"
          variant="plain"
          onClick={() => router.push("/home")}
        >
          Débuter
        </Button>
        </Box>
      </div>
    </CssVarsProvider>
  );
}