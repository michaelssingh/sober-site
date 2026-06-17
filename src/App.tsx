import { useState } from 'react';
import { 
  Shield, 
  Zap, 
  RotateCcw, 
  CheckCircle2, 
  XCircle,
  ArrowRight,
  Mail,
  Loader2,
  Lock,
  Cpu,
  Globe
} from 'lucide-react';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

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
    <div className="min-h-screen bg-[#0b0e14] text-slate-200 font-sans selection:bg-blue-500/30">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0b0e14]/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <Shield className="text-white" size={18} />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">SOBER</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#compare" className="hover:text-white transition-colors">Compare</a>
            <a href="#early-access" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all">Get Early Access</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-8 uppercase tracking-widest">
            <Zap size={14} /> The Next Generation of Infrastructure
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight leading-[1.1]">
            Stop fighting <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">infrastructure drift.</span>
          </h1>
          <p className="text-xl text-slate-400 mb-12 leading-relaxed max-w-2xl mx-auto">
            Traditional IaC is broken. SOBER provides the world's first <span className="text-slate-200 font-semibold">mathematically reproducible</span> and <span className="text-slate-200 font-semibold">kernel-secured</span> infrastructure platform powered by Nix and eBPF.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#early-access" className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20">
              Request Early Access <ArrowRight size={20} />
            </a>
            <a href="#compare" className="w-full sm:w-auto px-8 py-4 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-all">
              See the Comparison
            </a>
          </div>
        </div>
      </section>

      {/* Value Pillars */}
      <section id="features" className="py-24 px-6 border-t border-white/5 bg-slate-900/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="group p-8 bg-slate-900/40 border border-white/5 rounded-2xl hover:border-blue-500/30 transition-all">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <RotateCcw size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Pure Reproducibility</h3>
            <p className="text-slate-400 leading-relaxed">
              Leverage Nix to guarantee that your development, staging, and production environments are byte-for-byte identical. No more "it works on my machine."
            </p>
          </div>
          <div className="group p-8 bg-slate-900/40 border border-white/5 rounded-2xl hover:border-blue-500/30 transition-all">
            <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Lock size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Kernel-Level Security</h3>
            <p className="text-slate-400 leading-relaxed">
              Native eBPF syscall monitoring prevents exploits at the source. Don't just watch your containers—govern them with mathematically verified security policies.
            </p>
          </div>
          <div className="group p-8 bg-slate-900/40 border border-white/5 rounded-2xl hover:border-blue-500/30 transition-all">
            <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Cpu size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">SOBER Compute</h3>
            <p className="text-slate-400 leading-relaxed">
              Built for high-performance edge execution. Deploy WASM functions with millisecond startup times and absolute process isolation via the SOBER execution engine.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Matrix */}
      <section id="compare" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">How we stack up.</h2>
            <p className="text-slate-400 text-lg">Legacy IaC was built for a different era. SOBER is built for the modern edge.</p>
          </div>

          <div className="bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-8 py-6 text-sm font-bold text-slate-500 uppercase tracking-widest">Feature</th>
                  <th className="px-8 py-6 text-sm font-bold text-blue-400 uppercase tracking-widest bg-blue-500/5">SOBER Platform</th>
                  <th className="px-8 py-6 text-sm font-bold text-slate-500 uppercase tracking-widest">Legacy IaC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm md:text-base">
                <tr>
                  <td className="px-8 py-6 font-medium text-slate-300">Environment Parity</td>
                  <td className="px-8 py-6 text-white font-semibold bg-blue-500/5 flex items-center gap-2">
                    <CheckCircle2 className="text-blue-500" size={18} /> Mathematical Guarantee (Nix)
                  </td>
                  <td className="px-8 py-6 text-slate-500 flex items-center gap-2">
                    <XCircle size={18} /> Best-effort (Docker/Bash)
                  </td>
                </tr>
                <tr>
                  <td className="px-8 py-6 font-medium text-slate-300">Runtime Security</td>
                  <td className="px-8 py-6 text-white font-semibold bg-blue-500/5 flex items-center gap-2">
                    <CheckCircle2 className="text-blue-500" size={18} /> Native eBPF Syscall Guarding
                  </td>
                  <td className="px-8 py-6 text-slate-500 flex items-center gap-2">
                    <XCircle size={18} /> Bolt-on 3rd Party Agents
                  </td>
                </tr>
                <tr>
                  <td className="px-8 py-6 font-medium text-slate-300">Infrastructure Drift</td>
                  <td className="px-8 py-6 text-white font-semibold bg-blue-500/5 flex items-center gap-2">
                    <CheckCircle2 className="text-blue-500" size={18} /> Impossible by design
                  </td>
                  <td className="px-8 py-6 text-slate-500 flex items-center gap-2">
                    <XCircle size={18} /> Common and frequent
                  </td>
                </tr>
                <tr>
                  <td className="px-8 py-6 font-medium text-slate-300">Architecture</td>
                  <td className="px-8 py-6 text-white font-semibold bg-blue-500/5 flex items-center gap-2">
                    <CheckCircle2 className="text-blue-500" size={18} /> Declarative Edge-First
                  </td>
                  <td className="px-8 py-6 text-slate-500 flex items-center gap-2">
                    <XCircle size={18} /> Imperative Module Soup
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="early-access" className="py-24 px-6 relative">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="max-w-xl mx-auto p-12 bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 rounded-[2.5rem] relative z-10 text-center shadow-2xl">
          <Globe className="mx-auto text-blue-500 mb-6" size={48} />
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight text-center">Join the future of Ops.</h2>
          <p className="text-slate-400 mb-10 text-center">We're onboarding a limited number of early adopters for our private alpha.</p>
          
          {status === 'success' ? (
            <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-400 font-bold animate-in fade-in zoom-in duration-300">
              <CheckCircle2 className="mx-auto mb-2" size={32} />
              You're on the list! We'll reach out soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input 
                  type="email" 
                  required
                  placeholder="Enter your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-950 border border-white/10 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-blue-600/20"
              >
                {status === 'loading' ? <Loader2 className="animate-spin" size={20} /> : 'Claim Early Access'}
              </button>
              {status === 'error' && <p className="text-red-400 text-sm mt-2 font-medium">Something went wrong. Please try again.</p>}
            </form>
          )}
          
          <p className="mt-8 text-xs text-slate-500">
            By joining, you agree to our <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center text-slate-500 text-sm">
        <div className="flex items-center justify-center gap-2 mb-4 opacity-50 grayscale">
          <Shield size={18} /> <span className="font-bold">SOBER PLATFORM</span>
        </div>
        &copy; {new Date().getFullYear()} SOBER FYI. All rights reserved. Built with Nix.
      </footer>
    </div>
  );
}
