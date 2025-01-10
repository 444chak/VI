/*
    Space component
*/
"use client";

import React from "react";
import "./Space.scss";

interface SpaceProps {
  children?: React.ReactNode;
  direction?: "horizontal" | "vertical";
  space?: string;
  spaceBetween?: boolean;
  sizes?: string[];
  margin?: {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
  };
}

const Space: React.FC<SpaceProps> = ({
  children,
  space,
  direction,
  margin,
  sizes,
  spaceBetween,
}) => {
  const isHorizontal = direction === "horizontal";
  const marginStyle = isHorizontal
    ? { marginRight: space }
    : { marginBottom: space };

  return (
    <div
      className={`space ${direction} ${spaceBetween ? "space-between" : ""}`}
      style={{
        marginLeft: margin?.left,
        marginRight: margin?.right,
        marginTop: margin?.top,
        marginBottom: margin?.bottom,
      }}
    >
      {React.Children.map(children, (child, index) => (
        <div
          style={{
            flexBasis: sizes ? sizes[index] : "auto",
            ...(index < React.Children.count(children) - 1 ? marginStyle : {}),
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default Space;
