import { PORTFOLIO } from '@/config/portfolio';

/** Closing terminal prompt — the same line his GitHub profile README ends on, for anyone who reads both. */
export const Footer = () => {
  const { social, personal } = PORTFOLIO;
  const year = new Date().getFullYear();

  return (
    <footer className="relative py-14 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-5 text-center">
        <p className="font-mono text-sm text-cyan-400/70">
          <span className="text-muted-foreground/40">$</span> echo "still reading? then you're exactly who I want to talk to."
        </p>
        <div className="flex items-center gap-5 text-xs font-mono text-muted-foreground">
          <a href={`mailto:${personal.email}`} className="hover:text-cyan-400 transition-colors">email</a>
          <span className="text-muted-foreground/30">·</span>
          <a href={social.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">github</a>
          <span className="text-muted-foreground/30">·</span>
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">linkedin</a>
        </div>
        <p className="text-[10px] font-mono text-muted-foreground/90">
          © {year} {personal.name} · built, broken, and fixed in public
        </p>
      </div>
    </footer>
  );
};
