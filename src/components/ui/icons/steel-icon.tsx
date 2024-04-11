import { SVGProps } from "react";

export const SteelIcon = ({
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
        d="M.051 254.527a.373.373 0 010-.377L128.795 34.184a.374.374 0 01.322-.184h255.177c.133 0 .256.07.323.186l127.332 219.966a.371.371 0 010 .373L384.617 474.244a.374.374 0 01-.323.186H129.117a.374.374 0 01-.322-.184L.051 254.527zm374.566-.312c0 65.488-53.089 118.577-118.577 118.577s-118.577-53.089-118.577-118.577c0-65.489 53.089-118.577 118.577-118.577s118.577 53.088 118.577 118.577z"
        clipRule="evenodd"
      />
    </svg>
  );
};
