import { SVGProps } from "react";

export const FemaleIcon = ({
  xmlns = "http://www.w3.org/2000/svg",
  width = 24,
  height = 24,
  fill = "none",
  ...props
}: SVGProps<SVGSVGElement>) => {
    return (
    <svg width={width} height={height} fill={fill} viewBox="0 0 24 24" {...props}>
      <path
      fill="none"
        stroke="#de2240"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9 18h6m-3-5v8m0-8a5 5 0 100-10 5 5 0 000 10z"
      />
    </svg>
  );
};
