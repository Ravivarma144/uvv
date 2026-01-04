
"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";

type Accent = "blue" | "green" | "purple" | "gray";

type Props = {
  title: string;
  value: number;
  accent?: Accent;
  bgImage?: string;
  icon?: ReactNode; // 👈 icon fallback
  className?: string;
  href?:string;
  tooltip?:string;
};

const accentStyles: Record<Accent, string> = {
  blue: "border-blue-500 text-blue-700",
  green: "border-green-500 text-green-700",
  purple: "border-purple-500 text-purple-700",
  gray: "border-gray-400 text-gray-800"
};

const accentGradients: Record<Accent, string> = {
  blue: "from-blue-50/70 to-blue-100/90 dark:from-blue-900/40 dark:to-blue-800/70",
  green: "from-green-50/70 to-green-100/90 dark:from-green-900/40 dark:to-green-800/70",
  purple: "from-purple-50/70 to-purple-100/90 dark:from-purple-900/40 dark:to-purple-800/70",
  gray: "from-gray-50/70 to-gray-100/90 dark:from-gray-800/40 dark:to-gray-700/70"
};

export default function StatCard({
  title,
  value,
  accent = "gray",
  bgImage,
  icon,
  className = "",
  href="",
  tooltip=""
}: Props) {

  const router = useRouter();
  return (
    <div
    onClick={(e) => {
        // ripple(e);
        href && router.push(href);
      }}
      className={`
        group
        relative
        overflow-hidden
        rounded-xl
        border-l-4
        shadow-sm
        bg-white dark:bg-gray-900
        ${accentStyles[accent]}
        ${className}
        transition-all duration-300
        hover:shadow-lg
      `}
    >
      {/* 🌈 Accent Gradient Overlay */}
      <div
        className={`
          absolute inset-0
          bg-gradient-to-br
          ${accentGradients[accent]}
          opacity-90
        `}
      />

      {/* 🖼️ Background Image / Animated Shift */}
      {/* {bgImage && (
        <div
          className="
            absolute inset-0
            bg-no-repeat bg-right bg-contain
            opacity-10
            transition-transform duration-[1200ms]
            group-hover:translate-x-2 group-hover:-translate-y-2
          "
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )} */}


        {bgImage && (
    <div
      className="
        absolute inset-0
        bg-no-repeat
        opacity-20
        transition-transform duration-[1200ms]
        group-hover:translate-x-2 group-hover:-translate-y-2
      "
      style={{
        backgroundImage: `url("${bgImage}")`,
        backgroundSize: "contain",
        backgroundPosition: "right center",
      }}
    />
  )}

      {/* 🔳 Icon fallback (when bgImage missing) */}
      {!bgImage && icon && (
        <div className="absolute right-4 top-4 text-5xl opacity-10">
          {icon}
        </div>
      )}

      {/* ✨ Hover Glow */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          opacity-0
          group-hover:opacity-100
          transition-opacity duration-300
          bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.35),transparent_60%)]
        "
      />

      {/* 🔢 Content */}
      <div className="relative z-10 p-6 min-h-[120px] flex flex-col justify-between">
        {/* <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {title}
        </p> */}
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {title}
          </p>
           {tooltip && (
            <span className="text-xs text-gray-400 cursor-help" title={tooltip}>
              ⓘ
            </span>
          )}
        </div>

        <div className="text-3xl font-bold tracking-tight">
          {value}
        </div>
      </div>
    </div>
  );
}



// import { useEffect, useRef, useState } from "react";
// import { ArrowUpRight, ArrowDownRight } from "lucide-react";
// import { useRouter } from "next/navigation";

// type Accent = "blue" | "green" | "purple" | "gray";

// type Props = {
//   title: string;
//   value: number;
//   previousValue?: number; // KPI compare
//   accent?: Accent;
//   bgImage?: string;
//   sparkline?: number[];
//   tooltip?: string;
//   href?: string; // click navigation
//   className?: string;
// };

// const accentMap: Record<Accent, string> = {
//   blue: "border-blue-500 text-blue-700",
//   green: "border-green-500 text-green-700",
//   purple: "border-purple-500 text-purple-700",
//   gray: "border-gray-400 text-gray-800"
// };

// // const accentStyles: Record<Accent, string> = {
// //   blue: "border-blue-500 text-blue-700",
// //   green: "border-green-500 text-green-700",
// //   purple: "border-purple-500 text-purple-700",
// //   gray: "border-gray-400 text-gray-800"
// // };

