import React, { useState, useEffect } from "react";

const Loader = ({ onComplete }) => {
   const [count, setCount] = useState(0);
   const [isComplete, setIsComplete] = useState(false);
   const [isExiting, setIsExiting] = useState(false);

   useEffect(() => {
      const interval = setInterval(() => {
         setCount((prev) => {
            if (prev < 100) return prev + 1;
            clearInterval(interval);
            setIsComplete(true);
            setTimeout(() => setIsExiting(true), 500);
            onComplete();
            return prev;
         });
      }, 10);

      return () => clearInterval(interval);
   }, [onComplete]);

   return (
      <div
         className={`fixed top-0 left-0 w-full h-full bg-black text-white flex flex-col justify-center items-center text-4xl z-50 transition-transform duration-700 ease-out ${isExiting ? "transform -translate-y-full" : ""
            }`}
      >
         <div className="mb-4">{count}%</div>
         <div className="w-[120px] h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
               className="h-full bg-white transition-all duration-200"
               style={{ width: `${count}%` }}
            ></div>
         </div>
      </div>
   );
};

export default Loader;
