import "./style.scss";

type BORDERS = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
  "top",
  "bottom"
];

interface HexaProps {
  size?: number;
  color?: string; // Couleur actuelle
  onMouseEnter?: () => void; // Fonction appelée au survol
  onMouseDown?: () => void; // Fonction appelée au clic
  className?: string;
  borders?: BORDERS[number]; // Liste des bordures
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
  borders,
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
        {borders?.includes("top-left") && (
          <path
            d="M50 0L0 86.60254037844386L50 43.30127018922193L50 0Z"
            fill="none"
            stroke="black"
            strokeWidth="10"
          ></path>
        )}
        {borders?.includes("top-right") && (
          <path
            d="M150 0L200 86.60254037844386L150 43.30127018922193L150 0Z"
            fill="none"
            stroke="black"
            strokeWidth="10"
          ></path>
        )}
        {borders?.includes("bottom-left") && (
          <path
            d="M50 173.20508075688772L0 86.60254037844386L50 129.9038105676658L50 173.20508075688772Z"
            fill="none"
            stroke="black"
            strokeWidth="10"
          ></path>
        )}
        {borders?.includes("bottom-right") && (
          <path
            d="M150 173.20508075688772L200 86.60254037844386L150 129.9038105676658L150 173.20508075688772Z"
            fill="none"
            stroke="black"
            strokeWidth="10"
          ></path>
        )}
        {borders?.includes("top") && (
          <path
            d="M50 0L150 0"
            fill="none"
            stroke="black"
            strokeWidth="10"
          ></path>
        )}
        {borders?.includes("bottom") && (
          <path
            d="M50 173.20508075688772L150 173.20508075688772"
            fill="none"
            stroke="black"
            strokeWidth="10"
          ></path>
        )}
        <path d="M0 86.60254037844386L50 0L150 0L200 86.60254037844386L150 173.20508075688772L50 173.20508075688772Z"></path>
      </svg>
    </>
  );
}
