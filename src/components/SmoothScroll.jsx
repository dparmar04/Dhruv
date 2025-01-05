import { motion } from "framer-motion";
import React from "react";

const SmoothScroll = ({ children }) => {
   return (
      <motion.div
         style={{
            overflow: "hidden",
         }}
      >
         <motion.div
            style={{
               display: "flex",
               flexDirection: "column",
            }}
            initial={{ y: 0 }}
            animate={{ y: [0, 0] }}
            transition={{
               duration: 2, // Adjust speed
               ease: "easeInOut",
            }}
         >
            {children}
         </motion.div>
      </motion.div>
   );
};

export default SmoothScroll;
