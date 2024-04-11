import { SVGProps } from "react";

export const BugIcon = ({
  xmlns = "http://www.w3.org/2000/svg",
  width = 24,
  height = 24,
  fill = "none",
  ...props
}: SVGProps<SVGSVGElement>) => {
    return (
    <svg width={width} height={height} fill={fill} viewBox="0 0 512 512" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M342.198.501a1.176 1.176 0 011.637-.288l36.354 25.455c.532.372.661 1.105.289 1.637l-50.599 72.262c24.599 7.859 41.358 16.336 41.358 16.336s-40.964 70.462-110.443 70.462-118.85-65.672-118.85-65.672 17.506-11.172 43.456-20.754l-55.5-66.141a1.176 1.176 0 01.145-1.656l33.997-28.527a1.175 1.175 0 011.656.145l70.272 83.746c6.017-.68 12.147-1.06 18.333-1.06 8.891 0 17.771.675 26.44 1.822zm13.746 189.201c18.541-13.242 46.597-47.804 46.597-47.804s71.664 56.79 71.664 177.206c0 120.415-123.896 192.888-123.896 192.888s-59.195-59.781-73.727-135.562c-14.531-75.781 21.496-159.927 21.496-159.927s39.324-13.559 57.866-26.801zm-199.683 0c-18.541-13.242-46.597-47.804-46.597-47.804S38 198.688 38 319.104c0 120.415 123.896 192.888 123.896 192.888s59.195-59.781 73.727-135.562c14.531-75.781-21.496-159.927-21.496-159.927s-39.324-13.559-57.866-26.801z"
        clipRule="evenodd"
      />
    </svg>
  );
};
