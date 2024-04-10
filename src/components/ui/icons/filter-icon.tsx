import { SVGProps } from "react";

export const FilterIcon = ({ fill, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M18.5 2h-13A2.503 2.503 0 003 4.5v2.086c0 .526.213 1.042.586 1.414l5.121 5.121c.186.187.293.444.293.707V21a1.001 1.001 0 001.6.8l4-3a.998.998 0 00.4-.8v-4.172c0-.263.107-.521.293-.707L20.414 8A2.01 2.01 0 0021 6.586V4.5C21 3.121 19.878 2 18.5 2zm-13 2h13a.5.5 0 01.5.5V6H5V4.5a.5.5 0 01.5-.5zm8.379 7.707A2.978 2.978 0 0013 13.828V17.5L11 19v-5.172c0-.801-.312-1.555-.879-2.121L6.414 8h11.172l-3.707 3.707z"
      ></path>
    </svg>
  );
};
