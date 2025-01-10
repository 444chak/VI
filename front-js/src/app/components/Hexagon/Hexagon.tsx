import "./style.scss";

interface HexaProps {
  size?: number;
  color?: string; // Couleur actuelle
  onMouseEnter?: () => void; // Fonction appelée au survol
  onMouseDown?: () => void; // Fonction appelée au clic
  className?: string;
  arrows?: string[];
  bordered?: boolean;
}

const defaultSize = 64;
const defaultColor = "lightgrey";
const arrowColor = "black";

function getSize(size?: number) {
  return size ? size : defaultSize;
}

export default function Hexa({
  size: propSize,
  color: color,
  onMouseEnter,
  onMouseDown,
  className,
  arrows,
  bordered,
}: HexaProps) {
  const size = getSize(propSize);

  // Couleur de remplissage basée sur l'état
  const fillColor = color ? color : defaultColor;

  return (
    <>
      <svg
        className={"hexagon " + className}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width={getSize(size)}
        height={getSize(size * 0.866)}
        viewBox="0 0 200 173.20508075688772"
        fill={fillColor}
        onMouseEnter={onMouseEnter}
        onMouseDown={onMouseDown} // Déclenchement de la fonction au clic
      >
        <path d="M0 86.60254037844386L50 0L150 0L200 86.60254037844386L150 173.20508075688772L50 173.20508075688772Z"></path>
        {bordered && (
          <path
            d="M10 86.60254037844386L55 10L145 10L190 86.60254037844386L145 163.20508075688772L55 163.20508075688772Z"
            stroke="red"
            strokeWidth={7.5}
          ></path>
        )}
        {arrows?.includes("top") && (
          <path d="M100 20 L90 40 L110 40 Z" fill={arrowColor}></path>
        )}
        {arrows?.includes("bottom") && (
          <path d="M100 160 L90 140 L110 140 Z" fill={arrowColor}></path>
        )}
        {arrows?.includes("top-left") && (
          <path d="M 43 41 L 51 59 L 62 46 Z" fill={arrowColor}></path>
        )}
        {arrows?.includes("top-right") && (
          <path d="M 168 54 L 146 57 L 155 72 Z" fill={arrowColor}></path>
        )}
        {arrows?.includes("bottom-right") && (
          <path d="M 146 129 L 135 141 L 156 147 Z" fill={arrowColor}></path>
        )}
        {arrows?.includes("bottom-left") && (
          <path d="M 53 125 L 45 143 L 64 136 Z" fill={arrowColor}></path>
        )}
      </svg>
    </>
  );
}
