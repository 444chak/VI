import React from "react";
import { Typography, Box } from "@mui/joy";
import Hexa from "../components/hexa/Hexa";

export default function Home() {
  const numberColumns = 20;
  const numberRows = 25;
  const size = 64; // min 64
  return (
    <Box display="flex" flexDirection="row">
      <Typography gridColumn="span 3">Home</Typography>
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
  );
}
