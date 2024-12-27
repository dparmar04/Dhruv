import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
   const cursorRef = useRef(null);
   const ringRef = useRef(null);

   useEffect(() => {
      const cursor = cursorRef.current;
      const ring = ringRef.current;

      const updateCursorPosition = (e) => {
         const { clientX: x, clientY: y } = e;

         // Dot follows the cursor instantly
         gsap.to(cursor, {
            duration: 0,
            x,
            y,
            ease: 'power2.out',
         });

         // Ring follows with a delay for a trailing effect
         gsap.to(ring, {
            duration: 0.5,
            x,
            y,
            ease: 'power2.out',
         });
      };

      const handleMouseEnter = (e) => {
         if (e.target.classList.contains('projectImg')) {
            gsap.to(ring, {
               scale: 5,
               duration: 0.3,
               backgroundColor: 'black',
               color: 'white',
               border: 0,
            });
            ring.innerHTML = '<span class="text-white text-[8px]">Click Me</span>';
            cursor.style.display = 'none';
         }
      };

      const handleMouseLeave = () => {
         gsap.to(ring, {
            scale: 1,
            duration: 0.3,
            backgroundColor: 'transparent',
            borderWidth: '2px',
            borderColor: 'white',
         });
         ring.innerHTML = '';
         cursor.style.display = 'block';
      };

      window.addEventListener('mousemove', updateCursorPosition);

      // Add event listeners for all elements with projectImg class
      const observer = new MutationObserver((mutations) => {
         mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
               document.querySelectorAll('.projectImg').forEach((img) => {
                  img.addEventListener('mouseenter', handleMouseEnter);
                  img.addEventListener('mouseleave', handleMouseLeave);
               });
            }
         });
      });

      // Initial setup for existing elements
      document.querySelectorAll('.projectImg').forEach((img) => {
         img.addEventListener('mouseenter', handleMouseEnter);
         img.addEventListener('mouseleave', handleMouseLeave);
      });

      // Start observing the document for dynamically added elements
      observer.observe(document.body, {
         childList: true,
         subtree: true
      });

      return () => {
         window.removeEventListener('mousemove', updateCursorPosition);
         document.querySelectorAll('.projectImg').forEach((img) => {
            img.removeEventListener('mouseenter', handleMouseEnter);
            img.removeEventListener('mouseleave', handleMouseLeave);
         });
         observer.disconnect();
      };
   }, []);

   return (
      <>
         <div
            ref={cursorRef}
            className="fixed w-4 h-4 bg-white rounded-full pointer-events-none z-50"
            style={{ transform: 'translate(-50%, -50%)' }}
         />
         <div
            ref={ringRef}
            className="fixed w-10 h-10 border-2 border-white rounded-full pointer-events-none z-50 flex items-center justify-center"
            style={{ transform: 'translate(-50%, -50%)' }}
         />
      </>
   );
};

export default CustomCursor;
