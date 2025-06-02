import './styles.css'
import Hero from './components/Hero'
import Portfolio from './components/Portfolio'
import Navbar from './components/Navbar'
// import Background from './components/Background'
import About from './components/About'
// import ScrollSections from './components/ScrollSections.jsx'
import CustomCursor from './components/CustomCursor'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Contact from './components/Contact'
import useLenis from './components/useLenis'
import SkillsScene from './components/SkillsScene';



const App = () => {
  useLenis();

  return (
    <div>
      <img
        src="/favicon.png"
        alt="Logo"
        className="hidden md:w-20 h-20 fixed cursor-none rounded-full z-20 !opacity-100 right-4 bottom-4"
      />
      {window.innerWidth > 1024 && <CustomCursor />}
      <BrowserRouter >
        <Navbar />
        <Routes>
          <Route exact path="/" element={<div><Hero /><About /> <SkillsScene /></div>} />
          <Route path="/projects" element={<div> <Portfolio /></div>} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App