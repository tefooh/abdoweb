import { motion } from "motion/react";
import { Github, Linkedin, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const socials = [
    { name: "GitHub", icon: Github, href: "https://github.com/AbdelruhmanAshraf" },
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/abdelruhamanelfekky/" },
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/elfekkyy/" },
    { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/@Elfekki" },
  ];

  return (
    <footer className="bg-white text-black py-8 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <img src="/assets/logo&text.png" alt="Elfekky" className="h-10 mb-4" />
            <div className="flex gap-4">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-medium-grey hover:text-black transition-all"
                  aria-label={social.name}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-2 text-[9px] font-bold uppercase tracking-widest text-medium-grey">
            <p>© 2026 Elfekky.</p>
            <a href="mailto:abdelruhamanelfekky@gmail.com" className="hover:text-black transition-colors">
              abdelruhamanelfekky@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
