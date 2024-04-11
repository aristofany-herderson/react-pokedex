import { SVGProps } from "react";

export const ArrowUpIcon = ({
  xmlns = "http://www.w3.org/2000/svg",
  width = 24,
  height = 24,
  fill = "none",
  ...props
}: SVGProps<SVGSVGElement>) => {
    return (
    <svg width={width} height={height} fill={fill} viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M19.707 10.707a.997.997 0 01-1.414 0L13 5.414V21a1 1 0 11-2 0V5.414l-5.293 5.293a.999.999 0 11-1.414-1.414l7-7a.999.999 0 011.414 0l7 7a.999.999 0 010 1.414z"
      />
    </svg>
  );
};
