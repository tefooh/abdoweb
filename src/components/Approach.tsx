import { motion } from "motion/react";

const steps = [
  { num: "01", title: "Strategy", desc: "Defining goals." },
  { num: "02", title: "Identity", desc: "Visual voice." },
  { num: "03", title: "Architecture", desc: "System structure." },
  { num: "04", title: "Development", desc: "Engineering code." },
  { num: "05", title: "AI Automation", desc: "Integrating intelligence." },
  { num: "06", title: "Optimization", desc: "Fine-tuning." },
];

export default function Approach() {
  return (
    <section id="approach" className="py-32 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24">
          <h2 className="text-[10px] font-bold tracking-[0.4em] text-medium-grey mb-6">
            04 // Approach
          </h2>
          <h3 className="text-6xl md:text-7xl font-display tracking-tight leading-none text-white">
            A Structured <span className="text-gradient-primary">Process</span>.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative pl-12 border-l border-white/10 group hover:border-gradient-primary transition-colors duration-500"
            >
              <div className="absolute -left-3 top-0 w-6 h-6 bg-black border border-white/20 flex items-center justify-center font-display text-[10px] font-bold group-hover:border-gradient-primary transition-colors duration-500">
                {step.num}
              </div>
              <h4 className="text-2xl font-display mb-4 group-hover:text-gradient-primary transition-colors duration-500 normal-case">
                {step.title}
              </h4>
              <p className="text-medium-grey text-sm leading-relaxed normal-case">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
