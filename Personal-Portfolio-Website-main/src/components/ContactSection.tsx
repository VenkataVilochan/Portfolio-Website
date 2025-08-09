
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo('.contact-title',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      )
      .fromTo('.form-input',
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo('.submit-btn',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
        "-=0.2"
      )
      .fromTo('.social-icon',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" },
        "-=0.3"
      );

      // Input focus effects
      document.querySelectorAll('.form-input input, .form-input textarea').forEach(input => {
        input.addEventListener('focus', () => {
          gsap.to(input.parentElement, { 
            scale: 1.02,
            borderColor: '#3B82F6',
            duration: 0.3 
          });
        });
        
        input.addEventListener('blur', () => {
          gsap.to(input.parentElement, { 
            scale: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
            duration: 0.3 
          });
        });
      });

      // Social icon hover effects
      document.querySelectorAll('.social-icon').forEach(icon => {
        icon.addEventListener('mouseenter', () => {
          gsap.to(icon, { 
            scale: 1.1, 
            rotateZ: 5,
            duration: 0.3, 
            ease: "power2.out" 
          });
        });
        
        icon.addEventListener('mouseleave', () => {
          gsap.to(icon, { 
            scale: 1, 
            rotateZ: 0,
            duration: 0.3, 
            ease: "power2.out" 
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Animate submit button
    const submitBtn = document.querySelector('.submit-btn');
    gsap.to(submitBtn, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
      onComplete: () => {
        // Here you would typically send the form data
        console.log('Form submitted:', formData);
        // Reset form
        setFormData({ name: '', email: '', message: '' });
      }
    });
  };

  return (
    <section 
      id="contact"
      ref={sectionRef}
      className="py-20 px-6"
    >
      <div className="container mx-auto max-w-4xl">
        <h2 className="contact-title text-4xl md:text-5xl font-light text-white text-center mb-16">
          Let's <span className="text-blue-400 font-normal">Connect</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form 
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="form-input relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                required
                className="w-full px-6 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-300"
              />
            </div>

            <div className="form-input relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                required
                className="w-full px-6 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-300"
              />
            </div>

            <div className="form-input relative">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your Message"
                required
                rows={5}
                className="w-full px-6 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-300 resize-none"
              />
            </div>

            <button
              type="submit"
              className="submit-btn w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl font-medium hover:from-blue-500 hover:to-violet-500 transition-all duration-300 transform hover:scale-105"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info & Social */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white">Get in Touch</h3>
              <p className="text-gray-300 leading-relaxed">
                I'm always excited to discuss new opportunities, innovative projects, 
                or just chat about technology. Feel free to reach out!
              </p>
            </div>

            <div ref={socialRef} className="space-y-4">
              <h4 className="text-xl text-white mb-4">Connect with me</h4>
              <div className="flex space-x-4">
                <a 
                  href="#"
                  className="social-icon flex items-center justify-center w-12 h-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-300"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                
                <a 
                  href="#"
                  className="social-icon flex items-center justify-center w-12 h-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-300"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>

                <a 
                  href="mailto:contact@example.com"
                  className="social-icon flex items-center justify-center w-12 h-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
