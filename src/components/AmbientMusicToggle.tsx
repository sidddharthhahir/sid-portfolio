import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';

// Free royalty-free lo-fi ambient track
const AMBIENT_URL = 'https://cdn.pixabay.com/audio/2024/11/28/audio_3a4b4e14d4.mp3';

const AmbientMusicToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(AMBIENT_URL);
    audio.loop = true;
    audio.volume = 0.15;
    audio.preload = 'none';
    audioRef.current = audio;

    audio.addEventListener('canplaythrough', () => setIsLoaded(true));
    audio.addEventListener('error', () => setIsLoaded(false));

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.5, type: 'spring' }}
      onClick={toggle}
      className="fixed bottom-6 left-6 z-50 p-3 rounded-full backdrop-blur-2xl bg-black/40 border border-white/15 hover:border-emerald-400/40 transition-all duration-300 group hover:scale-110"
      title={isPlaying ? 'Pause ambient music' : 'Play ambient music'}
    >
      <div className="relative">
        {isPlaying ? (
          <Volume2 size={20} className="text-emerald-400" />
        ) : (
          <VolumeX size={20} className="text-gray-400 group-hover:text-emerald-400 transition-colors" />
        )}
        {isPlaying && (
          <>
            <motion.div
              animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 rounded-full border border-emerald-400/40"
            />
            <motion.div
              animate={{ scale: [1, 2.2], opacity: [0.3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              className="absolute inset-0 rounded-full border border-emerald-400/30"
            />
          </>
        )}
      </div>
      <AnimatePresence>
        {!isPlaying && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="absolute left-14 top-1/2 -translate-y-1/2 text-xs text-gray-400 whitespace-nowrap bg-black/60 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/10 hidden group-hover:block"
          >
            <Music size={12} className="inline mr-1.5" />
            Lo-fi vibes
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default AmbientMusicToggle;
