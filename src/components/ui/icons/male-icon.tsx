import { SVGProps } from "react";

export const MaleIcon = ({
  xmlns = "http://www.w3.org/2000/svg",
  width = 24,
  height = 24,
  fill = "none",
  ...props
}: SVGProps<SVGSVGElement>) => {
    return (
    <svg width={width} height={height} fill={fill} viewBox="-7 0 32 32" {...props}>
      <path
        fill="#06486d"
        d="M17.56 8.06c0-.44-.36-.88-.84-.88h-4.6c-.48 0-.84.36-.84.84s.36.84.84.84h2.6l-3.6 3.6a6.82 6.82 0 00-4.24-1.48C3.12 11.06 0 14.14 0 17.94s3.12 6.88 6.88 6.88 6.88-3.08 6.88-6.88c0-1.6-.56-3.04-1.48-4.24l3.6-3.6v2.76c0 .48.36.84.84.84s.84-.36.84-.84v-4.8zM6.88 23.14c-2.88 0-5.2-2.32-5.2-5.2s2.32-5.2 5.2-5.2 5.2 2.32 5.2 5.2-2.32 5.2-5.2 5.2z"
      />
    </svg>
  );
};
