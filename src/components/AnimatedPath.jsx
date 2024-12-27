import React, { useRef } from "react";
import { gsap } from "gsap";

const AnimatedPath = () => {
   const pathRef = useRef(null); // Reference to the SVG path
   const containerRef = useRef(null); // Reference to the container

   const initialPath = "M 10 100 Q 500 100 1085 100"; // Original flat path

   // Event handler for mouse movement
   const handleMouseMove = (event) => {
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = event.clientX - rect.left; // X relative to the container
      const mouseY = event.clientY - rect.top; // Y relative to the container

      // Generate the dynamic path based on cursor position
      const newPath = `M 10 100 Q ${mouseX} ${mouseY} 1085 100`;

      gsap.to(pathRef.current, {
         attr: { d: newPath },
         duration: 0.2,
         ease: "power3.out",
      });
   };

   // Event handler for mouse leaving the container
   const handleMouseLeave = () => {
      gsap.to(pathRef.current, {
         attr: { d: initialPath }, // Reset to initial path
         duration: 1.2,
         ease: "elastic.out(1, 0.4)",
      });
   };

   return (
      <div
         id="string"
         ref={containerRef}
         onMouseMove={handleMouseMove}
         onMouseLeave={handleMouseLeave}
         className="w-3/4 justify-center items-center "

      >
         <svg width="100%" height="200" xmlns="http://www.w3.org/2000/svg">
            <path
               ref={pathRef}
               d={initialPath}
               stroke="#fff"
               fill="transparent"
               strokeWidth="2"
            />
         </svg>
      </div>
   );
};

export default AnimatedPath;
