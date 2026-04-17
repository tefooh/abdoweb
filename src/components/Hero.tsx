import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-3 py-1 bg-gradient-primary text-xs font-bold uppercase tracking-widest mb-6">
            AI Engineer & Data Analyst
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tighter mb-6">
            Building websites, apps, and <span className="text-gradient-primary">intelligent systems</span> with precision.
          </h1>
          <p className="text-lg text-medium-grey max-w-lg mb-10 leading-relaxed">
            Abdelrahman Elfekky focuses on creating powerful digital products. 
            From idea to execution, he builds complete solutions that combine development, design, and AI Automation.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="px-8 py-4 bg-black text-white font-bold flex items-center gap-2 hover:bg-soft-black transition-all group"
            >
              View Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border border-black font-bold hover:bg-black hover:text-white transition-all"
            >
              Contact Me
            </a>
          </div>
          
          <div className="mt-12 flex items-center gap-6 text-sm font-bold uppercase tracking-widest text-medium-grey">
            <span>AI</span>
            <span className="w-8 h-[1px] bg-light-grey"></span>
            <span>Development</span>
            <span className="w-8 h-[1px] bg-light-grey"></span>
            <span>Systems Thinking</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative aspect-square flex items-center justify-center"
        >
          {/* Minimalist Line Art Illustration Placeholder */}
          <div className="relative w-full h-full max-w-md">
            <svg viewBox="0 0 400 400" className="w-full h-full line-art-icon">
              {/* Abstract geometric human-centered visual */}
              <circle cx="200" cy="150" r="60" />
              <path d="M100 350 C 100 250, 300 250, 300 350" />
              <rect x="140" y="220" width="120" height="10" />
              <line x1="200" y1="210" x2="200" y2="230" />
              {/* Decorative lines */}
              <motion.path
                d="M50 50 L100 100"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              />
              <motion.path
                d="M350 50 L300 100"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
              />
              <circle cx="200" cy="200" r="180" className="opacity-10" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
