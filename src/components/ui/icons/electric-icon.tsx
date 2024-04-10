import { SVGProps } from "react";

export const ElectricIcon = ({ fill, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      fill="none"
      viewBox="0 0 512 512"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M152.56.584a.44.44 0 01.416-.584h179.829a.44.44 0 01.421.31l82.598 266.861a.44.44 0 01-.421.57H295.684a.22.22 0 00-.211.28l68.662 241.705c.134.469-.481.775-.774.385L96.529 155.267a.44.44 0 01.352-.704h108.655a.22.22 0 00.207-.292L152.56.584z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
