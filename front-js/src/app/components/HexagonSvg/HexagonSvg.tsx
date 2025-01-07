import React from "react";

interface HexagonSvgProps {}

const HexagonSvg: React.FC<HexagonSvgProps> = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="100vw"
    height="100vh"
    style={{
      backgroundColor: 'rgba(125,155,132,0)',
      position: 'absolute',
      top: 0,
      left: 0,
      filter: "blur(5px)", 
    }}
  >
    <defs>

      <linearGradient id="fadeLeft" x1="1" y1="0" x2="0" y2="0">
        <stop offset="60%" stopColor="" stopOpacity="0" />
        <stop offset="100%" stopColor="" stopOpacity="1" />
      </linearGradient>

      <pattern
        id="hexagons"
        width="50"
        height="43.4"
        patternUnits="userSpaceOnUse"
        patternTransform="scale(5) translate(2) rotate(45)"
      >
        <polygon
          points="24.8,22 37.3,29.2 37.3,43.7 24.8,50.9 12.3,43.7 12.3,29.2"
          id="hex"
          style={{
            fill: 'rgb(125,155,132,0)',
            strokeWidth: 2,
            stroke: '#000',
          }}
        />
        <use xlinkHref="#hex" x="25" />
        <use xlinkHref="#hex" x="-25" />
        <use xlinkHref="#hex" x="12.5" y="-21.7" />
        <use xlinkHref="#hex" x="-12.5" y="-21.7" />
      </pattern>
    </defs>

    <rect
      width="100%"
      height="100%"
      fill="url(#hexagons)"
      filter="url(#blurFilter)"
    />

    <rect
      width="100%"
      height="100%"
      fill="url(#fadeLeft)" 
    />
  </svg>
);

export default HexagonSvg;
