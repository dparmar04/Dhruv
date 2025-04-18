/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";


export const StickyScroll = ({ content, contentClassName }) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });

  const cardLength = content.length;

  useEffect(() => {
    const handleScroll = () => {
      const latest = scrollYProgress.get();
      const cardsBreakpoints = content.map((_, index) => index / cardLength);
      const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
        return Math.abs(latest - breakpoint) < Math.abs(latest - cardsBreakpoints[acc]) ? index : acc;
      }, 0);
      setActiveCard(closestBreakpointIndex);
    };

    const unsubscribe = scrollYProgress.on("change", handleScroll);
    return () => unsubscribe();
  }, [scrollYProgress, content, cardLength]);



  return (
    <div>
      <motion.div className="h-[30rem] scrollbar-hide overflow-y-auto flex justify-around relative space-x-10 rounded-md p-10" ref={ref}>
        <div className="relative flex items-start px-4">
          <div className="max-w-2xl">
            {content.map((item, index) => (
              <div key={item.title + index} className="my-40">
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                  className="text-2xl font-bold text-white"
                >
                  {item.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                  className="text-lg text-gray-300 max-w-sm mt-4"
                >
                  {item.description}
                </motion.p>
              </div>
            ))}
            <div className="h-40" />
          </div>
        </div>
        <div
          // style={{ background: backgroundGradient }}
          className={`hidden lg:block h-full w-[40%] rounded-md sticky top-10 overflow-hidden ${contentClassName}`}
        >
          {content[activeCard].content ?? null}
        </div>
      </motion.div>
    </div>
  );
};


export default StickyScroll;