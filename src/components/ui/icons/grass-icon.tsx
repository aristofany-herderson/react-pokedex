import { SVGProps } from "react";

export const GrassIcon = ({ fill, ...props }: SVGProps<SVGSVGElement>) => {
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
        d="M97.412 440.649a236.849 236.849 0 01-5.213-5.056c-90.685-90.684-90.685-237.713 0-328.397 90.684-90.685 379.64-96.752 379.64-96.752s39.442 334.465-51.242 425.149c-80.54 80.54-205.522 89.55-296.005 27.031l72.908-89.471 116.55-25.163-95.139-9.511 60.462-61.562 68.824-15.077-54.422-16.117 54.422-98.176-77.41 86.828-29.893-42.183 10.523 69.648-53.917 60.782-24.993-76.9V347.99z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
