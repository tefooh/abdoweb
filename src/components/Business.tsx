import { motion } from "motion/react";
import { Briefcase, Podcast, Zap } from "lucide-react";

const ventures = [
  {
    name: "Rokn Podcast",
    role: "Founder",
    status: "Currently under maintenance",
    icon: Podcast,
    link: "#",
  },
  {
    name: "Dietin",
    role: "CTO & AI Backend Developer",
    status: "Active",
    icon: Zap,
    link: "https://dietin.pro",
  },
  {
    name: "Wagha INC",
    role: "Co-Founder",
    status: "Digital solutions for businesses",
    icon: Briefcase,
    link: "#",
  },
];

export default function Business() {
  return (
    <section id="business" className="py-24 bg-white border-y border-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-medium-grey mb-4">
            04 // Business & Ventures
          </h2>
          <h3 className="text-5xl font-bold tracking-tighter">
            Ventures & <span className="text-gradient-primary">Leadership</span>.
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {ventures.map((venture, i) => (
            <motion.div
              key={venture.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 border border-black hover:bg-gradient-primary transition-all group"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="w-12 h-12 flex items-center justify-center border border-black group-hover:bg-black group-hover:text-white transition-colors">
                  <venture.icon size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-black text-white">
                  {venture.role}
                </span>
              </div>
              
              <h4 className="text-2xl font-bold mb-2">{venture.name}</h4>
              <p className="text-sm text-medium-grey mb-6 leading-relaxed">
                {venture.status}
              </p>
              
              {venture.link !== "#" && (
                <a
                  href={venture.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold underline underline-offset-4 hover:text-black transition-colors"
                >
                  Visit Website
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
