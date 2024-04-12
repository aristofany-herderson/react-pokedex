import { SVGProps } from "react";

export const PsychicIcon = ({
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
        d="M455.925 425.184s-64.56 51.779-193.032 30.352c-97.47-16.257-149.456-123.703-149.456-181.457 0-136.93 101.346-168.091 169.863-168.091 68.516 0 113.213 66.8 113.213 118.52s-36.58 96.958-93.507 96.958c-56.926 0-73.786-39.965-73.786-76.708 0-36.742 29.727-49.687 56.838-49.687s36.394 23.146 36.394 43.039c0 19.894-15.435 27.018-28.309 27.018s-14.147-6.495-19.074-13.321c-4.928-6.825 6.284-32.661-12.176-32.661s-21.901 29.701-21.901 29.701 6.73 57.333 62.014 56.344c55.285-.99 81.512-43.73 73.89-86.045-7.622-42.316-48.689-87.281-120.763-78.195-72.074 9.086-101.501 81.91-88.53 159.734 12.971 77.825 106.204 122.917 179.509 106.694 73.306-16.223 146.317-69.293 146.317-203.846 0-134.554-116.533-215.433-255.488-202.104C98.986 14.76 12.729 136.242 18.251 282.207c5.52 145.965 144.024 225.462 261.143 229.559 117.119 4.098 188.918-63.699 188.918-63.699s16.147-14.399 9.816-25.643c-6.33-11.244-22.203 2.76-22.203 2.76z"
        clipRule="evenodd"
      />
    </svg>
  );
};
