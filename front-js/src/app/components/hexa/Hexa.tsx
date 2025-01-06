import { useState } from "react";
import "./style.css";

interface HexaProps {
  size?: number;
  color?: string;
}

const defaultSize = 64;

function getSize(size?: number) {
  return size ? size : defaultSize;
}

export default function Hexa({ size: propSize, color: PropColor }: HexaProps) {
  const size = getSize(propSize);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const fillColor = isHovered ? "blue" : PropColor;
  return (
    <>
      <svg
        className="hexagon"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width={getSize(size)}
        height={getSize(size * 0.866)}
        viewBox="0 0 200 173.20508075688772"
        fill={fillColor}
        onMouseEnter={handleMouseEnter}
      >
        <path d="M0 86.60254037844386L50 0L150 0L200 86.60254037844386L150 173.20508075688772L50 173.20508075688772Z"></path>
      </svg>
    </>
  );
}
