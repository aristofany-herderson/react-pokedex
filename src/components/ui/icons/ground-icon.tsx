import { SVGProps } from "react";

export const GroundIcon = ({
  xmlns = "http://www.w3.org/2000/svg",
  width = 24,
  height = 24,
  fill = "none",
  ...props
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={width}
      height={height}
      fill={fill}
      viewBox="0 0 512 512"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M112.764 439.754a.201.201 0 01-.19-.268L243.289 70.134a.202.202 0 01.19-.134h139.542c.085 0 .162.054.19.135l128.776 369.352a.201.201 0 01-.19.267H112.764zM.201 441.199a.2.2 0 01-.188-.271l97.34-259.872a.201.201 0 01.188-.131h84.577c.14 0 .237.139.189.27L88.182 441.067a.201.201 0 01-.189.132H.201z"
        clipRule="evenodd"
      />
    </svg>
  );
};
