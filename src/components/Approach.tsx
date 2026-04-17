import { motion } from "motion/react";

const steps = [
  "Idea & Strategy",
  "Brand Identity",
  "Design & Architecture",
  "Development",
  "Integration of AI Automation",
  "Launch & Optimization",
];

export default function Approach() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-medium-grey mb-4">
              05 // Approach
            </h2>
            <h3 className="text-5xl font-bold tracking-tighter mb-8">
              A Structured <span className="text-gradient-primary">Process</span>.
            </h3>
            <p className="text-lg text-medium-grey leading-relaxed mb-8">
              Every project follows a structured process to ensure the highest quality and scalability. 
              The goal is always the same: build systems that are not just functional, but intelligent and scalable.
            </p>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-black/10"></div>
            
            <div className="flex flex-col gap-12">
              {steps.map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-12 flex items-center group"
                >
                  {/* Dot */}
                  <div className="absolute left-0 w-8 h-8 bg-white border border-black flex items-center justify-center font-bold text-xs group-hover:bg-black group-hover:text-white transition-colors">
                    {i + 1}
                  </div>
                  <h4 className="text-xl font-bold tracking-tight group-hover:text-gradient-primary transition-all">
                    {step}
                  </h4>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
