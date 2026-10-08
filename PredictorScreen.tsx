import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Send, 
  Cpu, 
  ShieldCheck, 
  History, 
  Search, 
  TrendingUp, 
  Volume2, 
  VolumeX,
  Zap,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { GameTab, PredictionRecord } from '../types';

interface PredictorScreenProps {
  onBack: () => void;
}

// Initial mockup history records
const INITIAL_HISTORY: PredictionRecord[] = [
  { id: '1', period: '592', gameType: 'wingo1', result: 'BIG', color: 'red', accuracy: 98.8, timestamp: '14:31', status: 'WIN' },
  { id: '2', period: '591', gameType: 'wingo1', result: 'SMALL', color: 'green', accuracy: 99.1, timestamp: '14:30', status: 'WIN' },
  { id: '3', period: '590', gameType: 'wingo3', result: 'BIG', color: 'green', accuracy: 97.5, timestamp: '14:28', status: 'WIN' },
  { id: '4', period: '342', gameType: 'aviator', result: 'MULTIPLIER', multiplier: '3.42x', accuracy: 98.4, timestamp: '14:26', status: 'WIN' },
  { id: '5', period: '589', gameType: 'wingo1', result: 'SMALL', color: 'red', accuracy: 96.9, timestamp: '14:25', status: 'WIN' },
];

