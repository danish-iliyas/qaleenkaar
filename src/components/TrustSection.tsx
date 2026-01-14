import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

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
    <section className="py-8 bg-gray-100 overflow-hidden">
      <div className="container bg-gray-100 px-[4px]">

        {/* 1. TRUST SIGNALS (Stats Grid) */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
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
        </div> */}

        {/* 2. TRUSTED CLIENTS (Horizontal Infinite Scroll) */}
        <div className="relative border-t border-b bg-gray-200 border-gray-100">
          <div className="text-center bg-gray-100 mb-8">
            <Link
              to="#"
              className="inline-flex items-center text-black uppercase tracking-[0.1em] text-xs md:text-sm lg:text-lg font-medium group"
            >
              <span className="border-b border-black pb-1 font-bold text-black group-hover:border-b-2 transition-all">
                Trusted by reputed customers
              </span>
              {/* <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" /> */}
            </Link>
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
                  className="inline-block mx-[10px] text-sm md:text-lg font-serif text-gray-800 tracking-[0.2em] grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
                >
                  {client}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Fading Edges - using gray-100 to match background */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-gray-100 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-gray-100 to-transparent z-10" />
        </div>

      </div>
    </section>
  );
};

export default TrustSection;
