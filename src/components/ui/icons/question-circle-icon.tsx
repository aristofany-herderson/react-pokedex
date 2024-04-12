import { SVGProps } from "react";

export const QuestionCircleIcon = ({
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
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm3.938-10.717c.281 1.6-.393 3.032-1.897 4.032-.925.615-1.072.944-1.092 1.004a1 1 0 11-1.896-.639c.304-.9 1.219-1.591 1.88-2.031 1.244-.827 1.086-1.726 1.035-2.02-.138-.787-.81-1.459-1.597-1.597a1.988 1.988 0 00-1.656.435A1.995 1.995 0 0010 9.999a1 1 0 11-2 0c0-1.185.521-2.302 1.429-3.064a4.024 4.024 0 013.288-.873c1.613.284 2.937 1.608 3.221 3.221zM13 17a1 1 0 11-2 0 1 1 0 012 0z"
      />
    </svg>
  );
};
