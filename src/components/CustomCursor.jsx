import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
   const cursorRef = useRef(null);
   const tooltipRef = useRef(null);
   const [isHovered, setIsHovered] = useState(false);

   useEffect(() => {
      const cursor = cursorRef.current;
      const tooltip = tooltipRef.current;

      // Mouse move animation
      const handleMouseMove = (e) => {
         gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            ease: "power3.out",
            duration: 0.15,
         });

         gsap.to(tooltip, {
            x: e.clientX + 15, // Offset to avoid overlap
            y: e.clientY - 30,
            ease: "power3.out",
            duration: 0.15,
         });
      };

      // Hover effect
      const handleMouseEnter = () => {
         setIsHovered(true);
         gsap.to(tooltip, { opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" });
      };

      // Remove hover effect
      const handleMouseLeave = () => {
         setIsHovered(false);
         gsap.to(tooltip, { opacity: 0, scale: 0.8, duration: 0.3, ease: "power3.out" });
      };

      // Attach event listeners
      document.addEventListener("mousemove", handleMouseMove);
      document.querySelectorAll(".projectImg").forEach((el) => {
         el.addEventListener("mouseenter", handleMouseEnter);
         el.addEventListener("mouseleave", handleMouseLeave);
      });

      // Cleanup listeners
      return () => {
         document.removeEventListener("mousemove", handleMouseMove);
         document.querySelectorAll(".projectImg").forEach((el) => {
            el.removeEventListener("mouseenter", handleMouseEnter);
            el.removeEventListener("mouseleave", handleMouseLeave);
         });
      };
   }, []);

   return (
      <>
         {/* Custom Cursor */}
         <div
            ref={cursorRef}
            className="fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2"
         >
            <svg width="30" height="30" viewBox="0 0 100 100" fill="none">
               <polygon
                  points="10,10 90,30 40,40 30,90 10,10"
                  fill="black"
                  stroke="white"
                  strokeWidth="5"
               />
            </svg>
         </div>

         {/* Tooltip (Visible Only on projectImg Hover) */}
         <div
            ref={tooltipRef}
            className="fixed top-0 left-0 z-[9999] pointer-events-none bg-black text-white text-xs px-2 py-1 rounded opacity-0 scale-75 transition-transform"
            style={{ whiteSpace: "nowrap" }}
         >
            Click Here
         </div>
      </>
   );
};

export default CustomCursor;
