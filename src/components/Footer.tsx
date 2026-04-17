import { motion } from "motion/react";
import { Mail, Phone, Globe, Youtube, Linkedin, Github, Instagram, ArrowUpRight } from "lucide-react";

const socials = [
  { name: "TikTok", link: "https://www.tiktok.com/@elfekkyy", icon: Globe },
  { name: "YouTube", link: "https://www.youtube.com/@Elfekki", icon: Youtube },
  { name: "LinkedIn", link: "https://www.linkedin.com/in/abdelruhamanelfekky/", icon: Linkedin },
  { name: "GitHub", link: "https://github.com/AbdelruhmanAshraf", icon: Github },
  { name: "Instagram", link: "https://www.instagram.com/elfekkyy/", icon: Instagram },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-black text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-medium-grey mb-4">
              06 // Contact
            </h2>
            <h3 className="text-6xl font-bold tracking-tighter mb-8">
              Let's build <span className="text-gradient-primary">something</span> great.
            </h3>
            
            <div className="flex flex-col gap-6">
              <a
                href="mailto:abdelruhamanelfekky@gmail.com"
                className="flex items-center gap-4 text-2xl font-bold group"
              >
                <div className="w-12 h-12 border border-white/20 flex items-center justify-center group-hover:border-white transition-colors">
                  <Mail size={24} />
                </div>
                <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[--color-brand-primary-start] group-hover:to-[--color-brand-primary-end] transition-all">
                  abdelruhamanelfekky@gmail.com
                </span>
              </a>
              <a
                href="tel:01080620024"
                className="flex items-center gap-4 text-2xl font-bold group"
              >
                <div className="w-12 h-12 border border-white/20 flex items-center justify-center group-hover:border-white transition-colors">
                  <Phone size={24} />
                </div>
                <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[--color-brand-primary-start] group-hover:to-[--color-brand-primary-end] transition-all">
                  01080620024
                </span>
              </a>
              <a
                href="http://www.elfekky.site"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-2xl font-bold group"
              >
                <div className="w-12 h-12 border border-white/20 flex items-center justify-center group-hover:border-white transition-colors">
                  <Globe size={24} />
                </div>
                <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[--color-brand-primary-start] group-hover:to-[--color-brand-primary-end] transition-all">
                  www.elfekky.site
                </span>
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-8">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-6 border border-white/10 hover:border-white hover:bg-white hover:text-black transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <social.icon size={20} />
                    <span className="font-bold">{social.name}</span>
                  </div>
                  <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
            
            <div className="mt-16 lg:mt-0">
              <p className="text-medium-grey text-sm mb-4">
                © {new Date().getFullYear()} Abdelrahman Elfekky. All rights reserved.
              </p>
              <p className="text-xs text-dark-grey uppercase tracking-widest font-bold">
                From none to the universe
              </p>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-display text-2xl font-bold tracking-tighter">
            ELFEKKY<span className="text-gradient-primary">.</span>
          </div>
          <p className="text-medium-grey text-sm italic">
            Building systems that think.
          </p>
        </div>
      </div>
    </footer>
  );
}
