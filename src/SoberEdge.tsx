import { useState, useEffect } from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  Activity, 
  Play, 
  RotateCcw, 
  Zap, 
  Sun, 
  Moon,
  Sparkles,
  X,
  CheckCircle2,
  Globe
} from 'lucide-react';
import './App.css';

// ==========================================
// SoberEdge: eBPF + WASM FaaS Landing Page
// ==========================================

export default function SoberEdge({ onBack }: { onBack: () => void }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [showFunnel, setShowFunnel] = useState<boolean>(false);
  const [funnelStep, setFunnelStep] = useState<number>(1);
  const [funnelData, setFunnelData] = useState({
    currentStack: '',
    latencyGoal: '',
    monthlyRequests: '',
    email: '',
    company: ''
  });

  const steps = [
    "$ sober deploy --function api-handler --runtime wasm32-wasi",
    "==> 1. Compiling Rust/WASM module...",
    "✔ Build complete: api-handler.wasm (420KB)",
    "==> 2. Attaching eBPF network probe...",
    "==> 3. Global Edge Sync: 32 regions live.",
    "==> 4. Cold start test: 12ms latency.",
    "✔ Live: https://api.soberedge.fyi/v1/handler"
  ];

  const [lines, setLines] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [stepIndex, setStepIndex] = useState<number>(0);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    if (!isRunning) return;
    if (stepIndex < steps.length) {
      const timer = setTimeout(() => {
        setLines(prev => [...prev, steps[stepIndex]]);
        setStepIndex(prev => prev + 1);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setIsRunning(false);
    }
  }, [isRunning, stepIndex]);

  const handleFunnelOption = (field: string, value: string) => {
    setFunnelData(prev => ({ ...prev, [field]: value }));
    setFunnelStep(prev => prev + 1);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--theme)' }}>
      
      {/* Navigation */}
      <header className="site-header">
        <div className="nav-container">
          <div className="logo-link">
            <Zap className="logo-icon" style={{ color: 'var(--accent-magenta)' }} />
            <span>Sober<span style={{ color: 'var(--accent-magenta)' }}>Edge</span></span>
          </div>
          <nav className="nav-links">
            <button onClick={onBack} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              ← Back to SOBER
            </button>
            <button className="cta-btn cta-primary" style={{ padding: '8px 16px', fontSize: '0.85rem', backgroundColor: 'var(--accent-magenta)' }} onClick={() => setShowFunnel(true)}>
              Get Early Access
            </button>
            <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle dark mode">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>
        </div>
      </header>

      <main style={{ flexGrow: 1 }} className="fade-in">
        {/* Hero */}
        <header className="landing-container" style={{ textAlign: 'center', paddingTop: '80px', paddingBottom: '60px' }}>
          <div className="badge badge-magenta" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} /> NEW: KERNEL-LEVEL FAAS RUNTIME
          </div>
          <h1 className="hero-title" style={{ fontSize: '4.5rem', marginBottom: '24px' }}>
            Serverless at the <br/>
            <span className="gradient-text" style={{ background: 'linear-gradient(135deg, var(--accent-magenta) 0%, #ff00ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Speed of Light.</span>
          </h1>
          <p className="hero-subtitle" style={{ maxWidth: '800px', margin: '0 auto 40px auto' }}>
            WASM isolation meets eBPF observability. Eliminate cold starts and secure your global edge with the first kernel-integrated FaaS platform.
          </p>
          <div className="hero-ctas" style={{ justifyContent: 'center' }}>
            <button className="cta-btn cta-primary" style={{ padding: '16px 32px', fontSize: '1.1rem', backgroundColor: 'var(--accent-magenta)' }} onClick={() => setShowFunnel(true)}>
              Deploy Your First Function
            </button>
            <button className="cta-btn cta-secondary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
              Read the eBPF Whitepaper
            </button>
          </div>
        </header>

        {/* Terminal Section */}
        <section className="landing-container" style={{ paddingBottom: '100px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="terminal-window" style={{ border: '1px solid var(--accent-magenta)' }}>
              <div className="terminal-header" style={{ backgroundColor: 'var(--accent-magenta)', opacity: 0.9 }}>
                <div className="terminal-dots">
                  <span className="terminal-dot" style={{ backgroundColor: '#fff' }}></span>
                  <span className="terminal-dot" style={{ backgroundColor: '#fff' }}></span>
                  <span className="terminal-dot" style={{ backgroundColor: '#fff' }}></span>
                </div>
                <span className="terminal-title" style={{ color: '#fff' }}>sober@edge: ~/demo</span>
              </div>
              <div className="terminal-body" style={{ minHeight: '320px' }}>
                <div className="space-y-2">
                  {lines.map((line, i) => {
                    let styleClass = "";
                    let prefix = "";
                    if (line.startsWith("$")) {
                      styleClass = "terminal-info";
                      prefix = "➜ ";
                      line = line.substring(2);
                    } else if (line.startsWith("==>")) {
                      styleClass = "terminal-subinfo";
                    } else if (line.startsWith("✔")) {
                      styleClass = "terminal-success";
                    }

                    return (
                      <div key={i} className={`terminal-line ${styleClass}`}>
                        {prefix && <span className="terminal-prompt" style={{ color: 'var(--accent-magenta)' }}>{prefix}</span>}
                        {line}
                      </div>
                    );
                  })}
                  {isRunning && <div style={{ display: 'inline-block', width: '2px', height: '15px', background: 'var(--accent-magenta)', animation: 'blink 0.8s infinite' }}></div>}
                </div>
                {!isRunning && lines.length === 0 && (
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
                    <button className="terminal-btn" style={{ borderColor: 'var(--accent-magenta)', color: 'var(--accent-magenta)' }} onClick={() => {setLines([]); setStepIndex(0); setIsRunning(true)}}>
                      <Play size={16} /> Run Edge Deployment Demo
                    </button>
                  </div>
                )}
                {!isRunning && lines.length > 0 && (
                  <button className="terminal-btn" style={{ marginTop: '20px' }} onClick={() => {setLines([]); setStepIndex(0)}}>
                    <RotateCcw size={16} /> Reset Demo
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid with Magenta Accent */}
        <section className="features-section" style={{ borderTop: '1px solid var(--border)', background: 'rgba(152, 84, 241, 0.05)' }}>
           <div className="landing-container">
              <h2 className="section-title">The Kernel-First Approach</h2>
              <div className="bento-grid">
                <div className="bento-card" style={{ borderTop: '4px solid var(--accent-magenta)' }}>
                  <Cpu className="bento-card-icon" style={{ color: 'var(--accent-magenta)' }} />
                  <h3>WASM Runtime</h3>
                  <p>Secure, deterministic execution in a cryptographically isolated sandbox.</p>
                </div>
                <div className="bento-card" style={{ borderTop: '4px solid var(--accent-magenta)' }}>
                  <ShieldCheck className="bento-card-icon" style={{ color: 'var(--accent-magenta)' }} />
                  <h3>eBPF Guardrails</h3>
                  <p>Network policies and security enforced at the kernel level with zero overhead.</p>
                </div>
                <div className="bento-card" style={{ borderTop: '4px solid var(--accent-magenta)' }}>
                  <Globe className="bento-card-icon" style={{ color: 'var(--accent-magenta)' }} />
                  <h3>Global Propagation</h3>
                  <p>Your functions are deployed to 32 regions in under 2 seconds.</p>
                </div>
              </div>
           </div>
        </section>

        {/* CPA FUNNEL MODAL */}
        {showFunnel && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(26, 27, 38, 0.85)',
            zIndex: 10000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            backdropFilter: 'blur(8px)',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <div style={{
              background: 'var(--entry)',
              border: '1.5px solid var(--accent-magenta)',
              borderRadius: '24px',
              width: '100%',
              maxWidth: '560px',
              boxShadow: 'var(--shadow-md)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ padding: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                  <div style={{ flex: 1, height: '4px', background: 'var(--border)', borderRadius: '2px', marginRight: '16px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: 'var(--accent-magenta)', width: `${(funnelStep / 4) * 100}%`, transition: 'all 0.5s ease' }}></div>
                  </div>
                  <button onClick={() => setShowFunnel(false)} style={{ background: 'none', border: 'none', color: 'var(--tertiary)', cursor: 'pointer' }}><X size={24} /></button>
                </div>

                {funnelStep === 1 && (
                  <div className="fade-in">
                    <h2 className="section-title" style={{ textAlign: 'left', fontSize: '1.75rem' }}>What's your current FaaS stack?</h2>
                    <p style={{ color: 'var(--tertiary)', marginBottom: '24px' }}>We'll tailor your SoberEdge configuration based on your needs.</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {['AWS Lambda', 'Cloudflare Workers', 'Vercel Functions', 'Self-hosted (K8s/Knative)'].map(opt => (
                        <button key={opt} className="cta-btn cta-secondary" style={{ width: '100%', justifyContent: 'flex-start', padding: '16px' }} onClick={() => handleFunnelOption('currentStack', opt)}>{opt}</button>
                      ))}
                    </div>
                  </div>
                )}

                {funnelStep === 2 && (
                  <div className="fade-in">
                    <h2 className="section-title" style={{ textAlign: 'left', fontSize: '1.75rem' }}>What's your target P99 latency?</h2>
                    <p style={{ color: 'var(--tertiary)', marginBottom: '24px' }}>eBPF allows us to optimize kernel-level request routing.</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {['< 50ms (Ultra-low)', '50ms - 200ms', '200ms - 500ms', "I just want it faster"].map(opt => (
                        <button key={opt} className="cta-btn cta-secondary" style={{ width: '100%', justifyContent: 'flex-start', padding: '16px' }} onClick={() => handleFunnelOption('latencyGoal', opt)}>{opt}</button>
                      ))}
                    </div>
                  </div>
                )}

                {funnelStep === 3 && (
                  <div className="fade-in">
                    <h2 className="section-title" style={{ textAlign: 'left', fontSize: '1.75rem' }}>Almost there...</h2>
                    <p style={{ color: 'var(--tertiary)', marginBottom: '24px' }}>Where should we send your custom SoberEdge performance audit?</p>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} onSubmit={(e) => { e.preventDefault(); setFunnelStep(4) }}>
                      <input type="email" required placeholder="Work Email" className="search-input" value={funnelData.email} onChange={e => setFunnelData({...funnelData, email: e.target.value})} />
                      <input type="text" required placeholder="Company" className="search-input" value={funnelData.company} onChange={e => setFunnelData({...funnelData, company: e.target.value})} />
                      <button type="submit" className="cta-btn cta-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px', backgroundColor: 'var(--accent-magenta)' }}>Get My Performance Audit</button>
                    </form>
                  </div>
                )}

                {funnelStep === 4 && (
                  <div style={{ textAlign: 'center' }} className="fade-in">
                    <div style={{ width: '80px', height: '80px', background: 'rgba(158, 206, 106, 0.15)', color: 'var(--accent-green)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto' }}>
                      <CheckCircle2 size={40} />
                    </div>
                    <h2 className="section-title" style={{ fontSize: '1.75rem' }}>Blueprint Generated!</h2>
                    <p style={{ color: 'var(--tertiary)', marginBottom: '32px' }}>We've calculated that switching to SoberEdge could reduce your {funnelData.currentStack} latency by up to 85%.</p>
                    <button className="cta-btn cta-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px', backgroundColor: 'var(--accent-magenta)' }} onClick={() => setShowFunnel(false)}>Book Implementation Call</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '15px' }}>
          <Globe size={18} />
          <Activity size={18} />
          <ShieldCheck size={18} />
        </div>
        <p>© {new Date().getFullYear()} SOBER. SoberEdge eBPF Runtime. Powered by WebAssembly.</p>
      </footer>
    </div>
  );
}
