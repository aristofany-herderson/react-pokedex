import { SVGProps } from "react";

export const DarkIcon = ({
  xmlns = "http://www.w3.org/2000/svg",
  width = 24,
  height = 24,
  fill = "none",
  ...props
}: SVGProps<SVGSVGElement>) => {
    return (
    <svg width={width} height={height} fill={fill} viewBox="0 0 512 512" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M229.379 452.85a197.056 197.056 0 0029.833 2.261c108.002 0 195.555-87.553 195.555-195.555C454.767 151.553 367.214 64 259.212 64c-7.246 0-14.401.394-21.442 1.162 53.575 40.589 88.997 110.9 88.997 190.838 0 84.04-39.151 157.44-97.388 196.85zM255.656 512c141.385 0 256-114.615 256-256S397.041 0 255.656 0s-256 114.615-256 256 114.615 256 256 256z"
        clipRule="evenodd"
      />
    </svg>
  );
};
