import React, { useState, useEffect, useRef } from 'react'
import AnimatedPath from './AnimatedPath'
import StarBorder from './StarBorder';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
   const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
   const [resumeButtonPosition, setResumeButtonPosition] = useState({ x: 0, y: 0 });
   const [isHovered, setIsHovered] = useState(false);
   const [isResumeHovered, setIsResumeHovered] = useState(false);
   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
   const textRef = useRef(null);

   useEffect(() => {
      const handleMouseMove = (e) => {
         setMousePosition({ x: e.clientX, y: e.clientY });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
   }, []);

   useEffect(() => {
      // Get text content and create spans for each character
      const text = textRef.current.textContent;
      textRef.current.textContent = '';

      const chars = text.split('').map(char => {
         const span = document.createElement('span');
         span.textContent = char === ' ' ? '\u00A0' : char;
         span.style.display = 'inline-block';
         span.style.opacity = '0';
         textRef.current.appendChild(span);
         return span;
      });

      // Create animation for each character
      gsap.fromTo(chars,
         {
            opacity: 0,
            filter: 'blur(20px)',
            y: 100
         },
         {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 1.5,
            stagger: 0.05,
            ease: "power4.out",
            scrollTrigger: {
               trigger: textRef.current,
               start: "top center+=100",
               end: "bottom-=50 center", // Adjusted end point to ensure full visibility
               scrub: 1,
               toggleActions: "play none none reverse", // Controls animation behavior
               markers: false, // Set to true for debugging
               onUpdate: (self) => {
                  // Ensure all text is visible when scrolling completes
                  if (self.progress === 1) {
                     chars.forEach(char => {
                        char.style.opacity = '1';
                        char.style.filter = 'blur(0px)';
                        char.style.transform = 'translateY(0)';
                     });
                  }
               }
            }
         }
      );
   }, []);

   useEffect(() => {
      const buttonRect = document.getElementById('exploreBtn').getBoundingClientRect();
      const resumeButtonRect = document.getElementById('resumebtn').getBoundingClientRect();

      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      const buttonCenterY = buttonRect.top + buttonRect.height / 2;

      const resumeButtonCenterX = resumeButtonRect.left + resumeButtonRect.width / 2;
      const resumeButtonCenterY = resumeButtonRect.top + resumeButtonRect.height / 2;

      const distanceX = mousePosition.x - buttonCenterX;
      const distanceY = mousePosition.y - buttonCenterY;

      const resumeDistanceX = mousePosition.x - resumeButtonCenterX;
      const resumeDistanceY = mousePosition.y - resumeButtonCenterY;

      const maxDistance = 1000;

      const lerpFactor = isHovered || isResumeHovered ? 0.15 : 0.05;

      const targetX = isHovered ? Math.min(Math.max(distanceX, -maxDistance), maxDistance) : 0;
      const targetY = isHovered ? Math.min(Math.max(distanceY, -maxDistance), maxDistance) : 0;

      const resumeTargetX = isResumeHovered ? Math.min(Math.max(resumeDistanceX, -maxDistance), maxDistance) : 0;
      const resumeTargetY = isResumeHovered ? Math.min(Math.max(resumeDistanceY, -maxDistance), maxDistance) : 0;

      const animatePosition = () => {
         setButtonPosition(prev => ({
            x: prev.x + (targetX - prev.x) * lerpFactor,
            y: prev.y + (targetY - prev.y) * lerpFactor
         }));

         setResumeButtonPosition(prev => ({
            x: prev.x + (resumeTargetX - prev.x) * lerpFactor,
            y: prev.y + (resumeTargetY - prev.y) * lerpFactor
         }));
      };

      const animationId = requestAnimationFrame(animatePosition);
      return () => cancelAnimationFrame(animationId);

   }, [isHovered, isResumeHovered, mousePosition]);

   useEffect(() => {
      const cursor = document.querySelectorAll('.fixed');
      cursor.forEach(el => {
         el.style.opacity = (isHovered || isResumeHovered) ? '0' : '1';
      });
   }, [isHovered, isResumeHovered]);

   return (
      <div id='about' className='w-full min-h-screen bg-black flex flex-col items-center relative py-20'>
         <div className='w-full flex justify-center mb-10'>
            <AnimatedPath />
         </div>
         <div className='w-3/4 h-auto text-white text-center text-5xl leading-snug font-space font-thin relative mb-44'>
            <p ref={textRef}>I create seamless, pixel-perfect websites that blend modern design with efficient, functional code to deliver engaging and memorable user experiences.</p>
            <div
               id="exploreBtn"
               className='bg-white p-10 text-[20px] uppercase w-[250px] whitespace-nowrap text-black rounded-2xl absolute top-[120%] left-[10%] font-space font-normal'
               style={{
                  transform: `translate(${buttonPosition.x}px, ${buttonPosition.y}px)`,
                  transition: 'transform 0.09s ease-out',
                  cursor: 'none'
               }}
               onClick={() => window.open('https://1drv.ms/w/c/e1f9f212b3353f5d/ETm0hJSbrNFHtvYWNcYpFVQBstpmngOmJl16JN1u6ARXqQ?e=YkKqOG', '_blank')}
               onMouseEnter={() => setIsHovered(true)}
               onMouseLeave={() => setIsHovered(false)}
            >
               Resume
            </div>
            <div
               id="resumebtn"
               className='rounded-2xl absolute top-[120%] right-[10%] whitespace-nowrap font-space font-normal'
               style={{
                  transform: `translate(${resumeButtonPosition.x}px, ${resumeButtonPosition.y}px)`,
                  transition: 'transform 0.09s ease-out',
                  cursor: 'none'
               }}
               onClick={() => window.location.href = '/projects'}
               onMouseEnter={() => setIsResumeHovered(true)}
               onMouseLeave={() => setIsResumeHovered(false)}
            >
               <StarBorder className='cursor-none'>
                  Explore Project
               </StarBorder>
            </div>
         </div>
      </div>
   )
}

export default About