import React from "react";

interface SpanLineProps {
  width: string;
}

const SpanLine = ({ width }: SpanLineProps) => {
  return (
    <span className={`m-auto block w-${width} border-t-[.5px] border-t-gray-500`}></span>
  );
};

export default SpanLine;
