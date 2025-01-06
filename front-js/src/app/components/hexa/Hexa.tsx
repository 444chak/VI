import "./style.css";

interface HexaProps {
  size?: number;
}

const defaultSize = 64;

function getSize(size?: number) {
  return size ? size : defaultSize;
}

export default function Hexa({ size: propSize }: HexaProps) {
  const size = getSize(propSize);
  return (
    <>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width={getSize(size)}
        height={getSize(size * 0.866)}
        viewBox="0 0 200 173.20508075688772"
      >
        <path
          fill="#000"
          d="M0 86.60254037844386L50 0L150 0L200 86.60254037844386L150 173.20508075688772L50 173.20508075688772Z"
        ></path>
      </svg>
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="115"
        height="100"
        viewBox="0 0 115 100"
        xmlSpace="preserve"
      >
        <desc>Created with Fabric.js 5.2.4</desc>
        <defs></defs>
        <g
          transform="matrix(Infinity NaN NaN Infinity 0 0)"
          id="1374ce00-124f-4471-9b45-a6d745e4d623"
        ></g>
        <g
          transform="matrix(1 0 0 1 57.5 50)"
          id="d3cc2eda-c2f9-4525-a2af-639dffdf1190"
        >
          <rect
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fillRule: "nonzero",
              opacity: 1,
              visibility: "hidden",
            }}
            vectorEffect="non-scaling-stroke"
            x="-57.5"
            y="-50"
            rx="0"
            ry="0"
            width="115"
            height="100"
          />
        </g>
        <g transform="matrix(0.62 0 0 0.62 57.5 50)">
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fillRule: "nonzero",
              opacity: 1,
            }}
            transform=" translate(-92.38, -92.38)"
            d="M 0 92.375 L 46.188 12.375 L 138.566 12.375 L 184.751 92.375 L 138.566 172.375 L 46.188 172.375 L 0 92.375 z"
            strokeLinecap="round"
          />
        </g>
      </svg> */}
    </>
  );
}
