
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Preloader } from '../components/Preloader';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { Navigation } from '../components/Navigation';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Main content fade in after preloader
    gsap.set(mainRef.current, { opacity: 0 });
    
    // Smooth scroll setup
    gsap.config({ 
      autoSleep: 60,
      force3D: false,
      nullTargetWarn: false
    });

    // Floating orbs animation
    const orbs = document.querySelectorAll('.floating-orb');
    orbs.forEach((orb, index) => {
      gsap.to(orb, {
        y: -30,
        x: index % 2 === 0 ? 20 : -20,
        duration: 4 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: index * 0.3
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handlePreloaderComplete = () => {
    gsap.to(mainRef.current, {
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    });
  };

  return (
    <div className="relative min-h-screen bg-slate-900 overflow-x-hidden">
      <Preloader onComplete={handlePreloaderComplete} />
      
      {/* Floating Background Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="floating-orb absolute top-20 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
        <div className="floating-orb absolute top-40 right-20 w-24 h-24 bg-violet-500/20 rounded-full blur-xl"></div>
        <div className="floating-orb absolute bottom-40 left-1/4 w-28 h-28 bg-teal-500/20 rounded-full blur-xl"></div>
        <div className="floating-orb absolute bottom-20 right-1/3 w-20 h-20 bg-indigo-500/20 rounded-full blur-xl"></div>
      </div>

      <div ref={mainRef} className="relative z-10">
        <Navigation />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
