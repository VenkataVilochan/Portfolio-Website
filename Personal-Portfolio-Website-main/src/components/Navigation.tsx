import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
export const Navigation = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    gsap.fromTo(navRef.current, {
      y: -100,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      delay: 3.5,
      ease: "power2.out"
    });
  }, []);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };
  return <nav ref={navRef} className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-slate-900/80 border-b border-slate-800">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div onClick={() => scrollToSection('hero')} className="text-2xl text-2xl text-white cursor-pointer">
          VV
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {['About', 'Projects', 'Contact'].map(item => <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-gray-300 hover:text-blue-400 transition-colors duration-300 relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </button>)}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className="space-y-2">
            <div className={`w-6 h-0.5 bg-white transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></div>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && <div className="md:hidden backdrop-blur-md bg-slate-900/95 border-t border-slate-800">
          <div className="flex flex-col space-y-4 p-6">
            {['About', 'Projects', 'Contact'].map(item => <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-left">
                {item}
              </button>)}
          </div>
        </div>}
    </nav>;
};