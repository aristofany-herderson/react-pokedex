import { SVGProps } from "react";

export const PoisonIcon = ({ fill, ...props }: SVGProps<SVGSVGElement>) => {
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
        d="M427.821 393.449C479.524 352.108 512 292.376 512 225.95 512 101.161 397.385 0 256 0S0 101.161 0 225.95c0 64.028 30.174 121.836 78.655 162.951-2.938 10.145-4.55 21.18-4.55 32.719 0 49.915 30.162 90.38 67.369 90.38 24.176 0 45.378-17.085 57.263-42.746C210.622 494.915 231.824 512 256 512c22.038 0 41.604-14.196 53.895-36.143C322.186 497.804 341.752 512 363.789 512c37.207 0 67.369-40.465 67.369-90.38 0-9.836-1.172-19.306-3.337-28.171zm-23.61-163.018c0 63.354-67.865 114.713-151.579 114.713-83.715 0-151.579-51.359-151.579-114.713 0-63.354 67.864-114.713 151.579-114.713 83.714 0 151.579 51.359 151.579 114.713z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
