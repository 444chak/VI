import React from "react";
import { Typography, Box } from "@mui/joy";
import Hexa from "../components/hexa/Hexa";
import { Grid2 } from "@mui/material";

export default function Home() {
  return (
    <Box>
      <Typography>Home</Typography>
      <Grid2
        container
        justifyContent="center"
        // rowSpacing={0}
        // columnGap={0}
        // rowGap={0}
      >
        <Grid2 size={1} spacing={0}>
          <Hexa size={64} />
          <Hexa />
          <Hexa />
          <Hexa />
          <Hexa />
          <Hexa />
        </Grid2>
        <Grid2 size={1} spacing={0} sx={{ mt: "2rem" }}>
          <Hexa />
          <Hexa />
          <Hexa />
          <Hexa />
          <Hexa />
          <Hexa />
        </Grid2>
        <Grid2 size={1} spacing={0}>
          <Hexa />
          <Hexa />
          <Hexa />
          <Hexa />
          <Hexa />
          <Hexa />
        </Grid2>
      </Grid2>
    </Box>
  );
}
