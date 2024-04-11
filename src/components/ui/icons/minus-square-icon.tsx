import { SVGProps } from "react";

export const MinusSquareIcon = ({
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
        d="M15 2.25H9A6.758 6.758 0 002.25 9v6A6.758 6.758 0 009 21.75h6A6.758 6.758 0 0021.75 15V9A6.758 6.758 0 0015 2.25zM20.25 15A5.256 5.256 0 0115 20.25H9A5.256 5.256 0 013.75 15V9A5.256 5.256 0 019 3.75h6A5.256 5.256 0 0120.25 9v6zm-3.5-3a.75.75 0 01-.75.75H8a.75.75 0 010-1.5h8a.75.75 0 01.75.75z"
      />
    </svg>
  );
};
