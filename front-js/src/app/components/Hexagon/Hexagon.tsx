import "./style.scss";

interface HexaProps {
  size?: number;
  color?: string; // Couleur actuelle
  onMouseEnter?: () => void; // Fonction appelée au survol
  onMouseDown?: () => void; // Fonction appelée au clic
  className?: string;
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
      </svg>
    </>
  );
}
