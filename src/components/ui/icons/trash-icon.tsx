import { SVGProps } from "react";

export const TrashIcon = ({
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
        d="M21 5.249h-3.559a1.25 1.25 0 01-1.186-.854l-.316-.949a1.747 1.747 0 00-1.66-1.196H9.72c-.754 0-1.421.48-1.66 1.197l-.316.948c-.17.511-.647.855-1.186.855H3a.75.75 0 000 1.5h1.298l.767 11.5a3.759 3.759 0 003.742 3.5h6.387a3.76 3.76 0 003.742-3.5l.767-11.5H21a.75.75 0 000-1.501zM9.483 3.92a.25.25 0 01.237-.171h4.559a.25.25 0 01.237.17l.316.949c.044.132.099.259.161.38H9.005c.062-.122.117-.248.161-.38l.317-.948zm7.955 14.229a2.255 2.255 0 01-2.245 2.1H8.806a2.255 2.255 0 01-2.245-2.1l-.76-11.4h.757c.107 0 .212-.013.317-.025.042.007.08.025.124.025h10c.044 0 .082-.018.124-.025.105.012.209.025.317.025h.757l-.759 11.4zm-2.688-7.15v5a.75.75 0 01-1.5 0v-5a.75.75 0 011.5 0zm-4 0v5a.75.75 0 01-1.5 0v-5a.75.75 0 011.5 0z"
      />
    </svg>
  );
};
