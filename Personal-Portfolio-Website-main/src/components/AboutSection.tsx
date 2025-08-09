
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(imageRef.current,
        { opacity: 0, x: -100, filter: 'blur(10px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1, ease: "power2.out" }
      )
      .fromTo(contentRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      )
      .fromTo('.skill-icon',
        { opacity: 0, scale: 0.5, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "back.out(1.7)" },
        "-=0.4"
      );

      // Image hover effect
      const profileImage = imageRef.current;
      if (profileImage) {
        profileImage.addEventListener('mouseenter', () => {
          gsap.to(profileImage, { 
            rotateY: 5, 
            rotateX: 5, 
            scale: 1.05, 
            duration: 0.3, 
            ease: "power2.out" 
          });
        });
        
        profileImage.addEventListener('mouseleave', () => {
          gsap.to(profileImage, { 
            rotateY: 0, 
            rotateX: 0, 
            scale: 1, 
            duration: 0.3, 
            ease: "power2.out" 
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skills = [
    { name: 'JavaScript', icon: '⚡' },
    { name: 'React', icon: '⚛️' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Python', icon: '🐍' },
    { name: 'Java', icon: '☕' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'GSAP', icon: '✨' }
  ];

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="py-20 px-6"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div 
            ref={imageRef}
            className="relative"
          >
            <div className="relative w-80 h-80 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <img 
                src="/lovable-uploads/c5247d67-1d5a-4f8e-bf12-329705e7df1f.png"
                alt="Venkata Vilochan"
                className="relative z-10 w-full h-full object-cover rounded-full border-4 border-white/20 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
              About <span className="text-blue-400 font-normal">Me</span>
            </h2>
            
            <div className="text-gray-300 text-lg leading-relaxed space-y-4">
              <p>
                Hello! I'm <span className="text-blue-400 font-medium">Venkata Vilochan</span>, 
                a passionate B.Tech CS&IT student with strong interests in software development, 
                space research, and public service.
              </p>
              <p>
                I specialize in both frontend and backend technologies, creating modern web applications 
                with advanced animations and seamless user experiences. My expertise spans across 
                multiple programming languages and frameworks.
              </p>
              <p>
                I've built several innovative projects including portfolio websites with advanced animations, 
                online learning platforms, real-time collaborative document editors, and Progressive Web Apps (PWAs).
              </p>
            </div>

            {/* Skills Grid */}
            <div ref={skillsRef} className="mt-8">
              <h3 className="text-xl text-white mb-4">Technical Skills</h3>
              <div className="grid grid-cols-4 gap-4">
                {skills.map((skill, index) => (
                  <div 
                    key={skill.name}
                    className="skill-icon p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-center hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </div>
                    <div className="text-sm text-gray-300">{skill.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
