import React, { useState, useEffect } from 'react'
import AnimatedPath from './AnimatedPath'

const About = () => {
   const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
   const [resumeButtonPosition, setResumeButtonPosition] = useState({ x: 0, y: 0 });
   const [isHovered, setIsHovered] = useState(false);
   const [isResumeHovered, setIsResumeHovered] = useState(false);
   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

   useEffect(() => {
      const handleMouseMove = (e) => {
         setMousePosition({ x: e.clientX, y: e.clientY });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
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

      // Maximum distance the button can move (in pixels)
      const maxDistance = 1000;

      // Calculate new position with enhanced smooth lerp
      const lerpFactor = isHovered || isResumeHovered ? 0.15 : 0.05; // Slower lerp when returning

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
      <div className='w-full h-screen bg-black flex flex-col items-center relative'>
         <div className='w-full flex justify-center '>
            <AnimatedPath />
         </div>
         <div className='w-3/4 h-auto text-white text-center text-5xl leading-snug font-space font-thin relative'>
            <p>I create seamless, pixel-perfect websites that blend modern design with efficient, functional code to deliver engaging and memorable user experiences.</p>
            <div
               id="exploreBtn"
               className='bg-white p-10 text-[20px] uppercase w-[250px] whitespace-nowrap text-black rounded-2xl absolute top-[90%] left-[10%]  font-space font-normal'
               style={{
                  transform: `translate(${buttonPosition.x}px, ${buttonPosition.y}px)`,
                  transition: 'transform 0.09s ease-out',
                  cursor: 'none'
               }}
               onClick={() => window.location.href = '/projects'}
               onMouseEnter={() => setIsHovered(true)}
               onMouseLeave={() => setIsHovered(false)}
            >
               Explore Project
            </div>
            <div
               id="resumebtn"
               className='bg-white p-10  text-[20px] uppercase w-[250px] text-black rounded-2xl absolute top-[90%] right-[10%]  font-space font-normal'
               style={{
                  transform: `translate(${resumeButtonPosition.x}px, ${resumeButtonPosition.y}px)`,
                  transition: 'transform 0.09s ease-out',
                  cursor: 'none'
               }}
               onClick={() => window.open('https://1drv.ms/w/c/e1f9f212b3353f5d/ETm0hJSbrNFHtvYWNcYpFVQBstpmngOmJl16JN1u6ARXqQ?e=YkKqOG', '_blank')}
               onMouseEnter={() => setIsResumeHovered(true)}
               onMouseLeave={() => setIsResumeHovered(false)}
            >
               Resume
            </div>
         </div>

      </div>
   )
}

export default About