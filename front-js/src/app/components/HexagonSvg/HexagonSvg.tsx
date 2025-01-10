import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const HexagonSvg: React.FC = () => {
  const linesRef = useRef<SVGPathElement[]>([]); // Références pour toutes les lignes
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Mettre à jour les dimensions à chaque redimensionnement de l'écran
  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const animateLines = () => {
      linesRef.current.forEach((line) => {
        if (line) {
          const pathLength = line.getTotalLength();

          // Animation GSAP pour chaque ligne
          gsap.fromTo(
            line,
            {
              strokeDasharray: pathLength,
              strokeDashoffset: pathLength,
              attr: { stroke: "#00FF00" }, // Couleur initiale
            },
            {
              strokeDasharray: pathLength,
              strokeDashoffset: -pathLength, // Déplace complètement la ligne vers la gauche
              duration: Math.random() * 20 + 10, // Durée aléatoire initiale
              delay: Math.random() * 30, // Délai de départ aléatoire
              ease: "linear",
              repeat: -1, // Répétition infinie
              attr: { stroke: "#FF0000" }, // Nouvelle couleur à chaque cycle
              onRepeat: () => {
                // Recalculer la couleur
                line.setAttribute("d", generateHexagonPath());

                // Générer une nouvelle durée et l'appliquer à l'animation
                const newDuration = Math.random() * 20 + 10;
                gsap.set(line, { duration: newDuration }); // Modifier la durée de l'animation

                // Mettre à jour la couleur
                line.setAttribute(
                  "stroke",
                  `hsl(${Math.random() * 360}, 80%, 60%)`,
                );
              },
            },
          );
        }
      });
    };

    animateLines();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dimensions]); // Réanime les lignes lorsque l'écran change de dimensions

  // Fonction pour générer un chemin aléatoire dans les hexagones
  const generateHexagonPath = () => {
    const hexWidth = 50; // Largeur d'un hexagone
    const hexHeight = 43.4; // Hauteur d'un hexagone
    let path = `M 0 ${Math.random() * dimensions.height}`; // Début du chemin
    let currentX = 0;
    let currentY = Math.random() * dimensions.height;

    while (currentX < dimensions.width) {
      const direction = Math.random() > 0.5 ? 1 : -1; // Haut ou bas
      currentX += hexWidth; // Avancer d'un hexagone
      currentY += direction * hexHeight * 0.5;

      // Garder la ligne dans les limites de l'écran
      currentY = Math.max(0, Math.min(currentY, dimensions.height));

      path += ` L ${currentX} ${currentY}`; // Ajouter un point au chemin
    }

    return path;
  };

  // Générer plusieurs chemins aléatoires
  const numberOfLines = 10; // Nombre de lignes (modifiable)
  const lines = Array.from({ length: numberOfLines }, () =>
    generateHexagonPath(),
  );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="100vw"
      height="100vh"
      style={{
        backgroundColor: "rgba(125,155,132,0)",
        position: "absolute",
        top: 0,
        left: 0,
        filter: "blur(8px)", // Laisser le flou
        zIndex: 1,
      }}
    >
      <defs>
        <linearGradient
          id="opacityGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="62%"
            style={{
              stopColor: `hsl(${Math.random() * 360}, 80%, 60%)`,
              stopOpacity: 0,
            }}
          />
          <stop
            offset="100%"
            style={{
              stopColor: `hsl(${Math.random() * 360}, 80%, 60%)`,
              stopOpacity: 1,
            }}
          />
        </linearGradient>
      </defs>
      {/* Dégradé */}
      <defs>
        <linearGradient id="fadeLeft" x1="1" y1="0" x2="0" y2="0">
          <stop offset="62%" stopOpacity="0" />
          <stop offset="100%" stopOpacity="1" />
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
              fill: "rgb(125,155,132,0)",
              strokeWidth: 2,
              stroke: "#ffAAAA",
            }}
          />
          <use xlinkHref="#hex" x="25" />
          <use xlinkHref="#hex" x="-25" />
          <use xlinkHref="#hex" x="12.5" y="-21.7" />
          <use xlinkHref="#hex" x="-12.5" y="-21.7" />
        </pattern>
      </defs>

      {/* Fond hexagonal */}
      <rect
        width="100%"
        height="100%"
        fill="url(#hexagons)"
        filter="url(#blurFilter)"
      />

      {/* Dégradé */}
      <rect width="100%" height="100%" fill="url(#fadeLeft)" />

      {/* Lignes dynamiques */}
      {lines.map((path, index) => (
        <path
          key={index}
          ref={(el) => {
            if (el) {
              linesRef.current[index] = el;
            }
          }} // Stocker chaque ligne
          d={path} // Chemin généré
          strokeWidth="7" // Épaisseur légèrement augmentée
          fill="none"
          style={{
            mask: "url(#fadeLeft)", // Applique le dégradé à la ligne
          }}
        />
      ))}
    </svg>
  );
};

export default HexagonSvg;
