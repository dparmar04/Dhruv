import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Navbar = () => {
   const [menuOpen, setMenuOpen] = useState(false);
   const aboutRef = useRef(null);
   const portfolioRef = useRef(null);
   const contactRef = useRef(null);
   const titleRef = useRef(null);
   const menuRef = useRef(null);

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
               gsap.to(titleChars, { y: 0, duration: 1, ease: "power2.out" });
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
      <nav className="w-full text-white px-6 py-4 flex items-center justify-between relative bg-black">
         {/* Logo */}
         <h1
            onClick={() => window.location.href = '/'}
            className="text-4xl font-bold cursor-pointer"
            ref={titleRef}
         >
            Portfolio
         </h1>

         {/* Desktop Navigation */}
         <ul className="hidden md:flex justify-between gap-x-16 overflow-hidden">
            <li>
               <a
                  href="#about"
                  className="relative group text-xl cursor-none"
                  onClick={(e) => {
                     e.preventDefault();
                     if (window.location.pathname !== "/") {
                        window.location.href = "/#about";
                     } else {
                        document.getElementById("about").scrollIntoView({ behavior: "smooth" });
                     }
                  }}
               >
                  <span ref={aboutRef} className="inline-block">About</span>
               </a>
            </li>
            <li>
               <a href="/projects" className="relative group text-xl cursor-none">
                  <span ref={portfolioRef} className="inline-block">Portfolio</span>
               </a>
            </li>
            <li>
               <a href="/contact" className="relative group text-xl cursor-none">
                  <span ref={contactRef} className="inline-block">Contact</span>
               </a>
            </li>
         </ul>

         {/* Mobile Menu Button */}
         <div className="md:hidden z-50 cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
            <div className={`w-8 h-1 bg-white mb-2 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`} />
            <div className={`w-8 h-1 bg-white mb-2 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <div className={`w-8 h-1 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
         </div>

         {/* Mobile Menu */}
         <div
            ref={menuRef}
            className={`fixed top-0 left-0 w-full h-screen z-20 bg-black flex flex-col items-center justify-center transform transition-transform duration-500 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
         >
            <ul className="flex flex-col gap-8 text-3xl">
               <li><a href="#about" className="cursor-pointer" onClick={() => setMenuOpen(false)}>About</a></li>
               <li><a href="/projects" className="cursor-pointer" onClick={() => setMenuOpen(false)}>Portfolio</a></li>
               <li><a href="/contact" className="cursor-pointer" onClick={() => setMenuOpen(false)}>Contact</a></li>
            </ul>
         </div>
      </nav>
   );
};

export default Navbar;
