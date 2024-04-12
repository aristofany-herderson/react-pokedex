import { SVGProps } from "react";

export const FlyingIcon = ({
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
        d="M178.712 477.733c75.003 0 139.215-41.685 165.724-100.777.324-.721-106.429 27.743-103.025 17.681 1.52-4.493 66.96-28.399 114.637-56.283 27.403-16.027 40.022-49.954 40.022-49.954s-46.167 22.415-69.506 28.101c-47.032 11.46-88.433 10.226-88.433 9.032 0-2.582 68.745-15.644 164.293-73.869 44.943-27.387 57.15-74.561 57.15-74.561s-49.411 29.432-79.281 39.149c-70.836 23.043-135.478 29.987-135.478 26.869 0-6.676 56.887-22.319 117.201-51.544 31.36-15.195 58.519-35.047 89.992-57.124C503.506 98.332 511.999 34 511.999 34s-50.792 32.76-75.579 43.64c-102.279 44.891-192.591 68.439-257.708 73.537C80.416 158.873 0 227.456 0 316.501c0 89.046 80.012 161.232 178.712 161.232z"
        clipRule="evenodd"
      />
    </svg>
  );
};
