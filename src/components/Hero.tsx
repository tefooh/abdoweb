import { motion } from "motion/react";
import Antigravity from "./Antigravity";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Antigravity Background */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <Antigravity
          count={400}
          magnetRadius={12}
          ringRadius={10}
          waveSpeed={0.3}
          waveAmplitude={1.5}
          particleSize={1.2}
          lerpSpeed={0.04}
          color="#000000"
          autoAnimate={true}
          particleVariance={1}
          rotationSpeed={0.1}
          depthFactor={1.5}
          fieldStrength={8}
        />
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <div className="text-[10px] uppercase tracking-[0.6em] text-medium-grey mb-12">
            Elfekky Identity
          </div>
          
          <h1 className="text-6xl md:text-[9rem] font-display leading-none tracking-tighter mb-16">
            AI & <br/>
            Data Analyst.
          </h1>
          
          <a 
            href="#work" 
            className="inline-block px-12 py-4 border border-black text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all rounded-full"
          >
            Explore Work
          </a>
        </motion.div>
      </div>
    </section>
  );
}

