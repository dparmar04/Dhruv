import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const StickyScroll = ({ content }) => {
   const [activeCard, setActiveCard] = useState(0);
   const ref = useRef(null);

   const cardLength = content.length;

   const handleScroll = () => {
      const container = ref.current;
      if (!container) return;

      const cards = container.querySelectorAll('.card-content');
      const containerMiddle = container.scrollTop + container.clientHeight / 2;

      let closestCard = 0;
      let minDistance = Infinity;

      cards.forEach((card, index) => {
         const cardMiddle = card.offsetTop + card.offsetHeight / 2;
         const distance = Math.abs(containerMiddle - cardMiddle);

         if (distance < minDistance) {
            minDistance = distance;
            closestCard = index;
         }
      });

      setActiveCard(closestCard);
   };

   return (
      <div
         ref={ref}
         onScroll={handleScroll}
         className="h-[30rem] overflow-y-auto flex justify-center relative space-x-10 rounded-md p-10 scrollbar-hide"
         style={{ background: "black" }}
      >
         <div className="relative flex items-start px-4">
            <div className="max-w-2xl">
               {content.map((item, index) => (
                  <div
                     key={item.title + index}
                     className="card-content my-20 h-[400px] flex flex-col justify-center"
                  >
                     <h2
                        className={`text-4xl font-bold uppercase font-space transition-colors duration-300 ${activeCard === index ? "text-white" : "text-gray-500"
                           }`}
                     >
                        {item.title}
                     </h2>
                     <p
                        className={`text-lg transition-colors duration-300 ${activeCard === index ? "text-gray-200" : "text-gray-500"
                           } mt-10`}
                     >
                        {item.description}
                     </p>
                  </div>
               ))}
            </div>
         </div>
         <div className="hidden lg:block h-full w-1/2 rounded-md sticky top-10 overflow-hidden shadow-lg">
            <AnimatePresence mode="wait">
               <motion.div
                  key={activeCard}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
               >
                  {content[activeCard]?.content ?? null}
               </motion.div>
            </AnimatePresence>
         </div>
      </div>
   );
};

export default StickyScroll;
