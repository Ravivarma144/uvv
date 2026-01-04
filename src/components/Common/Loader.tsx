// import React from "react";


// export default function PageLoader({
//   text = "Loading data..."
// }: {
//   text?: string;
// }) {
//   return (
//     // <span
//     //   className={`ml-1.5 h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-t-transparent`}
//     // ></span>


//     <div className="flex items-center justify-center min-h-[60vh]">
//       <div className="flex flex-col items-center gap-4">

//         {/* Spinner */}
//         <div className="h-10 w-10 rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin" />

//         {/* Text */}
//         <p className="text-gray-600 text-base font-medium">
//           {text}
//         </p>

//       </div>
//     </div>
//   );
// }

export default function PageLoader({
  text = "Loading..."
}: {
  text?: string;
}) {
  return (
    <div className="flex flex-1 items-center justify-center py-10">
      <div className="flex flex-col items-center gap-4">

        {/* Spinner */}
        <div className="h-10 w-10 rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin" />

        {/* Text */}
        <p className="text-gray-600 text-base font-medium">
          {text}
        </p>

      </div>
    </div>
  );
}
