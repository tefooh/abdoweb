import { motion } from "motion/react";
import { Globe, Cpu, Layout, ArrowUpRight } from "lucide-react";

const services = [
  {
    title: "Websites and App Development",
    description: "From idea to launch, full cycle development.",
    icon: Globe,
    num: "01"
  },
  {
    title: "AI Automation Systems",
    description: "Integrating AI to optimize workflows and system intelligence.",
    icon: Cpu,
    num: "02"
  },
  {
    title: "UI/UX Design",
    description: "Minimal, clean, and user-focused interfaces.",
    icon: Layout,
    num: "03"
  },
];

export default function Services() {
  return (
    <section id="services" className="py-32 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-[10px] font-bold tracking-[0.4em] text-medium-grey mb-6">
              02 // Services
            </h2>
            <h3 className="text-6xl md:text-7xl font-display tracking-tight leading-none text-white">
              Engineering <span className="text-gradient-primary">Intelligence</span>.
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-dark-grey border border-dark-grey">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-black p-12 flex flex-col gap-10 group cursor-default"
            >
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 flex items-center justify-center border border-white/20 group-hover:border-gradient-primary transition-colors">
                  <service.icon size={28} className="text-white transition-colors" />
                </div>
                <span className="text-4xl font-display font-bold opacity-10 group-hover:opacity-100 group-hover:text-gradient-primary transition-all">
                  {service.num}
                </span>
              </div>
              
              <div className="flex-grow">
                <h4 className="text-3xl font-display mb-6 normal-case">
                  {service.title}
                </h4>
                <p className="text-medium-grey text-lg leading-relaxed normal-case">
                  {service.description}
                </p>
              </div>
              
              <div className="pt-6 border-t border-white/10 group-hover:border-gradient-primary transition-colors">
                <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-medium-grey group-hover:text-white transition-colors normal-case">
                  Contact <ArrowUpRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
