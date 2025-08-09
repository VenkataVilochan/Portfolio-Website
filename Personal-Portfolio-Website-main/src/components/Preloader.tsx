
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Text animation
    tl.fromTo(textRef.current, 
      { opacity: 0, y: 30, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: "power2.out" }
    )
    .to(progressBarRef.current, {
      width: "100%",
      duration: 2.5,
      ease: "power2.out"
    }, "-=0.5")
    .to(textRef.current, {
      opacity: 0.7,
      duration: 0.5
    }, "-=1")
    .to(preloaderRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        if (preloaderRef.current) {
          preloaderRef.current.style.display = 'none';
        }
        onComplete();
      }
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-50 bg-slate-900 flex items-center justify-center"
    >
      <div className="text-center space-y-8">
        <div 
          ref={textRef}
          className="text-4xl md:text-6xl font-light text-white tracking-wider"
        >
          Venkata Vilochan
          <div className="text-xl md:text-2xl text-blue-400 mt-2 font-normal">
            Web Developer
          </div>
        </div>
        
        <div className="w-80 h-1 bg-slate-800 rounded-full overflow-hidden">
          <div 
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full w-0"
          ></div>
        </div>
      </div>
    </div>
  );
};
