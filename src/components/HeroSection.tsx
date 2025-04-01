'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onCtaClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onCtaClick }) => {
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const opacity = Math.max(1 - scrollY / 700, 0.2);
      const translateY = scrollY * 0.5;
      
      heroRef.current.style.opacity = opacity.toString();
      heroRef.current.style.transform = `translateY(${translateY}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, -0.01, 0.9],
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(88, 140, 126, 0.4)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <section 
      className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-[#96CEB4]/30 to-[#588C7E]/40"
      dir="rtl"
    >
      {/* Background blur elements for glassmorphism effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#588C7E]/30 blur-3xl"></div>
        <div className="absolute top-40 left-20 h-72 w-72 rounded-full bg-[#96CEB4]/40 blur-3xl"></div>
        <div className="absolute bottom-20 right-40 h-56 w-56 rounded-full bg-[#588C7E]/20 blur-3xl"></div>
      </div>

      <div className="container mx-auto h-full px-4 py-8 md:px-8 lg:px-16">
        <div className="relative grid h-full items-center gap-8 lg:grid-cols-2">
          
          {/* Content Section */}
          <motion.div 
            ref={heroRef}
            className="z-10 order-2 flex flex-col items-end justify-center lg:order-1"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div
              variants={itemVariants}
              className="mb-6 w-full rounded-2xl bg-white/10 p-8 backdrop-blur-md 
                        border border-white/20 shadow-lg"
              style={{
                boxShadow: "0 8px 32px 0 rgba(88, 140, 126, 0.2)",
                backdropFilter: "blur(8px)",
              }}
            >
              <motion.h1 
                variants={itemVariants}
                className="mb-4 text-4xl font-bold text-[#588C7E] md:text-5xl lg:text-6xl"
              >
                מספרה ביתא
              </motion.h1>
              
              <motion.h2 
                variants={itemVariants}
                className="mb-2 text-3xl font-semibold text-gray-800 md:text-4xl"
              >
                מספרה מוביל בישראל
              </motion.h2>
              
              <motion.p 
                variants={itemVariants}
                className="mb-8 text-xl text-gray-700"
              >
                חווית לקוח מושלמת בכל ביקור
              </motion.p>
              
              <motion.button
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={onCtaClick}
                className="rounded-full bg-gradient-to-r from-[#588C7E] to-[#96CEB4] px-8 py-4 
                          text-lg font-bold text-white shadow-lg transition-all 
                          hover:from-[#4d7d70] hover:to-[#7fb99d] focus:outline-none focus:ring-2 
                          focus:ring-[#588C7E] focus:ring-offset-2"
              >
                קבע תור עכשיו
              </motion.button>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="mt-6 rounded-lg bg-white/5 p-4 backdrop-blur-sm 
                        border border-white/10 shadow-md"
            >
              <p className="text-right text-gray-700">
                אנחנו מספרה מוביל בתחום המזון עם ניסיון של שנים רבות. אנחנו מתמחים במתן שירות מקצועי ואיכותי ללקוחותינו.
              </p>
            </motion.div>
          </motion.div>
          
          {/* Image Section */}
          <motion.div 
            className="order-1 flex h-full items-center justify-center lg:order-2"
            initial={{ opacity: 0, x: 100 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              transition: { 
                duration: 1.2,
                ease: "easeOut"
              }
            }}
          >
            <div className="relative h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] md:h-[500px] md:w-[500px]">
              <div className="absolute inset-0 rounded-full bg-[#588C7E]/10 backdrop-blur-md 
                            border border-white/20 shadow-xl"
                  style={{
                    boxShadow: "0 8px 32px 0 rgba(88, 140, 126, 0.3)",
                  }}>
              </div>
              <div className="absolute inset-2 overflow-hidden rounded-full border border-white/30">
                <Image
                  src="/modern-salon.jpg" // Placeholder - replace with actual image path
                  alt="מספרה מודרנית עם אלמנטים טכנולוגיים"
                  fill
                  objectFit="cover"
                  className="transition-transform duration-700 hover:scale-110"
                  priority
                />
              </div>
            </div>
          </motion.div>
          
          {/* Floating elements for additional visual interest */}
          <motion.div 
            className="absolute -bottom-4 right-1/4 h-20 w-20 rounded-full bg-[#96CEB4]/30 
                      backdrop-blur-sm border border-white/20"
            animate={{ 
              y: [0, -15, 0],
              transition: {
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          />
          
          <motion.div 
            className="absolute top-1/4 left-10 h-12 w-12 rounded-full bg-[#588C7E]/20 
                      backdrop-blur-sm border border-white/20"
            animate={{ 
              y: [0, 20, 0],
              transition: {
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;