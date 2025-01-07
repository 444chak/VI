"use client";

import { Box, Button } from "@mui/joy";

import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import { useRouter } from "next/navigation";

import { BlurGradientBg } from "./modules/BlurGradientBg.module";
import { useEffect } from "react";
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
    new BlurGradientBg({
      dom: "box",
      colors: ["#650101", "#4b0101", "#280606", "#320103"],
      loop: true,
    });
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
      <div style={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Button
            color="primary"
            variant="plain"
            onClick={() => router.push("/home")}
          >
            go to homepage
          </Button>
        </Box>
      </div>
    </CssVarsProvider>
  );
}