/* eslint-disable react/no-unknown-property */
import { useEffect, useRef } from 'react';
import Circular from './Circular';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import StickyScroll from './StickyScroll';
import StarBorder from './StarBorder';
import { motion } from 'framer-motion';
import HoverCard from './HoverCard';
import ImageGlowCard from './ImageGlowCard'

const Portfolio = () => {
  const stickyRef = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: stickyRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: true, // Keeps the section pinned until scroll is completed
        scrub: true,
      });
    });
    return () => ctx.revert();
  }, []);


  const projects = [
    {
      title: "Ralph Lauren",
      description: "A premium landing page inspired by Ralph Lauren's elegant style. Designed with smooth animations, responsive layouts, and modern aesthetics using React.js and TailwindCSS to deliver a luxurious user experience across all devices.",
      image: "/photo5.png",
      link: "https://poloralphlauren.netlify.app/"
    },
    {
      title: "Hockerty",
      description: "A stylish and responsive landing page built for Hockerty, a custom clothing brand. Developed using React.js and TailwindCSS with elegant transitions and a sleek layout to showcase high-end fashion appeal.",
      image: "/photo4.png",
      link: "https://hockerty.netlify.app/"
    },
    {
      title: "Celestara",
      description: "Developed a visually engaging website with advanced animations and responsive design, leveraging React.js to ensure a seamless user experience across devices",
      image: "/photo1.png",
      link: "https://celestara.vercel.app/"
    },
    {
      title: "HealDoc",
      description: "As a Frontend Developer, I designed and developed the entire website from scratch using React.js, ensuring a smooth user experience and responsive design.",
      link: "https://healdoc.ai/",
      image: "/photo2.png",
    },
    {
      title: "Helverse",
      description: "It features a modern, clean design with smooth transitions and animations, creating an appealing user experience.",
      link: "https://helverse.netlify.app/",
      image: "/photo3.png",
    },
  ];
  // const glowGradients = [
  //   'radial-gradient(50% 50% at 50% 50%, #d1d1d1 0%, rgba(0, 201, 255, 0) 100%)',
  //   'radial-gradient(50% 50% at 50% 50%, #763CAC 0%, rgba(50, 15, 133, 0) 100%)',
  //   'radial-gradient(50% 50% at 50% 50%, #190e57 0%, rgba(255, 97, 166, 0) 100%)'
  // ];


  const fadeInVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: 'easeOut',
      },
    }),
  };

  useEffect(() => {
    const marquee = gsap.utils.toArray('.marquee');
    gsap.to(marquee, {
      transform: "translateX(-200%)",
      ease: "none",
      duration: 10,
      repeat: -1
    });
  }, []);

  const motionProps = {
    variants: fadeInVariants,
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.3 }
  };

  return (
    <div className="dark:bg-black bg-white min-h-screen transition-colors duration-500">
      {/* React Three Fiber  */}
      <div className='w-full h-full md:h-screen overflow-hidden'>
        <Circular />
      </div>

      <div className='w-full bg-white dark:bg-black'>
        {/* Marquee */}
        <div className="overflow-hidden py-10">
          <div className="marquee-container relative whitespace-nowrap transform -rotate-3">
            <div className="inline-flex items-center space-x-8 dark:bg-white py-4 px-4 sm:px-6 md:px-8">
              {[1, 2, 3, 4, 5, 6].map((_, i) => (
                <div
                  key={i}
                  className="marquee flex items-center flex-shrink-0 gap-3 sm:gap-4"
                >
                  <h1 className="text-black text-2xl sm:text-3xl md:text-4xl font-bold">
                    FEATURED WORK
                  </h1>
                  <img
                    src="/Arrow.svg"
                    alt="Arrow"
                    className="w-6 sm:w-8 md:w-10 rotate-180"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* Portfolio */}
        <div className="relative h-full mt-10">
          {/*<div className="flex flex-col gap-20 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.id || index} className={`group flex flex-col md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} items-center gap-10`}
                {...motionProps} custom={index} >
             
                <a href={project.link} target="_blank" className="relative w-full md:w-1/2 rounded-3xl shadow-xl">
                  <img src={project.image} alt={project.title} loading="lazy" className="w-full h-64 md:h-80 object-cover relative rounded-3xl border border-white/10 z-20"
                  />
                </a>
                <HoverCard title={project.title} description={project.description} />
              </motion.div>
            ))}
          </div> */}
          <div className="relative h-full mt-10 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-20 max-w-6xl mx-auto">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id || index}
                  className={`group flex flex-col md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} items-center gap-10`}
                  {...motionProps}
                  custom={index}
                >
                  {/* Image with glowing effect */}
                  <ImageGlowCard image={project.image} link={project.link} />

                  {/* HoverCard with title/description */}
                  <HoverCard title={project.title} description={project.description} />
                </motion.div>
              ))}
            </div>
          </div>



          <div className='flex flex-col items-center py-10'>
            <p className='text-white text-[18px] sm:text-[24px] px-5 font-space my-4'>Create, Innovate, Dominate – Contact Now!</p>
            <StarBorder onClick={() => window.location.href = '/contact'}>
              Get in touch
            </StarBorder>
          </div>
        </div>
      </div >

    </div >
  );
};

export default Portfolio;
