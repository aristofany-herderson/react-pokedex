import { SVGProps } from "react";

export const StarIcon = ({
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
        d="M20.934 11.63l-3.114 2.993.735 4.22a1.822 1.822 0 01-.726 1.793 1.872 1.872 0 01-1.973.152L12 18.79l-3.856 1.997a1.874 1.874 0 01-1.973-.152 1.824 1.824 0 01-.726-1.793l.735-4.22-3.114-2.993a1.818 1.818 0 01-.477-1.88 1.842 1.842 0 011.508-1.263l4.31-.618 1.925-3.845A1.852 1.852 0 0112 3c.712 0 1.352.393 1.668 1.024l1.926 3.845 4.31.618A1.842 1.842 0 0121.41 9.75c.216.67.034 1.39-.476 1.88z"
      />
    </svg>
  );
};
