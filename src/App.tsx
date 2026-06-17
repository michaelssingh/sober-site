import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  RotateCcw, 
  CheckCircle2, 
  XCircle,
  ArrowRight,
  Mail,
  Loader2,
  Lock,
  Cpu,
  Globe,
  ChevronRight,
  Menu,
  X,
  Terminal,
  Activity,
  Layers
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Animation Variants ---
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// --- Interactive Simulation Component ---
const BuildSimulator = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { label: "Initializing Nix Flake...", color: "text-blue-400" },
    { label: "Resolving 142 dependencies...", color: "text-blue-400" },
    { label: "Environment parity: 100% Verified.", color: "text-green-400" },
    { label: "Building WASM runtime...", color: "text-blue-400" },
    { label: "Attaching eBPF network probe...", color: "text-purple-400" },
    { label: "Deployment Successful.", color: "text-green-500" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % (steps.length + 5)); // Loop with a pause
    }, 800);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative animate-flicker">
      <div className="scanline"></div>
      <div className="px-4 py-3 border-b border-white/5 bg-white/5 flex items-center gap-2 relative z-20">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        </div>
        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2 flex items-center gap-1">
          <Terminal size={12} /> SOBER-CLI v1.0.4
        </div>
      </div>
      <div className="p-6 font-mono text-xs md:text-sm h-48 flex flex-col justify-start">
        <AnimatePresence>
          {steps.slice(0, step + 1).map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn("mb-2 flex items-center gap-2", s.color)}
            >
              <span className="text-slate-600">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
              <span className="text-blue-500/50 italic mr-1">➜</span>
              {s.label}
            </motion.div>
          ))}
        </AnimatePresence>
        {step >= steps.length && (
           <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-auto pt-4 border-t border-white/5 text-[10px] text-slate-500 flex justify-between items-center"
           >
              <span>Uptime: 99.999%</span>
              <span className="flex items-center gap-1"><Activity size={10} className="text-green-500" /> System: Nominal</span>
           </motion.div>
        )}
      </div>
    </div>
  );
};

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Lead capture failed:', err);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden relative">
      
      {/* Noise Overlay */}
      <div className="fixed inset-0 bg-noise z-[100] pointer-events-none opacity-[0.03]"></div>

      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-600/10 blur-[140px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 -right-[10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse [animation-delay:3s]"></div>
      </div>

      {/* Navigation */}
      <nav 
        className={cn(
          "fixed top-0 w-full z-[90] transition-all duration-500 border-b",
          isScrolled 
            ? "bg-[#020617]/80 backdrop-blur-2xl border-white/10 py-4 shadow-2xl shadow-black/50" 
            : "bg-transparent border-transparent py-8"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-900/40 group-hover:scale-110 transition-all duration-500 group-hover:rotate-3">
              <Shield className="text-white" size={24} />
            </div>
            <span className="text-2xl font-black tracking-[ -0.05em] text-white uppercase italic">SOBER</span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12 text-[13px] font-black uppercase tracking-[0.15em] text-slate-500">
            {['Features', 'Compare', 'Docs'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="hover:text-white transition-all duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-[3px] bg-blue-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </a>
            ))}
            <a 
              href="#early-access" 
              className="px-8 py-3 bg-white text-black rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-500 shadow-[0_0_40px_rgba(255,255,255,0.05)] active:scale-95 font-black"
            >
              Get Access
            </a>
          </div>

          <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-0 h-screen bg-[#020617] z-[80] md:hidden flex flex-col items-center justify-center p-8 text-center"
          >
             <div className="flex flex-col gap-10 font-black text-4xl uppercase tracking-tighter italic">
              <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#compare" onClick={() => setMobileMenuOpen(false)}>Compare</a>
              <a href="#early-access" onClick={() => setMobileMenuOpen(false)} className="text-blue-500">Early Access</a>
            </div>
            <button className="mt-20 text-slate-500" onClick={() => setMobileMenuOpen(false)}><X size={48} /></button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="pt-64 pb-32 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="text-left relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/5 border border-blue-500/10 text-blue-400 text-[11px] font-black uppercase tracking-[0.3em] mb-12"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse" />
              Direct-to-Kernel Orchestration
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black text-white mb-10 tracking-[-0.04em] leading-[0.85]"
            >
              Pure Stability <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 animate-gradient">By Design.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 mb-14 leading-relaxed max-w-xl font-medium"
            >
              Legacy IaC relies on hope. SOBER relies on <span className="text-slate-200">mathematical proof.</span> Native Nix reproducibility meets kernel-level eBPF security.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <a href="#early-access" className="group w-full sm:w-auto px-10 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-500 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-blue-600/30 active:scale-95 text-lg">
                Claim Alpha Access <ChevronRight className="group-hover:translate-x-1 transition-transform" size={22} />
              </a>
            </motion.div>
          </div>

          {/* Right Side - Build Simulator */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="hidden lg:block relative group"
          >
             <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-[2rem] blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
             <BuildSimulator />
          </motion.div>
        </div>
      </section>

      {/* Stats / Proof Section */}
      <section className="py-20 px-6 border-y border-white/5 bg-slate-900/10">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-12">
            {[
              { val: "100%", label: "Env Parity" },
              { val: "<1ms", label: "Runtime Latency" },
              { val: "Zero", label: "Env Drift" },
              { val: "85%", label: "Cost Savings" },
            ].map((stat, i) => (
              <motion.div key={i} {...fadeIn} className="flex flex-col gap-2">
                <span className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase">{stat.val}</span>
                <span className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">{stat.label}</span>
              </motion.div>
            ))}
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-40 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-32 max-w-2xl">
            <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter italic uppercase">Engineered for the absolute.</h2>
            <p className="text-xl text-slate-500 font-medium">SOBER isn't a wrapper. It's a foundational shift in how systems are managed.</p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            {[
              {
                title: "Mathematical Nix",
                desc: "Guarantee environment parity across every machine. No more containers that 'only work in production.'",
                icon: Layers,
                color: "blue"
              },
              {
                title: "eBPF Guardians",
                desc: "Direct kernel-level monitoring for every deployment. Policies that enforce security at the syscall layer.",
                icon: Lock,
                color: "indigo"
              },
              {
                title: "Execution Engine",
                desc: "High-throughput WASM execution built for the edge. Absolute process isolation with near-zero overhead.",
                icon: Cpu,
                color: "purple"
              }
            ].map((f, i) => (
              <motion.div 
                key={i}
                variants={fadeIn}
                className="group p-12 bg-white/[0.01] border border-white/5 rounded-[3rem] hover:bg-white/[0.03] hover:border-blue-500/30 transition-all duration-700 relative overflow-hidden flex flex-col h-full"
              >
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center mb-10 transition-all duration-700 group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]",
                  f.color === 'blue' ? "bg-blue-600/10 text-blue-400" :
                  f.color === 'indigo' ? "bg-indigo-600/10 text-indigo-400" : "bg-purple-600/10 text-purple-400"
                )}>
                  <f.icon size={28} />
                </div>
                <h3 className="text-2xl font-black text-white mb-6 italic tracking-tight uppercase underline decoration-blue-500/20 underline-offset-8 decoration-2">{f.title}</h3>
                <p className="text-lg text-slate-400 leading-relaxed font-medium flex-1">
                  {f.desc}
                </p>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* The Matrix */}
      <section id="compare" className="py-40 px-6 bg-gradient-to-b from-[#020617] via-blue-600/5 to-[#020617] border-y border-white/5 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-32">
            <h2 className="text-5xl md:text-8xl font-black text-white mb-10 tracking-tighter italic uppercase">The SOBER Standard.</h2>
            <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto">
              We aren't just faster. We are <span className="text-white">fundamentally different.</span>
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0b0e14]/40 backdrop-blur-3xl border border-white/10 rounded-[4rem] overflow-hidden shadow-2xl relative z-10"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-12 py-10 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Comparison</th>
                    <th className="px-12 py-10 text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] bg-blue-500/5">SOBER Platform</th>
                    <th className="px-12 py-10 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Legacy Providers</th>
                  </tr>
                </thead>
                <tbody className="text-xl font-black italic uppercase tracking-tight">
                  {[
                    { label: "Environment Stability", sober: "Nix Verification", legacy: "Docker Guesses" },
                    { label: "Security Guarding", sober: "Native Kernel", legacy: "Third-party Agents" },
                    { label: "Deployment Drift", sober: "Physically Impossible", legacy: "The Norm" },
                    { label: "Execution Layer", sober: "Bare-Metal WASM", legacy: "Node/Python Runtimes" }
                  ].map((row, i) => (
                    <tr key={i} className="group border-b border-white/5 last:border-0 hover:bg-white/[0.01] transition-colors">
                      <td className="px-12 py-12 text-slate-500 font-medium text-sm normal-case not-italic tracking-normal">{row.label}</td>
                      <td className="px-12 py-12 text-white bg-blue-500/5">
                        <div className="flex items-center gap-4">
                          <CheckCircle2 className="text-blue-500 shrink-0" size={24} />
                          {row.sober}
                        </div>
                      </td>
                      <td className="px-12 py-12 text-slate-700 opacity-50 group-hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-4">
                          <XCircle className="shrink-0 opacity-20" size={24} />
                          {row.legacy}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section id="early-access" className="py-52 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-[1px] bg-gradient-to-br from-blue-600 via-indigo-600/20 to-purple-600 rounded-[4rem] group shadow-2xl">
            <div className="bg-[#020617] rounded-[3.9rem] p-16 md:p-28 text-center relative overflow-hidden">
              
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent group-hover:scale-x-150 transition-transform duration-1000" />
              
              <h2 className="text-5xl md:text-8xl font-black text-white mb-10 italic tracking-tighter uppercase leading-[0.85]">Join the <br />impenetrable.</h2>
              <p className="text-xl text-slate-400 mb-16 font-medium max-w-xl mx-auto">
                We're onboarding 50 elite engineering teams into the private alpha.
              </p>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-10 bg-green-500/10 border border-green-500/20 rounded-[2.5rem] text-green-400 font-black text-2xl italic uppercase tracking-tighter"
                  >
                    You are in the queue. Stand by.
                  </motion.div>
                ) : (
                  <motion.form 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="flex flex-col sm:flex-row gap-5 max-w-2xl mx-auto"
                  >
                    <div className="relative flex-1 group">
                      <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={26} />
                      <input 
                        type="email" 
                        required
                        placeholder="engineering-lead@company.fyi"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-16 pr-8 py-6 bg-white/[0.02] border border-white/10 rounded-[1.5rem] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all font-bold text-xl placeholder:text-slate-700"
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={status === 'loading'}
                      className="px-12 py-6 bg-blue-600 text-white font-black rounded-[1.5rem] hover:bg-blue-500 transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-xl shadow-2xl shadow-blue-900/40 active:scale-95 italic uppercase tracking-tighter"
                    >
                      {status === 'loading' ? <Loader2 className="animate-spin" size={28} /> : 'Claim Spot'}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              <p className="mt-14 text-[10px] font-black text-slate-700 uppercase tracking-[0.5em] flex items-center justify-center gap-4">
                <span className="w-10 h-[1px] bg-slate-800" />
                Private Alpha Enrollment Open
                <span className="w-10 h-[1px] bg-slate-800" />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* High-End Footer */}
      <footer className="py-24 px-6 border-t border-white/5 relative z-10 bg-[#010413]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center">
                <Shield size={22} fill="currentColor" />
              </div>
              <span className="text-2xl font-black text-white italic tracking-tighter uppercase">SOBER PLATFORM</span>
            </div>
            <p className="text-slate-500 max-w-sm font-bold leading-relaxed">
              Guaranteeing stability through mathematics. The unified control plane for high-security edge compute.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <span className="text-[11px] font-black text-slate-600 uppercase tracking-[0.3em]">Network</span>
            <div className="flex flex-col gap-4 text-sm font-bold text-slate-400">
              <a href="#" className="hover:text-blue-500 transition-colors">GitHub</a>
              <a href="#" className="hover:text-blue-500 transition-colors">Twitter (X)</a>
              <a href="#" className="hover:text-blue-500 transition-colors">System Status</a>
            </div>
          </div>
          <div className="flex flex-col gap-6 text-right items-end">
            <span className="text-[11px] font-black text-slate-600 uppercase tracking-[0.3em]">Governance</span>
             <div className="flex flex-col gap-4 text-sm font-bold text-slate-400">
              <a href="#" className="hover:text-blue-500 transition-colors">Privacy</a>
              <a href="#" className="hover:text-blue-500 transition-colors">Terms</a>
              <a href="#" className="hover:text-blue-500 transition-colors">Alpha Agreement</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="text-slate-700 text-[10px] font-black tracking-[0.4em] uppercase">Built with Nix on Otus & Agy</div>
            <div className="text-slate-600 text-xs font-bold uppercase tracking-widest">&copy; 2026 SOBER SYSTEMS INC.</div>
        </div>
      </footer>
    </div>
  );
}
