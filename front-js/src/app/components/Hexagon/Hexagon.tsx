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
          <path d="M100 20 L90 40 L110 40 Z" fill="darkgreen"></path>
        )}
        {arrows?.includes("bottom") && (
          <path d="M100 180 L90 160 L110 160 Z" fill="darkgreen"></path>
        )}
        {arrows?.includes("top-left") && (
          <path
            d="M30 30 L20 50 L40 50 Z"
            fill="darkgreen"
            transform="rotate(-30 30 30)"
          ></path>
        )}
        {arrows?.includes("top-right") && (
          <path
            d="M170 30 L160 50 L180 50 Z"
            fill="darkgreen"
            transform="rotate(30 170 30)"
          ></path>
        )}
        {arrows?.includes("bottom-right") && (
          <path d="M150 130 L140 150 L160 150 Z" fill="darkgreen"></path>
        )}
        {arrows?.includes("bottom-left") && (
          <path d="M50 130 L40 150 L60 150 Z" fill="darkgreen"></path>
        )}
      </svg>
    </>
  );
}
