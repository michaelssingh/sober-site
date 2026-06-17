import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  RotateCcw, 
  CheckCircle2, 
  XCircle,
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
  Layers,
  ArrowUpRight
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
    { label: "Initializing Nix Flake...", color: "text-tokyo-cyan" },
    { label: "Resolving 142 dependencies...", color: "text-tokyo-blue" },
    { label: "Environment parity: 100% Verified.", color: "text-tokyo-green" },
    { label: "Building WASM runtime...", color: "text-tokyo-magenta" },
    { label: "Attaching eBPF network probe...", color: "text-tokyo-orange" },
    { label: "Deployment Successful.", color: "text-tokyo-green font-bold" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % (steps.length + 5)); // Loop with a pause
    }, 900);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="w-full max-w-lg mx-auto bg-tokyo-storm-darker/90 backdrop-blur-xl border border-tokyo-gutter/50 rounded-[2rem] overflow-hidden shadow-2xl relative animate-flicker group">
      <div className="scanline"></div>
      
      {/* Terminal Header */}
      <div className="px-5 py-4 border-b border-tokyo-gutter/30 bg-tokyo-storm-dark flex items-center gap-3 relative z-20">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-tokyo-red/80 hover:bg-tokyo-red cursor-pointer transition-colors" />
          <div className="w-3 h-3 rounded-full bg-tokyo-yellow/80 hover:bg-tokyo-yellow cursor-pointer transition-colors" />
          <div className="w-3 h-3 rounded-full bg-tokyo-green/80 hover:bg-tokyo-green cursor-pointer transition-colors" />
        </div>
        <div className="text-xs font-mono font-bold text-fg-storm-dark mx-auto absolute left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-70">
          <Terminal size={14} /> SOBER-CLI v1.0.4
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-8 font-mono text-[13px] h-[260px] flex flex-col justify-start relative z-10">
        <AnimatePresence>
          {steps.slice(0, step + 1).map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn("mb-3 flex items-start gap-3", s.color)}
            >
              <span className="text-tokyo-gutter shrink-0">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
              <span className="text-tokyo-magenta shrink-0 mt-[2px]">➜</span>
              <span className="leading-relaxed">{s.label}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {step >= steps.length && (
           <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-auto pt-5 border-t border-tokyo-gutter/20 text-xs text-fg-storm-dark flex justify-between items-center"
           >
              <span className="flex items-center gap-2"><Activity size={14} className="text-tokyo-cyan" /> Sys: Nominal</span>
              <span className="font-bold text-tokyo-green">READY</span>
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
    <div className="min-h-screen bg-tokyo-storm text-fg-storm font-sans selection:bg-tokyo-magenta/30 overflow-x-hidden relative">
      
      {/* Noise Overlay */}
      <div className="fixed inset-0 bg-noise z-[100]"></div>

      {/* Background Ambience (Tokyo Night themed) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-tokyo-blue/10 blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-tokyo-magenta/10 blur-[150px] rounded-full mix-blend-screen"></div>
      </div>

      {/* Navigation */}
      <nav 
        className={cn(
          "fixed top-0 w-full z-[90] transition-all duration-500 border-b",
          isScrolled 
            ? "bg-tokyo-storm-darker/80 backdrop-blur-2xl border-tokyo-gutter/30 py-4 shadow-2xl shadow-black/50" 
            : "bg-transparent border-transparent py-8"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-12 h-12 bg-tokyo-storm-darker border border-tokyo-gutter rounded-xl flex items-center justify-center shadow-lg shadow-black/50 group-hover:border-tokyo-magenta transition-all duration-500 group-hover:-rotate-6">
              <Shield className="text-tokyo-magenta group-hover:text-tokyo-cyan transition-colors" size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tight text-fg-storm uppercase">SOBER</span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12 text-sm font-semibold tracking-wide text-fg-storm-dark">
            {['Features', 'Architecture', 'Docs'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="hover:text-tokyo-cyan transition-all duration-300 relative group py-2"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-tokyo-cyan transition-all duration-300 group-hover:w-full rounded-full"></span>
              </a>
            ))}
            <a 
              href="#early-access" 
              className="px-6 py-2.5 bg-tokyo-blue text-tokyo-storm-darker rounded-lg hover:bg-tokyo-cyan transition-all duration-300 font-bold flex items-center gap-2 group"
            >
              Get Access <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          <button className="md:hidden text-fg-storm p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
            className="fixed inset-x-0 top-0 h-screen bg-tokyo-storm-darker z-[80] md:hidden flex flex-col items-center justify-center p-8 text-center"
          >
             <div className="flex flex-col gap-10 font-bold text-3xl uppercase tracking-wider">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="hover:text-tokyo-cyan">Features</a>
              <a href="#compare" onClick={() => setMobileMenuOpen(false)} className="hover:text-tokyo-cyan">Architecture</a>
              <a href="#early-access" onClick={() => setMobileMenuOpen(false)} className="text-tokyo-magenta">Early Access</a>
            </div>
            <button className="mt-20 text-tokyo-gutter" onClick={() => setMobileMenuOpen(false)}><X size={48} /></button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="pt-56 pb-40 px-6 relative border-b border-tokyo-gutter/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-left relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-tokyo-storm-darker border border-tokyo-gutter text-tokyo-cyan text-xs font-mono font-bold uppercase tracking-widest mb-10 shadow-lg shadow-black/50"
            >
              <Activity size={14} className="animate-pulse text-tokyo-green" />
              Direct-to-Kernel Orchestration
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold text-fg-storm mb-8 tracking-tight leading-[1.05]"
            >
              Infrastructure that <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-tokyo-magenta to-tokyo-blue">never drifts.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-fg-storm-dark mb-12 leading-relaxed max-w-xl"
            >
              Legacy IaC relies on hope. SOBER relies on <span className="text-tokyo-cyan font-semibold">mathematical proof.</span> Native Nix reproducibility meets kernel-level eBPF security.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-5"
            >
              <a href="#early-access" className="group w-full sm:w-auto px-8 py-4 bg-tokyo-blue text-tokyo-storm-darker font-bold rounded-xl hover:bg-tokyo-cyan transition-all flex items-center justify-center gap-3 shadow-lg shadow-tokyo-blue/20">
                Claim Alpha Access <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </a>
              <a href="#compare" className="group w-full sm:w-auto px-8 py-4 bg-tokyo-storm-darker text-fg-storm font-semibold rounded-xl border border-tokyo-gutter hover:border-tokyo-magenta transition-all flex items-center justify-center gap-3">
                <Terminal size={20} className="text-tokyo-gutter group-hover:text-tokyo-magenta transition-colors" /> View Architecture
              </a>
            </motion.div>
          </div>

          {/* Right Side - Build Simulator */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="hidden lg:block relative group perspective-1000"
          >
             <div className="absolute -inset-4 bg-gradient-to-tr from-tokyo-blue/20 via-tokyo-magenta/10 to-tokyo-cyan/20 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
             <BuildSimulator />
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-40 px-6 relative bg-tokyo-storm-darker/50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-fg-storm mb-6 tracking-tight">Engineered for the absolute.</h2>
            <p className="text-xl text-fg-storm-dark max-w-2xl mx-auto">SOBER isn't a wrapper. It's a foundational shift in how systems are managed.</p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Mathematical Nix",
                desc: "Guarantee environment parity across every machine. No more containers that 'only work in production.'",
                icon: Layers,
                color: "text-tokyo-blue",
                bg: "bg-tokyo-blue/10",
                border: "hover:border-tokyo-blue/50"
              },
              {
                title: "eBPF Guardians",
                desc: "Direct kernel-level monitoring for every deployment. Policies that enforce security at the syscall layer.",
                icon: Lock,
                color: "text-tokyo-magenta",
                bg: "bg-tokyo-magenta/10",
                border: "hover:border-tokyo-magenta/50"
              },
              {
                title: "Execution Engine",
                desc: "High-throughput WASM execution built for the edge. Absolute process isolation with near-zero overhead.",
                icon: Cpu,
                color: "text-tokyo-cyan",
                bg: "bg-tokyo-cyan/10",
                border: "hover:border-tokyo-cyan/50"
              }
            ].map((f, i) => (
              <motion.div 
                key={i}
                variants={fadeIn}
                className={cn(
                  "group p-10 bg-tokyo-storm-dark border border-tokyo-gutter/50 rounded-3xl transition-all duration-500 hover:-translate-y-2 shadow-xl shadow-black/20",
                  f.border
                )}
              >
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110",
                  f.bg, f.color
                )}>
                  <f.icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-fg-storm mb-4 tracking-tight">{f.title}</h3>
                <p className="text-fg-storm-dark leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* The Matrix */}
      <section id="architecture" className="py-40 px-6 border-y border-tokyo-gutter/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-tokyo-blue/5"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div {...fadeIn} className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-extrabold text-fg-storm mb-6 tracking-tight">The SOBER Standard.</h2>
            <p className="text-xl text-fg-storm-dark max-w-2xl mx-auto">
              We aren't just faster. We are fundamentally different.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-tokyo-storm-darker border border-tokyo-gutter/50 rounded-[2rem] overflow-hidden shadow-2xl"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-tokyo-gutter/50 bg-tokyo-storm">
                    <th className="px-10 py-8 text-xs font-mono font-bold text-fg-storm-dark uppercase tracking-widest">Comparison</th>
                    <th className="px-10 py-8 text-xs font-mono font-bold text-tokyo-cyan uppercase tracking-widest border-l border-r border-tokyo-gutter/30 bg-tokyo-cyan/5">SOBER Platform</th>
                    <th className="px-10 py-8 text-xs font-mono font-bold text-fg-storm-dark uppercase tracking-widest">Legacy Providers</th>
                  </tr>
                </thead>
                <tbody className="text-base font-medium">
                  {[
                    { label: "Environment Stability", sober: "Nix Verification", legacy: "Docker Guesses" },
                    { label: "Security Guarding", sober: "Native Kernel (eBPF)", legacy: "Third-party Agents" },
                    { label: "Deployment Drift", sober: "Physically Impossible", legacy: "The Norm" },
                    { label: "Execution Layer", sober: "Bare-Metal WASM", legacy: "Node/Python Runtimes" }
                  ].map((row, i) => (
                    <tr key={i} className="group border-b border-tokyo-gutter/30 last:border-0 hover:bg-tokyo-storm transition-colors">
                      <td className="px-10 py-8 text-fg-storm-dark">{row.label}</td>
                      <td className="px-10 py-8 text-fg-storm bg-tokyo-cyan/5 border-l border-r border-tokyo-gutter/30">
                        <div className="flex items-center gap-3 font-bold">
                          <CheckCircle2 className="text-tokyo-green shrink-0" size={20} />
                          {row.sober}
                        </div>
                      </td>
                      <td className="px-10 py-8 text-fg-storm-gutter group-hover:text-fg-storm-dark transition-colors">
                        <div className="flex items-center gap-3">
                          <XCircle className="shrink-0" size={20} />
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
      <section id="early-access" className="py-40 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="bg-tokyo-storm-darker border border-tokyo-gutter/50 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-black/50">
            
            <Globe className="mx-auto text-tokyo-magenta/50 mb-8 animate-spin-slow" size={64} strokeWidth={1.5} />
            <h2 className="text-4xl md:text-5xl font-extrabold text-fg-storm mb-6 tracking-tight">Deploy the future.</h2>
            <p className="text-lg text-fg-storm-dark mb-12 max-w-xl mx-auto">
              We're onboarding 50 elite engineering teams into the private alpha.
            </p>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 bg-tokyo-green/10 border border-tokyo-green/30 rounded-2xl text-tokyo-green font-bold text-lg flex items-center justify-center gap-3"
                >
                  <CheckCircle2 size={24} /> You are in the queue. Stand by.
                </motion.div>
              ) : (
                <motion.form 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
                >
                  <div className="relative flex-1 group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-tokyo-gutter group-focus-within:text-tokyo-magenta transition-colors" size={22} />
                    <input 
                      type="email" 
                      required
                      placeholder="engineering@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-14 pr-6 py-4 bg-tokyo-storm border border-tokyo-gutter/50 rounded-xl focus:border-tokyo-magenta focus:ring-1 focus:ring-tokyo-magenta outline-none transition-all text-fg-storm placeholder:text-tokyo-gutter font-medium"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="px-8 py-4 bg-tokyo-magenta text-tokyo-storm-darker font-bold rounded-xl hover:bg-tokyo-magenta/90 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg shadow-tokyo-magenta/20"
                  >
                    {status === 'loading' ? <Loader2 className="animate-spin" size={22} /> : 'Claim Spot'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* High-End Footer */}
      <footer className="py-16 px-6 border-t border-tokyo-gutter/30 bg-tokyo-storm-darker text-sm font-medium">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-tokyo-blue text-tokyo-storm-darker rounded-lg flex items-center justify-center">
              <Shield size={18} fill="currentColor" />
            </div>
            <span className="font-bold text-fg-storm tracking-tight">SOBER PLATFORM</span>
          </div>
          <div className="flex gap-8 text-fg-storm-dark">
            <a href="#" className="hover:text-tokyo-cyan transition-colors">GitHub</a>
            <a href="#" className="hover:text-tokyo-cyan transition-colors">Twitter (X)</a>
            <a href="#" className="hover:text-tokyo-cyan transition-colors">System Status</a>
          </div>
          <div className="text-tokyo-gutter font-mono text-xs">
            &copy; 2026 SOBER SYSTEMS. BUILT ON NIXOS.
          </div>
        </div>
      </footer>
    </div>
  );
}
