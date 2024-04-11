import { SVGProps } from "react";

export const ChevronRightIcon = ({
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
        d="M17.707 12.707l-9 9a.997.997 0 01-1.414 0 .999.999 0 010-1.414L15.586 12 7.293 3.707a.999.999 0 111.414-1.414l9 9a.999.999 0 010 1.414z"
      />
    </svg>
  );
};
