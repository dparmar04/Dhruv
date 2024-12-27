import React from 'react';

const Navbar = () => {
   return (
      <nav className="w-full text-white px-6 py-4 flex items-center justify-between">
         <h1 onClick={() => window.location.href = '/'} className="text-4xl font-bold ">Portfolio</h1>

         <ul className="flex justify-between gap-x-16 overflow-hidden">
            <li>
               <a
                  href="/"
                  data-link="About"
                  className="relative group text-xl cursor-none"
               >
                  <span className="inline-block transform transition-transform duration-500 ease-in-out">
                     About
                  </span>
               </a>
            </li>
            <li>
               <a
                  href="/projects"
                  data-link="Portfolio"
                  className="relative group text-xl cursor-none"
               >
                  <span className="inline-block transform transition-transform duration-500 ease-in-out">
                     Portfolio
                  </span>
               </a>
            </li>
            <li>
               <a
                  href="/contact"
                  data-link="Contact"
                  className="relative group text-xl cursor-none"
               >
                  <span className="inline-block transform transition-transform duration-500 ease-in-out">
                     Contact
                  </span>
               </a>
            </li>
         </ul>

      </nav>
   );
};

export default Navbar;
