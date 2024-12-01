import React from "react";

interface SidebarProps {
  currentStep: number;
}

export function Sidebar({ currentStep }: SidebarProps) {
  const steps = [
    { number: 1, title: "YOUR INFO", subtitle: "STEP 1" },
    { number: 2, title: "SELECT PLAN", subtitle: "STEP 2" },
    { number: 3, title: "ADD-ONS", subtitle: "STEP 3" },
    { number: 4, title: "SUMMARY", subtitle: "STEP 4" },
  ];

  return (
    <div className="relative rounded-lg text-white overflow-hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={274}
        height={568}
        fill="none"
        viewBox="0 0 305 568"
        className="absolute inset-0 z-0 w-full h-full object-cover p-0"
      >
        <rect width={274} height={568} fill="#483EFF" rx={10} />
        <mask
          id="a"
          width={274}
          height={568}
          x={0}
          y={0}
          maskUnits="userSpaceOnUse"
          style={{ maskType: "alpha" }}
        >
          <rect width={274} height={568} fill="#fff" rx={10} />
        </mask>
        <g mask="url(#a)">
          <path
            fill="#6259FF"
            fillRule="evenodd"
            d="M-34.692 543.101C3.247 632.538 168.767 685.017 211.96 612.52c43.194-72.497-66.099-85.653-104.735-160.569-38.635-74.916-68.657-121.674-124.482-104.607-55.824 17.068-55.375 106.32-17.436 195.757Z"
            clipRule="evenodd"
          />
          <path
            fill="#F9818E"
            fillRule="evenodd"
            d="M233.095 601.153c60.679-28.278 92.839-143.526 41.875-171.528-50.965-28.003-57.397 47.579-108.059 75.987-50.662 28.408-82.14 50.207-69.044 88.241 13.096 38.034 74.549 35.578 135.228 7.3Z"
            clipRule="evenodd"
          />
          <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="bevel"
            strokeWidth={5}
            d="m165.305 469.097 10.607-10.806M209.461 474.581l-12.506-10.503M187.56 488.991l-6.908 14.798"
          />
          <path
            fill="#FFAF7E"
            d="M.305 546.891c37.003 0 67-29.997 67-67s-29.997-67-67-67-67 29.997-67 67 29.997 67 67 67Z"
          />
        </g>
      </svg>
      <div className="relative z-10 p-8 gap-7 flex md:flex-col items-center md:items-start justify-center">
        {steps.map((step) => (
          <div
            key={step.number}
            className="flex items-center gap-4 flex-row w-fit"
          >
            <div
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center
                ${
                  currentStep === step.number
                    ? "bg-[#BEE2FD] text-black border-[#BEE2FD]"
                    : "border-white"
                }`}
            >
              {step.number}
            </div>
            <div className="hidden md:block">
              <div className="text-sm text-gray-300">{step.subtitle}</div>
              <div className="font-bold">{step.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
