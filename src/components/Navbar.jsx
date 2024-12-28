import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Navbar = () => {
   const aboutRef = useRef(null);
   const portfolioRef = useRef(null);
   const contactRef = useRef(null);
   const titleRef = useRef(null);

   useEffect(() => {
      const tl = gsap.timeline();

      // Helper function to animate text
      const animateText = (ref) => {
         const text = ref.current.textContent;
         ref.current.textContent = '';
         const chars = text.split('').map(char => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            ref.current.appendChild(span);
            return span;
         });
         return chars;
      };

      // Animate each nav item
      const aboutChars = animateText(aboutRef);
      const portfolioChars = animateText(portfolioRef);
      const contactChars = animateText(contactRef);
      const titleChars = animateText(titleRef);

      // Animate title with wave effect
      gsap.to(titleChars, {
         y: -10,
         stagger: {
            each: 0.05,
            repeat: 1,
            yoyo: true,
            onComplete: () => {
               // Reset to original position after waves
               gsap.to(titleChars, {
                  y: 0,
                  duration: 1,
                  ease: "power2.out"
               });
            }
         },
         ease: "sine.inOut",
         duration: 0.5
      });

      // Sequence animations with downward direction
      tl.fromTo([aboutChars, portfolioChars, contactChars], {
         opacity: 0,
         y: -100
      }, {
         opacity: 1,
         y: 0,
         duration: 0.8,
         stagger: 0.05,
         ease: "power4.out"
      }, 0);

   }, []);

   return (
      <nav className="w-full text-white px-6 py-4 flex items-center justify-between">
         <h1
            onClick={() => window.location.href = '/'}
            className="text-4xl font-bold"
            ref={titleRef}
         >
            Portfolio
         </h1>

         <ul className="flex justify-between gap-x-16 overflow-hidden">
            <li>
               <a
                  href="#about"
                  data-link="About"
                  className="relative group text-xl cursor-none"
                  onClick={(e) => {
                     e.preventDefault();
                     document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
                  }}
               >
                  <span ref={aboutRef} className="inline-block">
                     About
                  </span>
               </a>
            </li>
            <li>
               <a
                  href="/projects"
                  data-link="Portfolio"
                  className="relative group text-xl cursor-none"
               >
                  <span ref={portfolioRef} className="inline-block">
                     Portfolio
                  </span>
               </a>
            </li>
            <li>
               <a
                  href="/contact"
                  data-link="Contact"
                  className="relative group text-xl cursor-none"
               >
                  <span ref={contactRef} className="inline-block">
                     Contact
                  </span>
               </a>
            </li>
         </ul>

      </nav>
   );
};

export default Navbar;
