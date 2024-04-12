import { SVGProps } from "react";

export const ChevronLeftIcon = ({
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
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M17.707 20.293a.999.999 0 11-1.414 1.414l-9-9a.999.999 0 010-1.414l9-9a.999.999 0 111.414 1.414L9.414 12l8.293 8.293z"
      />
    </svg>
  );
};
