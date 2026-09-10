import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070b14] px-6">
      <div className="text-center max-w-md">
        <p className="font-mono text-xs text-cyan-400/60 uppercase tracking-[0.3em] mb-4">404 · span not found</p>
        <h1 className="text-5xl font-black text-foreground mb-4">Dead link</h1>
        <p className="font-mono text-sm text-muted-foreground/60 mb-2 break-all">
          <span className="text-muted-foreground/30">GET</span> {location.pathname}
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          This route traces to nowhere. Every real one is on the home page.
        </p>
        <a
          href="/"
          className="inline-block px-5 py-2.5 rounded-full border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/10 transition-colors font-mono text-sm"
        >
          ← back to siddharth-ahir
        </a>
      </div>
    </div>
  );
};

export default NotFound;
