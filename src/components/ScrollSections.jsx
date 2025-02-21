import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ScrollSections({
   sections,
   noBackground = false,
}) {
   const containerRef = useRef < HTMLDivElement > (null);
   const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start start", "end end"],
   });

   return (
      <div
         ref={containerRef}
         className={(
            "relative h-[200svh] bg-gradient-to-b from-neutral-900 to-black mt-8 md:mt-12 lg:mt-24",
            noBackground && "bg-black"
         )}
      >
         {/* Background Images */}
         {noBackground ? null : (
            <img
               src="/images/scroll-carousel.svg"
               alt=""
               className="absolute inset-0 object-cover opacity-20"
               fill
               sizes="(min-width: 1024px) 1024px, 100vw"
               priority
            />
         )}
         <div className="sticky top-0 h-screen flex items-center overflow-hidden">
            {/* Content Container */}
            <div className="relative w-full h-full flex max-md:flex-col">
               {/* Left Side - Sections */}
               <div className="w-full lg:w-1/2 h-full flex flex-col justify-center bg-gradient-to-b from-black/10 to-black/70">
                  <div className="h-1/2 -translate-y-1/2 w-full self-start">
                     {sections.map((section, index) => {
                        const progress = useTransform(
                           scrollYProgress,
                           [index / sections.length, (index + 1) / sections.length],
                           [0, 1]
                        );
                        const backgroundColor = useTransform(
                           progress,
                           [0, 0.3, 0.7, 1],
                           [
                              "rgba(0, 0, 0, 0)",
                              "rgba(0, 0, 0, 0.5)",
                              "rgba(0, 0, 0, 0.5)",
                              "rgba(0, 0, 0, 0)",
                           ]
                        );
                        const textColor = useTransform(
                           progress,
                           [0, 0.3, 0.7, 1],
                           [
                              "rgba(255, 255, 255, 0.5)",
                              "rgba(255, 255, 255, 255)",
                              "rgba(255, 255, 255, 255)",
                              "rgba(255, 255, 255, 0.5)",
                           ]
                        );

                        return (
                           <motion.div
                              key={section.number}
                              className={(
                                 "flex flex-col flex-1 justify-center p-8 md:p-16 rounded-lg transition-colors duration-300"
                              )}
                              style={{
                                 backgroundColor,
                                 color: textColor,
                              }}
                              transition={{ duration: 0.3 }}
                           >
                              <div className="flex gap-6 md:gap-12 xl:gap-18 items-center">
                                 <span className="text-3xl md:text-5xl 2xl:text-7xl font-thin mr-6 ">
                                    {section.number}
                                 </span>
                                 <div className="mt-4 space-y-2">
                                    <span className="text-xs lg:text-sm tracking-[0.6rem]">
                                       {section.category}
                                    </span>
                                    <h2 className="text-md md:text-2xl 2xl:text-[2.2rem] mt-2 leading-[1rem] md:leading-[2rem] 2xl:leading-[3rem] font-medium">
                                       {section.title}
                                    </h2>
                                 </div>
                              </div>
                           </motion.div>
                        );
                     })}
                  </div>
               </div>

               {/* Right Side - Mockups */}
               <div className="md:w-1/2 h-full relative overflow-hidden">
                  {sections.map((section, index) => {
                     const y = useTransform(
                        scrollYProgress,
                        [0, 1],
                        [`${100 * index} %, ${100 * (index - (sections.length - 1))} %`]
                     );

                     return (
                        <motion.div
                           key={section.number}
                           style={{ y }}
                           className="absolute inset-0 flex items-center justify-center will-change-transform"
                        >
                           <div className="relative w-full xl:w-3/4 h-full">
                              {section.isVideo ? (
                                 <video
                                    src={section.mockupImage}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="object-contain p-10 xl:p-20"
                                    style={{ width: "100%", height: "100%" }}
                                 />
                              ) : (
                                 <Image
                                    src={section.mockupImage}
                                    alt={section.title}
                                    className="object-contain p-10 xl:p-20"
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    priority
                                    unoptimized={
                                       section.mockupImage ===
                                       "/images/mockups/creators/2.gif"
                                    }
                                 />
                              )}
                           </div>
                        </motion.div>
                     );
                  })}
               </div>

               {/* Scroll Indicator */}
               <motion.div
                  className="absolute right-8 top-1/2 -translate-y-1/2 w-0.5 h-32 bg-white/10 rounded-full overflow-hidden"
                  style={{ scaleY: scrollYProgress }}
               >
                  <div className="w-full h-full bg-white/50 origin-top" />
               </motion.div>
            </div>
         </div>
      </div>
   );
}
