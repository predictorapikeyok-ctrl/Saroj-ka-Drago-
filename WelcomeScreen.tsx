import { motion } from 'motion/react';
import { Send, Cpu } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="relative min-h-screen flex flex-col justify-between items-center px-4 py-8 md:py-12 z-10 font-iceland">
      {/* Upper Space Header - Spacer to offset the logo downwards as instructed */}
      <div className="w-full max-w-md text-center pt-8 opacity-40">
      </div>

      {/* Main Content Area - Positioned thoda niche (slightly below center) as requested */}
      <div className="flex-1 flex flex-col justify-center items-center max-w-md w-full my-auto z-10">
        {/* Logo Container with no background glows or lights */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative mb-0 mt-1 md:mt-2"
        >
          {/* Logo Frame - Background circles and glowing lights removed, size enlarged to w-80 h-80 / md:w-[400px] md:h-[400px] */}
          <div className="relative w-80 h-80 md:w-[400px] md:h-[400px] p-2 flex items-center justify-center">
            <img
              src="https://i.ibb.co/KcgyD6L6/Logo-Transparent-D01-HBKjp.png"
              alt="Drago Predictor Logo"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // If the user's specific Image fails to load, gracefully fallback to a high-end cyber dragon SVG icon
                const img = e.currentTarget;
                img.style.display = 'none';
                const parent = img.parentElement;
                if (parent) {
                  const fallback = document.createElement('div');
                  fallback.className = 'text-cyan-400 text-6xl font-bold flex flex-col items-center justify-center';
                  fallback.innerHTML = `
                    <svg viewBox="0 0 24 24" width="140" height="140" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                    <span class="text-xs uppercase tracking-[0.2em] mt-2 text-cyan-200">DRAGO 4.0</span>
                  `;
                  parent.appendChild(fallback);
                }
              }}
            />
          </div>
        </motion.div>

        {/* Text Area - Lifted up closer to logo */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center px-4 -mt-4 md:-mt-8"
        >
          {/* Welcome Title with dynamic inline coloring */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white tracking-widest font-iceland font-bold uppercase mb-2">
            Welcome to <span className="text-cyan-400 neon-glow-cyan">Drago 4.0</span> <span className="text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">Turbo</span>
          </h1>
          
          {/* Small Subtitle */}
          <p className="text-lg md:text-xl text-cyan-300 font-iceland font-medium opacity-95 tracking-wide mb-5 uppercase">
            Click below to start the predictor!
          </p>
        </motion.div>

        {/* Buttons Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="w-full flex flex-col gap-4 px-6 md:px-8 mt-2"
        >
          {/* Button 1: Let's Start */}
          <button
            onClick={onStart}
            id="btn-lets-start"
            className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 font-iceland text-2xl font-bold tracking-widest uppercase text-white shadow-[0_0_20px_rgba(0,162,255,0.4)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(0,162,255,0.6)] active:scale-[0.98] cursor-pointer"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute -inset-y-0 w-12 bg-white/20 transform skew-x-12 -translate-x-full group-hover:animate-[shine_0.8s_ease-out]" />
            <span className="relative flex items-center justify-center gap-3">
              <Cpu className="w-6 h-6 text-white animate-spin-slow" />
              LET'S START
            </span>
          </button>

          {/* Button 2: Join Telegram */}
          <a
            href="https://t.me/+uu1UAjycgzNjNjZl"
            target="_blank"
            rel="noopener noreferrer"
            id="btn-join-telegram"
            className="group relative w-full overflow-hidden rounded-xl bg-transparent border-2 border-dashed border-blue-500/40 px-6 py-3.5 font-iceland text-xl font-bold tracking-widest uppercase text-cyan-200 transition-all duration-300 hover:border-cyan-400 hover:text-white hover:bg-blue-600/10 active:scale-[0.98] cursor-pointer"
          >
            <span className="relative flex items-center justify-center gap-3">
              <Send className="w-5 h-5 text-blue-400 group-hover:text-cyan-300 group-hover:animate-bounce" />
              JOIN TELEGRAM
            </span>
          </a>
        </motion.div>
      </div>

      {/* Footer Branding Area - Text content removed */}
      <div className="w-full max-w-md text-center pt-8 opacity-20 text-[10px] uppercase font-mono tracking-widest text-cyan-500/60">
      </div>
    </div>
  );
}
