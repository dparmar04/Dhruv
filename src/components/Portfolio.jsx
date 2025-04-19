/* eslint-disable react/no-unknown-property */
import { useEffect, useRef } from 'react';
import Circular from './Circular';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import StickyScroll from './StickyScroll';
import StarBorder from './StarBorder';
import { motion } from 'framer-motion';

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

  return (
    <div className="bg-black min-h-screen">
      <div className='w-full h-full md:h-screen overflow-hidden'>
        <Circular />
      </div>

      <div className='w-full bg-black'>
        {/* Marquee */}
        <div className="overflow-hidden py-10">
          <div className="marquee-container relative whitespace-nowrap transform -rotate-3">
            <div className="inline-flex items-center space-x-8 bg-white py-4 px-4 sm:px-6 md:px-8">
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
          {/* <StickyScroll content={content} /> */}
          <div className="flex flex-col gap-20 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className={`flex flex-col md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} items-center gap-10`}
                variants={fadeInVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={index}
              >
                {/* Image + glow */}
                <motion.a
                  href={project.link}
                  target="_blank"
                  className="relative w-full md:w-1/2 rounded-3xl  shadow-xl group/image"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 md:h-80 object-cover relative rounded-3xl border border-white/10 z-20"
                  />
                  {/* Glow blob - appears when hovering desc */}
                  <div className="md:absolute absolute md:-top-10 md:-left-36 w-[90vw] md:w-[800px] h-[300px] md:h-[500px] flex-shrink-0 rounded-[641px] opacity-40 md:opacity-100 group-hover/desc:opacity-100 transition-opacity duration-500 pointer-events-none z-0 mx-auto md:mx-0"
                    style={{ background: 'radial-gradient(50% 50% at 50% 50%, #763CAC 0%, rgba(50, 15, 133, 0) 100%)' }}
                  />
                  {/* <div
                    className={`md:absolute md:-top-10 ${index % 2 === 0 ? 'md:-left-32' : 'md:-right-36'} w-[90vw] md:w-[600px] h-[300px] md:h-[500px] flex-shrink-0 rounded-[641px] opacity-40 md:opacity-100 group-hover/desc:opacity-100 transition-opacity duration-500 pointer-events-none z-0 mx-auto md:mx-0`}
                    style={{
                      background: glowGradients[index % glowGradients.length],
                    }}
                  /> */}



                </motion.a>

                {/* Description box + glassmorphism + glow */}
                <motion.div
                  className="relative w-full md:w-1/2 px-4 group/desc flex md:block justify-center"
                  variants={fadeInVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={index + 0.5}
                >
                  {/* Glassmorphism container */}
                  <div
                    className={`md:absolute md:-top-20 md:-left-20 ${index % 2 === 0 ? 'md:-left-20' : 'md:-right-20'}  rounded-[14px] p-6 border border-white/10 backdrop-blur-[40px] z-50 w-full md:w-auto`}
                    style={{
                      background: `radial-gradient(151.92% 127.02% at 15.32% 21.04%, rgba(118, 60, 172, 0.20) 0%, rgba(110, 191, 244, 0.04) 77.08%, rgba(70, 144, 212, 0.00) 100%)`,
                      backgroundBlendMode: 'overlay, normal'
                    }}
                  >
                    <h3 className="text-2xl font-semibold font-space mb-3 text-white">{project.title}</h3>
                    <p className="text-gray-300 font-space-light text-base">{project.description}</p>
                  </div>
                </motion.div>

              </motion.div>
            ))}
          </div>

          <div className='flex flex-col items-center py-10'>
            <p className='text-white text-[18px] sm:text-[24px] px-5 font-space my-4'>Create, Innovate, Dominate – Contact Now!</p>
            <StarBorder onClick={() => window.location.href = '/contact'}>
              Get in touch
            </StarBorder>
          </div>
        </div>
      </div >
    </div>
  );
};

export default Portfolio;
