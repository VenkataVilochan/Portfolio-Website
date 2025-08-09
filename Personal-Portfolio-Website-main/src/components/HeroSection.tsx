
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 4 });

    tl.fromTo(headlineRef.current,
      { opacity: 0, y: 50, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: "power2.out" }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(ctaRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
      "-=0.4"
    )
    .fromTo(splineRef.current,
      { opacity: 0, x: 100, filter: 'blur(20px)' },
      { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1.5, ease: "power2.out" },
      "-=1"
    );

    // CTA hover animation
    const ctaButton = ctaRef.current;
    if (ctaButton) {
      ctaButton.addEventListener('mouseenter', () => {
        gsap.to(ctaButton, { scale: 1.05, duration: 0.3, ease: "power2.out" });
      });
      
      ctaButton.addEventListener('mouseleave', () => {
        gsap.to(ctaButton, { scale: 1, duration: 0.3, ease: "power2.out" });
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Spline 3D */}
      <div 
        ref={splineRef}
        className="absolute inset-0 z-0"
      >
        <iframe 
          src='https://my.spline.design/orb-YAfszKnqbxXGpDfMbR83BiS0/' 
          className="w-full h-full border-0"
          title="3D Background"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div 
          ref={headlineRef}
          className="text-4xl md:text-7xl font-light text-white mb-6 leading-tight"
        >
          Hi, I'm{' '}
          <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent font-normal">
            Venkata Vilochan
          </span>
          {' '}– Web Developer
        </div>
        
        <div 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Passionate B.Tech CS&IT student specializing in modern web development 
          with expertise in full-stack technologies and creative digital solutions.
        </div>
        
        <button
          ref={ctaRef}
          className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-full text-lg font-medium overflow-hidden group transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25"
        >
          <span className="relative z-10">Hire Me</span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>
    </section>
  );
};