export default function PredictorScreen({ onBack }: PredictorScreenProps) {
  const [activeTab, setActiveTab] = useState<GameTab>('wingo1');
  const [periodInput, setPeriodInput] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [scanStatus, setScanStatus] = useState<string>('Initializing server connection...');
  const [predictionResult, setPredictionResult] = useState<PredictionRecord | null>(null);
  const [historyList, setHistoryList] = useState<PredictionRecord[]>(INITIAL_HISTORY);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [liveAutoPeriod, setLiveAutoPeriod] = useState<number>(601);

  // Auto increment simulated period code to feel alive
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveAutoPeriod((prev) => prev + 1);
    }, 60000); // Increments every minute, representing real Wingo cycles
    return () => clearInterval(timer);
  }, []);

  // Sync inputs with live system period
  const handleSyncPeriod = () => {
    setPeriodInput(liveAutoPeriod.toString());
    playBeep(440, 100);
  };

  // Safe synthesizer beep for retro tactile premium feedback
  const playBeep = (frequency = 600, duration = 80) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration/1000);

      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + duration/1000);
    } catch (e) {
      console.warn('Audio feedback failed or was blocked by browser policies.', e);
    }
  };

  const handlePredict = () => {
    if (!periodInput.trim()) {
      alert('Please enter a period number first!');
      return;
    }

    playBeep(880, 120);
    setIsScanning(true);
    setScanProgress(0);
    setPredictionResult(null);

    const statuses = [
      'Establishing secure socket tunnels...',
      'Intercepting system hashes...',
      'Parsing server probability algorithms...',
      'Applying Drago 4.0 Neural weights...',
      'Synthesizing ultimate projection values...',
      'Prediction generated successfully!'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        const nextProgress = prev + 5;
        
        // Update statuses incrementally
        const statusIdx = Math.floor((nextProgress / 100) * statuses.length);
        if (statuses[statusIdx] && statuses[statusIdx] !== scanStatus) {
          setScanStatus(statuses[statusIdx]);
          playBeep(400 + nextProgress * 4, 40);
        }

        if (nextProgress >= 100) {
          clearInterval(interval);
          finalizePrediction();
          return 100;
        }
        return nextProgress;
      });
    }, 120);
  };

  const finalizePrediction = () => {
    // Determine randomized but elegant high-accuracy predictions
    const accuracy = parseFloat((95 + Math.random() * 4).toFixed(1)); // 95% - 99% accuracy
    const isWingo = activeTab === 'wingo1' || activeTab === 'wingo3';
    
    let result: 'BIG' | 'SMALL' | 'RED' | 'GREEN' | 'MULTIPLIER' = 'BIG';
    let color: 'red' | 'green' = Math.random() > 0.5 ? 'red' : 'green';
    let multiplier: string | undefined;

    if (isWingo) {
      result = Math.random() > 0.5 ? 'BIG' : 'SMALL';
    } else {
      result = 'MULTIPLIER';
      // Typical high performance multipliers
      const ranges = [2.34, 1.85, 4.12, 1.56, 3.88, 5.25, 2.05];
      multiplier = ranges[Math.floor(Math.random() * ranges.length)].toFixed(2) + 'x';
    }

    const newRecord: PredictionRecord = {
      id: `${Date.now()}`,
      period: periodInput,
      gameType: activeTab,
      result,
      multiplier,
      color: isWingo ? color : undefined,
      accuracy,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'WIN'
    };

    setPredictionResult(newRecord);
    setHistoryList((prev) => [newRecord, ...prev]);
    setIsScanning(false);
    playBeep(1200, 250);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center px-4 py-6 md:py-8 z-10 font-iceland max-w-5xl mx-auto w-full select-none">
      
      {/* Top Header Controls Bar */}
      <div className="w-full flex items-center justify-between mb-6 border-b border-cyan-400/20 pb-4">
        {/* Back navigation button */}
        <button
          onClick={() => {
            playBeep(350, 90);
            onBack();
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-cyan-500/20 bg-cyan-950/20 text-cyan-400 text-sm tracking-widest hover:bg-cyan-500/10 cursor-pointer duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          PORTAL HOME
        </button>

        {/* Center Name Title */}
        <div className="text-center hidden sm:block">
          <div className="text-xl font-bold text-white tracking-[0.2em] neon-glow-cyan">DRAGO PREDICTOR v4`</div>
          <p className="text-[10px] text-cyan-400/70 tracking-widest uppercase">STABLE SEED-TCP PORT</p>
        </div>

        {/* Audio feedback state lever and Server Status */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSoundEnabled((prev) => !prev)}
            className="p-2 rounded-lg border border-cyan-500/20 bg-cyan-950/20 text-cyan-400 hover:bg-cyan-500/10 duration-300 cursor-pointer"
            title={soundEnabled ? "Disable Synthesizer Sounds" : "Enable Synthesizer Sounds"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-cyan-500/50" />}
          </button>
          
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg border border-green-500/20 bg-green-950/20 text-green-400 text-xs tracking-wider">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            SECURE
          </div>
        </div>
      </div>

      {/* Main Server Selection Tabs Container */}
      <div className="w-full grid grid-cols-3 gap-2 mb-6">
        {(['wingo1', 'wingo3', 'aviator'] as GameTab[]).map((tab) => {
          const isActive = activeTab === tab;
          let label = '';
          switch (tab) {
            case 'wingo1':
              label = 'WINGO 1MIN';
              break;
            case 'wingo3':
              label = 'WINGO 3MIN';
              break;
            case 'aviator':
              label = 'AVIATOR CRASH';
              break;
          }
          return (
            <button
              key={tab}
              onClick={() => {
                playBeep(520, 80);
                setActiveTab(tab);
                setPredictionResult(null);
                setPeriodInput('');
              }}
              className={`py-3 px-2 rounded-xl text-center font-bold font-iceland tracking-widest transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(0,229,255,0.3)] scale-[1.01]'
                  : 'bg-black/40 border border-cyan-500/25 text-cyan-300 hover:text-white hover:bg-cyan-500/10'
              }`}
            >
              <div className="text-sm md:text-base">{label}</div>
            </button>
          );
        })}
      </div>

      {/* Core Grid Interactivities Layout */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Inputs and Action Buttons (ColumnSpan 7) */}
        <div id="main-estimator-module" className="md:col-span-7 flex flex-col gap-6">
          
          {/* Main Control Card */}
          <div className="relative rounded-2xl bg-black/60 backdrop-blur-md p-6 border border-cyan-400/20 shadow-[0_0_25px_rgba(0,162,255,0.08)]">
            <div className="absolute top-0 right-0 p-3 text-[10px] text-cyan-400/50 uppercase tracking-widest font-mono">
              ENGINE PANEL
            </div>
            
            <h2 className="text-2xl font-bold text-cyan-200 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
              Analyze Period Details
            </h2>
            <p className="text-sm text-cyan-300/70 mb-5">
              Enter the target gaming period number or use the instant sync clock to match your active round index.
            </p>

            {/* Simulated Live Period Counter */}
            <div className="mb-4 bg-cyan-950/20 border border-cyan-500/10 rounded-xl p-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-cyan-400/50 uppercase block tracking-widest font-mono">Simulated Live Server Code</span>
                <span className="text-xl font-bold font-mono tracking-widest text-cyan-300">#{liveAutoPeriod}</span>
              </div>
              <button
                onClick={handleSyncPeriod}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-cyan-400/40 bg-cyan-400/10 text-cyan-300 text-xs hover:text-white hover:bg-cyan-400/20 cursor-pointer duration-300"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                SYNC INPUT
              </button>
            </div>

            {/* Input Form Field */}
            <div className="relative mb-6">
              <label className="block text-sm text-cyan-400/80 uppercase tracking-widest mb-1.5 font-bold">
                Target Period Number:
              </label>
              <div className="relative">
                <input
                  type="number"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  value={periodInput}
                  onChange={(e) => setPeriodInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter period (e.g. 601)"
                  className="w-full bg-cyan-950/30 border border-cyan-500/40 rounded-xl px-4 py-3.5 text-xl font-mono text-white placeholder-cyan-500/40 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                />
                {periodInput && (
                  <button
                    onClick={() => {
                      playBeep(250, 60);
                      setPeriodInput('');
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400 hover:text-white text-xs bg-cyan-950/60 hover:bg-cyan-900/80 px-2 py-1 rounded"
                  >
                    CLEAR
                  </button>
                )}
              </div>
            </div>

            {/* Let's Predict Trigger Button */}
            {!isScanning ? (
              <button
                onClick={handlePredict}
                disabled={!periodInput}
                className={`group relative w-full overflow-hidden rounded-xl py-4 font-bold tracking-[0.2em] text-xl transition-all duration-300 uppercase cursor-pointer ${
                  periodInput
                    ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:scale-[1.01]'
                    : 'bg-cyan-950/20 border border-cyan-500/20 text-cyan-500/40 cursor-not-allowed'
                }`}
              >
                <span className="relative flex items-center justify-center gap-3">
                  <Sparkles className="w-5 h-5 text-white animate-bounce" />
                  START DRAGO ESTIMATOR v4.0
                </span>
              </button>
            ) : (
              /* Holographic Scan Progress Meter */
              <div className="w-full bg-cyan-950/30 border border-cyan-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-cyan-400 text-sm uppercase tracking-widest animate-pulse font-bold">
                    [SYSTEM SCANNING] {scanProgress}%
                  </span>
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                </div>
                
                {/* Horizontal progress bar */}
                <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden mb-3">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 h-full duration-150 transition-all shadow-[0_0_8px_#00e5ff]"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
                
                {/* Status line code stream */}
                <div className="text-[11px] font-mono text-cyan-300/80 tracking-widest text-center truncate italic">
                  &gt;&gt; {scanStatus}
                </div>
              </div>
            )}
          </div>

          {/* Dynamic Generated Results Card */}
          <AnimatePresence mode="wait">
            {predictionResult && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className={`relative rounded-2xl p-6 border bg-black/70 backdrop-blur-lg ${
                  predictionResult.result === 'BIG' 
                    ? 'border-amber-400/40 shadow-[0_0_30px_rgba(245,158,11,0.15)] bg-amber-950/5' 
                    : activeTab === 'aviator'
                    ? 'border-red-500/40 shadow-[0_0_30px_rgba(239,68,68,0.15)] bg-red-950/5'
                    : 'border-cyan-400/40 shadow-[0_0_30px_rgba(6,182,212,0.15)] bg-cyan-950/5'
                }`}
              >
                <div className="absolute top-0 right-0 p-3 text-[10px] text-cyan-400/50 uppercase tracking-widest font-mono">
                  VERIFIED OUTPUT
                </div>

                <div className="flex items-center gap-3 text-cyan-200 text-sm tracking-widest uppercase mb-4 font-mono font-bold">
                  <ShieldCheck className="w-5 h-5 text-green-400" />
                  ANALYSIS COMPLETED FOR ROUND #{predictionResult.period}
                </div>

                {/* Aesthetic Visual Output */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  
                  {/* Big label representation */}
                  <div className="text-center py-4 bg-black/40 rounded-xl border border-white/5">
                    <span className="text-[11px] uppercase text-cyan-400/60 font-mono block tracking-widest mb-1">
                      HYPOTHETICAL TARGET
                    </span>

                    {activeTab === 'aviator' ? (
                      <div className="flex flex-col items-center justify-center p-2">
                        <span className="text-3xl md:text-4xl text-red-400 font-bold tracking-wider neon-glow-red font-mono">
                          {predictionResult.multiplier}
                        </span>
                        <span className="text-[10px] text-red-300 mt-1 uppercase tracking-widest font-mono">
                          CRASH BARRIER CAP
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-1">
                        <span className={`text-4xl md:text-5xl font-bold tracking-widest uppercase ${
                          predictionResult.result === 'BIG' ? 'text-amber-400 neon-glow-cyan' : 'text-cyan-400 neon-glow-cyan'
                        }`}>
                          {predictionResult.result}
                        </span>
                        
                        {/* Secondary color recommendation */}
                        <div className="flex items-center gap-1.5 mt-2">
                          <span className="text-[10px] text-cyan-400/70 font-mono tracking-widest">COLOR:</span>
                          <span className={`w-3 h-3 rounded-full ${
                            predictionResult.color === 'red' ? 'bg-red-500' : 'bg-green-500'
                          } inline-block shadow-[0_0_6px_currentColor]`} />
                          <span className="text-xs uppercase text-white font-bold">{predictionResult.color}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Mathematical Confidence Matrix */}
                  <div className="space-y-3.5">
                    <div>
                      <div className="flex justify-between text-xs text-cyan-300/70 uppercase tracking-widest mb-1.5">
                        <span>DRAGO CONFIDENCE</span>
                        <span className="font-mono text-green-400">{predictionResult.accuracy}%</span>
                      </div>
                      <div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-green-400 h-full" 
                          style={{ width: `${predictionResult.accuracy}%` }}
                        />
                      </div>
                    </div>

                    <div className="bg-black/40 p-2.5 rounded-lg border border-white/5 space-y-1 text-xs">
                      <div className="flex justify-between text-cyan-300/60">
                        <span>OPTIMAL MULTIPLIER:</span>
                        <span className="text-white font-mono font-bold">2.5X SAFETY RANGE</span>
                      </div>
                      <div className="flex justify-between text-cyan-300/60">
                        <span>ANALYSIS SEED:</span>
                        <span className="text-white font-mono uppercase">DRAGO_SHA256_V4</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive recommendation block */}
                <div className="mt-4 pt-3.5 border-t border-cyan-500/10 flex items-center justify-between text-[11px] text-cyan-400/50 uppercase tracking-widest font-mono">
                  <span>SYSTEM FEEDBACK: 99.2% SUCCESS RATE SECURED</span>
                  <span className="text-green-400 animate-pulse">● DIRECTIVE READY</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Prediction History timeline (ColumnSpan 5) */}
        <div className="md:col-span-5 flex flex-col gap-6">
          
          {/* Recent Server History Card */}
          <div className="rounded-2xl bg-black/60 backdrop-blur-md p-5 border border-cyan-400/20 shadow-[0_0_20px_rgba(0,162,255,0.05)]">
            <h3 className="text-xl font-bold text-cyan-300 uppercase tracking-widest mb-4 flex items-center gap-2">
              <History className="w-4.5 h-4.5 text-cyan-400" />
              Recent Verification History
            </h3>

            {/* List entries */}
            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {historyList.map((record) => (
                <div
                  key={record.id}
                  className="bg-cyan-950/15 border border-cyan-500/15 rounded-xl p-3 flex items-center justify-between hover:bg-cyan-950/30 transition duration-300"
                >
                  <div className="flex items-center gap-3">
                    {/* Tiny neon checker */}
                    <div className="w-7 h-7 rounded-lg border border-green-500/30 bg-green-950/20 flex items-center justify-center text-green-400 font-bold text-xs shadow-[0_0_8px_rgba(34,197,94,0.1)]">
                      ✓
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-900/40 text-cyan-300 border border-cyan-400/10">
                          {record.gameType === 'aviator' ? 'AVIATOR' : record.gameType === 'wingo1' ? 'WINGO 1M' : 'WINGO 3M'}
                        </span>
                        <span className="text-xs text-cyan-400/60 font-mono">#{record.period}</span>
                      </div>
                      
                      <div className="text-[11px] text-cyan-500/70 mt-0.5 uppercase tracking-wide">
                        Confidence {record.accuracy}% • {record.timestamp}
                      </div>
                    </div>
                  </div>

                  {/* Target predicted outcomes */}
                  <div className="text-right">
                    {record.gameType === 'aviator' ? (
                      <span className="text-sm font-bold font-mono text-red-400 tracking-wider">
                        {record.multiplier}
                      </span>
                    ) : (
                      <div className="flex flex-col items-end">
                        <span className={`text-base font-bold uppercase ${
                          record.result === 'BIG' ? 'text-amber-400' : 'text-cyan-400'
                        }`}>
                          {record.result}
                        </span>
                        {record.color && (
                          <div className="flex items-center gap-1">
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              record.color === 'red' ? 'bg-red-500' : 'bg-green-500'
                            }`} />
                            <span className="text-[9px] uppercase text-white/80">{record.color}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Persistent Telegram Community Banner inside portal */}
          <a
            href="https://t.me/+uu1UAjycgzNjNjZl"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-xl overflow-hidden border border-cyan-400/30 bg-gradient-to-r from-blue-950/30 via-slate-950/40 to-cyan-950/30 p-5 flex items-center justify-between hover:border-cyan-400/80 hover:bg-cyan-950/15 transition-all duration-300"
          >
            {/* Ambient flash lights */}
            <div className="absolute inset-0 bg-cyan-500/5 opacity-40 blur-lg rounded-full -translate-y-12 shrink-0" />
            
            <div className="z-10">
              <span className="text-sm text-cyan-300 uppercase tracking-widest font-bold flex items-center gap-1.5 mb-1">
                <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
                Join Community Channel
              </span>
              <p className="text-xs text-cyan-400/60 uppercase tracking-wider font-mono">
                Get premium real-time signals on Telegram!
              </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 group-hover:text-cyan-300 duration-300 select-none z-10">
              <Send className="w-5 h-5" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
