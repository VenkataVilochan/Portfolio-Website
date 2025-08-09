
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(footerRef.current,
        { opacity: 0, y: 60, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Floating particles animation
      const particles = document.querySelectorAll('.footer-particle');
      particles.forEach((particle, index) => {
        gsap.to(particle, {
          y: -20,
          x: index % 2 === 0 ? 10 : -10,
          duration: 3 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 0.5
        });
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      ref={footerRef}
      className="relative py-16 px-6 border-t border-white/10 overflow-hidden"
    >
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="footer-particle absolute top-10 left-10 w-2 h-2 bg-blue-400/60 rounded-full"></div>
        <div className="footer-particle absolute top-20 right-20 w-3 h-3 bg-violet-400/60 rounded-full"></div>
        <div className="footer-particle absolute bottom-20 left-1/4 w-2 h-2 bg-teal-400/60 rounded-full"></div>
        <div className="footer-particle absolute bottom-10 right-1/3 w-1 h-1 bg-indigo-400/60 rounded-full"></div>
        <div className="footer-particle absolute top-1/2 left-1/2 w-2 h-2 bg-pink-400/60 rounded-full"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center space-y-8">
          {/* Logo/Name */}
          <div 
            className="text-3xl font-bold text-white cursor-pointer hover:text-blue-400 transition-colors duration-300"
            onClick={scrollToTop}
          >
            Venkata Vilochan
          </div>

          {/* Navigation Links */}
          <div className="flex justify-center space-x-8 text-gray-300">
            {['About', 'Projects', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  const element = document.getElementById(item.toLowerCase());
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="hover:text-blue-400 transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4">
            <a 
              href="https://github.com/VenkataVilochan"
              className="flex items-center justify-center w-10 h-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-300 hover:scale-110"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            
            <a 
              href="https://www.linkedin.com/in/venkata-vilochan-b437482ba/"
              className="flex items-center justify-center w-10 h-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-300 hover:scale-110"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>

            <a 
              href="#"
              className="flex items-center justify-center w-10 h-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-300 hover:scale-110"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 pt-8">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Venkata Vilochan. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Crafted with passion using React, GSAP, and modern web technologies.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
