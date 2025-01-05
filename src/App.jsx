import React from 'react'
import './styles.css'
import Hero from './components/Hero'
import Portfolio from './components/Portfolio'
import Navbar from './components/Navbar'
import Background from './components/Background'
import About from './components/About'
import CustomCursor from './components/CustomCursor'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Contact from './components/Contact'
import ScrollContainer from "./components/SmoothScroll";

const App = () => {
   return (
      <>
         <CustomCursor />
         <ScrollContainer>
            <BrowserRouter>

               <Navbar />
               <img
                  src="/favicon.png"
                  alt="Logo"
                  className="w-20 h-20 fixed cursor-none rounded-full z-20 !opacity-100 right-4 bottom-4"
               />
               <Routes>
                  <Route exact path="/" element={<div><Hero /><About /></div>} />
                  <Route path="/projects" element={<Portfolio />} />
                  <Route path="/contact" element={<Contact />} />
               </Routes>
            </BrowserRouter>
         </ScrollContainer>
      </>
   );
}

export default App