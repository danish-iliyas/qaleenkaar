import React from 'react';
import { motion } from 'framer-motion';

const TrustSection = () => {
  // Data from your sketch
  const stats = [
    { label: "Carpets", value: "4000+" },
    { label: "Shawls", value: "15000+" },
    { label: "Experience", value: "41+ Yrs" },
    { label: "Legacy", value: "Since 1984" }
  ];

  const clients = [
    "EROS GROUP", "FAB INDIA", "DHAMPUR MILLS", "FILM CITY NOIDA", 
    "EROS GROUP", "FAB INDIA", "DHAMPUR MILLS", "FILM CITY NOIDA" // Doubled for seamless loop
  ];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* 1. TRUST SIGNALS (Stats Grid) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="text-center"
            >
              <h3 className="text-2xl md:text-4xl font-serif text-[#5A386D] mb-2 tracking-tight">
                {stat.value}
              </h3>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-gray-500 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 2. TRUSTED CLIENTS (Horizontal Infinite Scroll) */}
        <div className="relative border-t border-b border-gray-100 py-10">
          <div className="text-center mb-8">
            <h4 className="text-[11px] uppercase tracking-[0.4em]  font-bold text-gray-400">
              Trusted By
            </h4>
          </div>

          {/* Scrolling Container */}
          <div className="flex overflow-hidden group">
            <motion.div 
              className="flex whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ 
                repeat: Infinity, 
                ease: "linear", 
                duration: 25 
              }}
            >
              {clients.map((client, index) => (
                <span 
                  key={index} 
                  className="inline-block mx-12 text-sm md:text-lg font-serif text-gray-800 tracking-[0.2em] grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
                >
                  {client}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Fading Edges for that "Beautiful Animation" look */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
        </div>

      </div>
    </section>
  );
};

export default TrustSection;