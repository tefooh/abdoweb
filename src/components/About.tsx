import { motion } from "motion/react";

export default function About() {
  return (
    <section id="about" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative aspect-square w-full max-w-md mx-auto">
              {/* Squircle Mask Container */}
              <div 
                className="w-full h-full bg-black overflow-hidden relative"
                style={{ clipPath: "url(#squircleMask)" }}
              >
                <img 
                  src="/assets/ElfekkyImage.png" 
                  alt="Elfekky" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              
              <svg width="0" height="0" className="absolute">
                <defs>
                  <clipPath id="squircleMask" clipPathUnits="objectBoundingBox">
                    <path d="M .5,0 C .1,0 0,.1 0,.5 0,.9 .1,1 .5,1 .9,1 1,.9 1,.5 1,.1 .9,0 .5,0 Z" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          
          <div className="lg:col-span-7 order-1 lg:order-2">
            <h2 className="text-[10px] font-bold tracking-[0.4em] text-medium-grey mb-6">
              01 // Profile
            </h2>
            <h3 className="text-4xl md:text-6xl font-display tracking-tight leading-[0.9] mb-12">
              Personal Profile.
            </h3>
            
            <div className="max-w-xl flex flex-col gap-10">
              <p className="text-2xl font-display leading-tight">
                AI Engineer and Data Analyst building digital solutions.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="p-6 border border-black/10 bg-white/50 flex flex-col gap-2 flex-1 min-w-[280px]">
                  <span className="text-[10px] font-bold text-medium-grey">Education & Focus</span>
                  <p className="text-lg font-display leading-tight">Data science student turning concepts into products.</p>
                </div>
                <div className="p-6 border border-black/10 bg-white/50 flex flex-col gap-2 flex-1 min-w-[280px]">
                  <span className="text-[10px] font-bold text-medium-grey">Specialization</span>
                  <p className="text-lg font-display leading-tight">Specialized in AI automation integration.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
