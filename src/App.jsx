import React from 'react'
import './styles.css'
import Hero from './components/Hero'
import Portfolio from './components/Portfolio'
import Navbar from './components/Navbar'
import Background from './components/Background'
import About from './components/About'
import CustomCursor from './components/CustomCursor'
import { Routes, Route, BrowserRouter } from 'react-router-dom';

const App = () => {
   return (
      <BrowserRouter>
         <CustomCursor />
         <Navbar />
         <Routes>
            <Route exact path="/" element={<div><Hero /><About /></div>} />
            <Route path="/projects" element={<Portfolio />} />
            {/* <Route path="/contact" element={<Contact />} /> */}
         </Routes>
      </BrowserRouter>
   );
}

export default App