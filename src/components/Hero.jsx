import Background from './Background.jsx';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = ({ disabled = false, speed = 1, className = '' }) => {
   const animationDuration = `${speed}s`;
   const headingRef = useRef(null);
   const subHeadingRef = useRef(null);

   useEffect(() => {
      // Create timeline for sequenced animations
      const tl = gsap.timeline();

      // Get heading text and create spans for each character
      const headingText = headingRef.current.textContent;
      headingRef.current.textContent = '';
      const headingChars = headingText.split('').map(char => {
         const span = document.createElement('span');
         span.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space for spaces
         span.style.display = 'inline-block';
         headingRef.current.appendChild(span);
         return span;
      });

      // Animate heading characters
      tl.fromTo(headingChars, {
         opacity: 0,
         filter: 'blur(20px)',
         y: 100
      }, {
         opacity: 1,
         filter: 'blur(0px)',
         y: 0,
         duration: 1,
         stagger: 0.05,
         ease: "power4.out"
      }, "-=1");

      // Get subheading text and create spans for each character
      const subHeadingText = subHeadingRef.current.textContent;
      subHeadingRef.current.textContent = '';
      const subHeadingChars = subHeadingText.split('').map(char => {
         const span = document.createElement('span');
         span.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space for spaces
         span.style.display = 'inline-block';
         subHeadingRef.current.appendChild(span);
         return span;
      });

      // Animate subheading characters
      tl.fromTo(subHeadingChars, {
         opacity: 0,
         filter: 'blur(20px)',
         y: 50
      }, {
         opacity: 1,
         filter: 'blur(0px)',
         y: 0,
         duration: 1,
         stagger: 0.05,
         ease: "power4.out"
      }, "-=0.5"); // Start slightly before heading animation ends

   }, []);

   return (
      <div className='w-full relative h-screen flex flex-row bg-black'>
         <div className='greeting w-full text-white h-screen font-bold flex flex-col items-start justify-center text-left pl-28 z-10 '>
            <h1 className='text-9xl' ref={headingRef}>
               Hi,I'm Dhruv
            </h1>
            <div
               className={`text-[#b5b5b5a4] bg-clip-text inline-block ${disabled ? '' : 'animate-shine'} ${className}`}
               style={{
                  backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  animationDuration: '2s',
               }}
            >
               <p className='text-5xl uppercase my-3' ref={subHeadingRef}>
                  <span className="inline-block">Front-end Developer</span>
               </p>
            </div>
         </div>
         <div className='w-full h-full absolute top-0 left-0'>
            {/* <Background /> */}
         </div>
         <img
            src="/favicon.png"
            alt="Logo"
            className="w-20 h-20 fixed cursor-none rounded-full z-20 !opacity-100 right-4 bottom-4"
         />
      </div>
   )
}

export default Hero