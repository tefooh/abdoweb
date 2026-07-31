import { motion } from "motion/react";
import { Globe, Cpu, Layout, Palette, Share2 } from "lucide-react";

const services = [
  {
    title: "Websites and App Development",
    description: "From idea to launch, full cycle development including frontend, backend, and deployment.",
    icon: Globe,
  },
  {
    title: "AI Automation Systems",
    description: "Designing and integrating AI Automation to optimize workflows, reduce manual effort, and enhance system intelligence.",
    icon: Cpu,
  },
  {
    title: "UI/UX Design",
    description: "Minimal, clean, and user-focused interfaces aligned with modern standards.",
    icon: Layout,
  },
  {
    title: "Brand Identity",
    description: "Creating complete visual identities that define and elevate digital products.",
    icon: Palette,
  },
  {
    title: "Content & Media Creation",
    description: "Building strong online presence through strategic and engaging content.",
    icon: Share2,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-medium-grey mb-4">
            02 // Services
          </h2>
          <h3 className="text-5xl font-bold tracking-tighter">
            What He <span className="text-gradient-primary">Does</span>.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-dark-grey border border-dark-grey">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-black p-10 flex flex-col gap-6 hover:bg-soft-black transition-colors group"
            >
              <div className="w-12 h-12 flex items-center justify-center border border-white/20 group-hover:border-white transition-colors">
                <service.icon size={24} className="text-white" />
              </div>
              <h4 className="text-2xl font-bold leading-tight">{service.title}</h4>
              <p className="text-medium-grey leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
