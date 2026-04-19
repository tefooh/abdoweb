import { motion } from "motion/react";
import { Briefcase, Podcast, Zap, ArrowRight } from "lucide-react";

const ventures = [
  {
    name: "Rokn Podcast",
    role: "Founder",
    description: "A space for deep conversations and insights. Currently under maintenance.",
    icon: Podcast,
    link: "#",
  },
  {
    name: "Dietin",
    role: "CTO & AI Backend Developer",
    description: "Smarter nutrition and health management powered by AI.",
    icon: Zap,
    link: "https://dietin.pro",
  },
  {
    name: "Wagha INC",
    role: "Co-Founder",
    description: "Digital solutions for businesses, from concept to execution, including branding, development, and AI-powered systems.",
    icon: Briefcase,
    link: "#",
  },
];

export default function Business() {
  return (
    <section id="business" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24">
          <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-medium-grey mb-6">
            04 // Business & Ventures
          </h2>
          <h3 className="text-6xl md:text-7xl font-bold tracking-tighter leading-none">
            Ventures & <span className="text-gradient-primary">Leadership</span>.
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-black border border-black">
          {ventures.map((venture, i) => (
            <motion.div
              key={venture.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-white p-12 flex flex-col gap-10 hover:bg-gradient-primary transition-all duration-700 group cursor-default"
            >
              <div className="flex items-start justify-between">
                <div className="w-16 h-16 flex items-center justify-center border border-black group-hover:bg-black group-hover:text-white transition-all duration-500">
                  <venture.icon size={32} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-black text-white">
                  {venture.role}
                </span>
              </div>
              
              <div className="flex-grow">
                <h4 className="text-3xl font-bold mb-4">{venture.name}</h4>
                <p className="text-medium-grey text-lg leading-relaxed group-hover:text-black transition-colors duration-500">
                  {venture.description}
                </p>
              </div>
              
              {venture.link !== "#" && (
                <a
                  href={venture.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-500"
                >
                  Visit Website <ArrowRight size={16} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative Line Art */}
      <div className="absolute bottom-0 right-0 w-64 h-64 border-t border-l border-black/5 -z-10 translate-x-32 translate-y-32"></div>
    </section>
  );
}