// const accentGradients: Record<Accent, string> = {
//   blue: "from-blue-50/70 to-blue-100/90 dark:from-blue-900/40 dark:to-blue-800/70",
//   green: "from-green-50/70 to-green-100/90 dark:from-green-900/40 dark:to-green-800/70",
//   purple: "from-purple-50/70 to-purple-100/90 dark:from-purple-900/40 dark:to-purple-800/70",
//   gray: "from-gray-50/70 to-gray-100/90 dark:from-gray-800/40 dark:to-gray-700/70"
// };

// export default function StatCard({
//   title,
//   value,
//   previousValue,
//   accent = "gray",
//   bgImage,
//   sparkline,
//   tooltip,
//   href,
//   className = ""
// }: Props) {
//   const router = useRouter();
//   const [displayValue, setDisplayValue] = useState(0);
//   const cardRef = useRef<HTMLDivElement>(null);

//   /* 🔢 Count-up animation */
//   useEffect(() => {
//     let start = 0;
//     const duration = 600;
//     const step = Math.max(1, Math.floor(value / 30));
//     const timer = setInterval(() => {
//       start += step;
//       if (start >= value) {
//         setDisplayValue(value);
//         clearInterval(timer);
//       } else {
//         setDisplayValue(start);
//       }
//     }, duration / 30);

//     return () => clearInterval(timer);
//   }, [value]);

//   /* 💧 Click ripple */
//   const ripple = (e: React.MouseEvent) => {
//     if (!cardRef.current) return;
//     const circle = document.createElement("span");
//     const diameter = Math.max(
//       cardRef.current.clientWidth,
//       cardRef.current.clientHeight
//     );
//     const radius = diameter / 2;

//     circle.style.width = circle.style.height = `${diameter}px`;
//     circle.style.left = `${e.clientX - cardRef.current.offsetLeft - radius}px`;
//     circle.style.top = `${e.clientY - cardRef.current.offsetTop - radius}px`;
//     circle.className =
//       "absolute rounded-full bg-white/40 animate-ping pointer-events-none";

//     cardRef.current.appendChild(circle);
//     setTimeout(() => circle.remove(), 600);
//   };

//   /* 📈 KPI delta */
//   const delta =
//     previousValue !== undefined ? value - previousValue : null;

//   return (
//     <div
//       ref={cardRef}
//       onClick={(e) => {
//         ripple(e);
//         href && router.push(href);
//       }}
//       className={`
//         relative overflow-hidden cursor-pointer
//         rounded-xl border-l-4 ${accentMap[accent]}
//         bg-white dark:bg-gray-900
//         shadow-sm hover:shadow-lg
//         transition-all duration-300
//         ${className}
//       `}
//     >
//       {/* 🌈 Accent Gradient Overlay */}
//       <div
//         className={`
//           absolute inset-0
//           bg-gradient-to-br
//           ${accentGradients[accent]}
//           opacity-70
//         `}
//       />
//       {/* 🖼️ Background image */}
//       {bgImage && (
//         <div
//           className="absolute inset-0 bg-no-repeat bg-right bg-contain opacity-10"
//           style={{ backgroundImage: `url(${bgImage})` }}
//         />
//       )}

//       {/* 🌫️ Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-br from-white/70 to-white/90 dark:from-gray-900/70 dark:to-gray-800/90" />

//       {/* 🔢 Content */}
//       <div className="relative z-10 p-6 min-h-[130px] flex flex-col justify-between">
//         {/* Title + Tooltip */}
//         <div className="flex items-center gap-2">
//           <p className="text-sm text-gray-600 dark:text-gray-300">
//             {title}
//           </p>
//           {tooltip && (
//             <span className="text-xs text-gray-400 cursor-help" title={tooltip}>
//               ⓘ
//             </span>
//           )}
//         </div>

//         {/* Value */}
//         <div className="flex items-center gap-3">
//           <span className="text-3xl font-bold">
//             {displayValue}
//           </span>

//           {/* KPI Arrow */}
//           {delta !== null && (
//             <span
//               className={`flex items-center text-sm font-medium ${
//                 delta >= 0 ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {delta >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
//               {Math.abs(delta)}
//             </span>
//           )}
//         </div>

//         {/* Sparkline */}
//         {sparkline && (
//           <svg viewBox="0 0 100 30" className="w-full h-8 mt-2">
//             <polyline
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               points={sparkline
//                 .map((v, i) => `${(i / (sparkline.length - 1)) * 100},${30 - v}`)
//                 .join(" ")}
//             />
//           </svg>
//         )}
//       </div>
//     </div>
//   );
// }
