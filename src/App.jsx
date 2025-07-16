import './styles.css'
import Hero from './components/Hero'
import Portfolio from './components/Portfolio'
import Navbar from './components/Navbar'
import About from './components/About'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Contact from './components/Contact'
import useLenis from './components/useLenis'

const App = () => {
  useLenis();

  return (
    <div>
      <img
        src="/favicon.png"
        alt="Logo"
        className="hidden md:w-20 h-20 fixed cursor-none rounded-full z-20 !opacity-100 right-4 bottom-4"
      />
      <BrowserRouter >
        <Navbar />
        <Routes>
          <Route exact path="/" element={<div><Hero /><About /></div>} />
          <Route path="/projects" element={<div> <Portfolio /></div>} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App