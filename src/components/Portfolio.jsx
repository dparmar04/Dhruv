import React, { useEffect, useRef } from 'react';
import '../styles.css'
import { motion } from "framer-motion";
import Circular from './Circular';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StickyScroll from './StickyScroll';

const Portfolio = () => {
   const content = [
      {
         title: "Celestara",
         description: "Developed a visually engaging website with advanced animations and responsive design, leveraging React.js to ensure a seamless user experience across devices",
         content: <a href="https://celestara.vercel.app/" target='_blank' className='cursor-none group'>
            <img
               src="/photo1.png"
               alt="Project 1"
               className="projectImg w-full h-full object-cover p-2 rounded-3xl "
            />
         </a>,
      },
      {
         title: "HealDoc",
         description: "As a Frontend Developer, I designed and developed the entire website from scratch using React.js, ensuring a smooth user experience and responsive design.",
         content:
            <a href="https://healdoc.ai/" target='_blank' className='cursor-none'   > <img src="/photo2.png" alt="Project 2" className="projectImg w-full h-full object-cover rounded-3xl" /> </a>,
      },
      {
         title: "Helverse",
         description: "It features a modern, clean design with smooth transitions and animations, creating an appealing user experience.",
         content: <a href="https://helverse.netlify.app/" target='_blank' className='cursor-none'> <img src="/photo3.png" alt="Project 3" className="projectImg w-full h-full object-cover rounded-3xl" /> </a>,
      },
   ];


   useEffect(() => {
      const marquee = gsap.utils.toArray('.marquee');
      gsap.to(marquee, {
         transform: "translateX(-200%)",
         ease: "none",
         duration: 10,
         repeat: -1
      });
   }, []);

   return (
      <div className="bg-black min-h-screen">
         <div className='w-full h-screen overflow-hidden'>
            <Circular />
         </div>

         <div className='w-full bg-black'>
            {/* Marquee */}
            <div className='overflow-hidden py-10'>
               <div className='marquee-container relative whitespace-nowrap transform -rotate-3'>
                  <div className='inline-flex items-center space-x-8 bg-white py-6'>
                     {[1, 2, 3, 4, 5].map((_, i) => (
                        <div key={i} className='marquee flex items-center flex-shrink-0  gap-4'>
                           <h1 className='text-black text-5xl font-bold'>FEATURED WORK</h1>
                           <img src="/Arrow.svg" alt="Arrow" className='img w-16 rotate-180' />
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Portfolio */}
            <div className='w-full h-screen'>
               <StickyScroll content={content} />
            </div>
         </div>
      </div>
   );
}

export default Portfolio;