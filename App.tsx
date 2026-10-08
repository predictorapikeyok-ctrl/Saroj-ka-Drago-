import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import CyberGrid from './components/CyberGrid';
import WelcomeScreen from './components/WelcomeScreen';
import PredictorScreen from './components/PredictorScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'predictor'>('welcome');

  return (
    <div className="relative min-h-screen bg-[#02020a] overflow-x-hidden text-white flex flex-col">
      {/* Cyber animated playground background on all screens */}
      <CyberGrid />

      {/* Screen container with transition animations */}
      <div className="relative z-10 flex-1 flex flex-col w-full h-full">
        <AnimatePresence mode="wait">
          {currentScreen === 'welcome' ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="flex-1 flex flex-col w-full"
            >
              <WelcomeScreen onStart={() => setCurrentScreen('predictor')} />
            </motion.div>
          ) : (
            <motion.div
              key="predictor"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="flex-1 flex flex-col w-full"
            >
              <PredictorScreen onBack={() => setCurrentScreen('welcome')} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
