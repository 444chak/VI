"use client";

import React, { useEffect } from "react";
import { Typography, Box, Button } from "@mui/joy";
import Hexa from "../components/hexa/Hexa";

export default function Home() {
  const numberColumns = 20;
  const numberRows = 17;
  const size = 64; // min 64

  useEffect(() => {
    // Disable text selection for elements
    // with class "no-select"
    const noSelectElements = document.querySelectorAll(".no-select");
    noSelectElements.forEach((element) => {
      (element as HTMLElement).style.userSelect = "none";
    });
  }, []);

  return (
    <>
      <Box display="flex" flexDirection="row" className="no-select">
        <Typography gridColumn="span 3">Home</Typography>
        <Button color="primary">Reset</Button>
      </Box>
      <Box display="flex" flexDirection="row" className="no-select">

        {[...Array(numberColumns)].map((_, index) => (
          <div
            key={index}
            style={
              index % 2 !== 0
                ? {
                  marginTop: `${size * 0.45}px`,
                  marginLeft: `${-size * 0.2}px`,
                  marginRight: `${-size * 0.2}px`,
                }
                : {}
            }
          >
            {[...Array(numberRows)].map((_, innerIndex) => (
              <React.Fragment key={innerIndex}>
                <Hexa size={size} />
                <br />
              </React.Fragment>
            ))}
          </div>
        ))}
      </Box>
    </>
  );
}
