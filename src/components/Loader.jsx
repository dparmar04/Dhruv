// /* eslint-disable react/prop-types */
// import { useState, useEffect } from "react";

// const Loader = ({ onComplete }) => {
//   const [count, setCount] = useState(0);
//   const [isExiting, setIsExiting] = useState(false);
//   const [hideContent, setHideContent] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCount((prev) => {
//         if (prev < 100) return prev + 1;
//         clearInterval(interval);

//         // Start hiding the content first
//         setTimeout(() => {
//           setHideContent(true);

//           // Then start exit animation
//           setTimeout(() => {
//             setIsExiting(true);

//             // Callback after animation
//             setTimeout(onComplete, 1000);
//           }, 300); // delay before slide
//         }, 300);

//         return prev;
//       });
//     }, 10);

//     return () => clearInterval(interval);
//   }, [onComplete]);

//   return (
//     <div
//       className={`fixed top-0 left-0 w-full h-full dark:bg-white dark:text-black bg-black text-white flex flex-col justify-center items-center text-4xl z-50 transition-transform origin-top duration-[1s] ease-in-out ${isExiting ? "scale-y-0" : "scale-y-100"
//         }`}
//     >
//       {/* Content hides on exit */}
//       <div
//         className={`flex flex-col justify-center items-center transition-opacity duration-300 ${hideContent ? "opacity-0" : "opacity-100"
//           }`}
//       >
//         <div className="mb-4">{count}%</div>

//         <div className="w-[120px] h-2 bg-gray-700 rounded-full overflow-hidden">
//           <div
//             className="h-full bg-white dark:bg-black transition-all duration-200"
//             style={{ width: `${count}%` }}
//           ></div>
//         </div>
//       </div>
//       <p className="text-whie dark:text-black text-sm">Loading greatness</p>
//     </div>
//   );
// };

// export default Loader;
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
const phrases = [
  "Creating.",
  "Designing.",
  "Explore.",
];

const Loader = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [hideContent, setHideContent] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 1500); // Change text every 1.5s

    // Exit after full loop
    const totalDuration = phrases.length * 1500 + 1000;
    const exitTimeout = setTimeout(() => {
      setHideContent(true);
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(onComplete, 800);
      }, 400);
    }, totalDuration);

    return () => {
      clearInterval(interval);
      clearTimeout(exitTimeout);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center text-white dark:text-black dark:bg-white bg-black z-50 transition-transform duration-700 origin-top ${isExiting ? "scale-y-0" : "scale-y-100"
        }`}
    >
      <div
        className={`text-2xl sm:text-4xl md:text-5xl font-semibold uppercase tracking-wide transition-opacity duration-500 transform ${hideContent ? "opacity-0" : "opacity-100"
          } fade-roll`}
        key={index} // this forces re-mount for animation
      >
        {phrases[index]}
      </div>
    </div>
  );
};

export default Loader;
