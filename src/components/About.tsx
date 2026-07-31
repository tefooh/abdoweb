import { motion } from "motion/react";

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-medium-grey mb-4">
              01 // About
            </h2>
            <h3 className="text-4xl font-bold tracking-tighter">
              The Architect of <span className="text-gradient-primary">Intelligent Ecosystems</span>.
            </h3>
          </div>
          
          <div className="lg:col-span-8 flex flex-col gap-8">
            <p className="text-2xl font-medium leading-tight">
              Abdelrahman Elfekky, known as Elfekky, is an Artificial Intelligence Engineer and Data Analyst with a strong focus on building real-world digital solutions.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-medium-grey leading-relaxed">
              <p>
                He is a Data Science student at the Faculty of Artificial Intelligence, driven by a passion for AI, data, and content creation. His work revolves around turning ideas into fully functional products, whether it's a website, a mobile app, or a complete digital system.
              </p>
              <p>
                What sets him apart is his ability to integrate <strong>AI Automation</strong> into products, creating smarter, more efficient systems that go beyond traditional development. He doesn’t just build products, he engineers complete ecosystems.
              </p>
            </div>
            
            <div className="mt-8 p-8 border border-black relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-primary"></div>
              <p className="text-xl font-bold italic">
                "Elfekky builds more than digital products. He builds systems that think."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
