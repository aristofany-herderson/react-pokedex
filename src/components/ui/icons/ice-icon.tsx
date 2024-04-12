import { SVGProps } from "react";

export const IceIcon = ({
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
        d="M384.304 39.042l1.575 138.35-120.67 57.927-1.488-130.629 120.583-65.648zM505.269 257.047l-119.455 68.327-119.526-68.435 119.464-62.752 119.517 62.86zM245.04 257.047l-119.455 68.327L6.059 256.939l119.464-62.752 119.517 62.86zM124.243 38.475l123.986 61.406-3.17 133.816-117.066-57.978-3.75-137.244zM387.678 473.525l-123.986-61.406 3.17-133.817 117.066 57.979 3.75 137.244zM128.525 474.77l-1.576-138.35 120.671-57.927 1.488 130.628-120.583 65.649z"
        clipRule="evenodd"
      />
    </svg>
  );
};
