
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: "Progressive Web Application (PWA)",
      description: "E-commerce platform that works offline and supports push notifications with service workers, cache API, and responsive design.",
      image: "/lovable-uploads/e28d15ab-9242-44a8-9295-e5b7b12864ad.png",
      tech: ["React", "PWA", "Service Workers", "Cache API"],
      link: "#"
    },
    {
      title: "Online Learning Platform",
      description: "Platform supporting video streaming, progress tracking, user authentication, and data storage with student-friendly UI.",
      image: "/lovable-uploads/78aefb86-0a38-4612-a40f-345cd069f5cf.png",
      tech: ["React", "Node.js", "MongoDB", "Video Streaming"],
      link: "#"
    },
    {
      title: "Portfolio Website with Advanced Animations",
      description: "Personal portfolio using modern CSS animations, GSAP, and Three.js for visually appealing portfolio with smooth transitions.",
      image: "/lovable-uploads/ef441dc7-e5d7-4037-97a4-937cdd519f9f.png",
      tech: ["React", "GSAP", "Three.js", "CSS Animations"],
      link: "#"
    },
    {
      title: "Real-time Collaborative Document Editor",
      description: "Document editor using frameworks like React.js for dynamic UI with Node.js, Python backend, and MongoDB/PostgreSQL storage.",
      image: "/lovable-uploads/8aa8c2ec-6bf2-456a-a391-adf9930e466a.png",
      tech: ["React", "Node.js", "WebSocket", "Real-time"],
      link: "#"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo('.project-card',
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Project card hover effects
      document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { 
            y: -10, 
            scale: 1.02,
            duration: 0.3, 
            ease: "power2.out" 
          });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { 
            y: 0, 
            scale: 1,
            duration: 0.3, 
            ease: "power2.out" 
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="projects"
      ref={sectionRef}
      className="py-20 px-6"
    >
      <div className="container mx-auto max-w-7xl">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-5xl font-light text-white text-center mb-16"
        >
          Featured <span className="text-blue-400 font-normal">Projects</span>
        </h2>

        <div 
          ref={projectsRef}
          className="grid md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <div 
              key={index}
              className="project-card group relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              </div>
              
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <button className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg hover:from-blue-500 hover:to-violet-500 transition-all duration-300 transform hover:scale-105">
                  View Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
