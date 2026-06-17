import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  LineChart, 
  ChevronRight, 
  Play, 
  RotateCcw, 
  Calculator, 
  Sun, 
  Moon,
  Search,
  Sparkles,
  FileText,
  X,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Cloud,
  Layers,
  AlertTriangle,
  Users
} from 'lucide-react';
import './App.css';

import Dashboard from './Dashboard';
import SoberEdge from './SoberEdge';

// ==========================================
// 1. Data Structure Definitions
// ==========================================
interface Skill {
  name: string;
  category: 'cloud' | 'iac' | 'containers' | 'automation' | 'security';
}

const skillsData: Skill[] = [
  { name: 'AWS (Expert)', category: 'cloud' },
  { name: 'GCP', category: 'cloud' },
  { name: 'Multi-Cloud Architectures', category: 'cloud' },
  { name: 'Terraform (Expert)', category: 'iac' },
  { name: 'NixOS', category: 'iac' },
  { name: 'CloudFormation', category: 'iac' },
  { name: 'Kubernetes (K8s)', category: 'containers' },
  { name: 'Docker', category: 'containers' },
  { name: 'ECS', category: 'containers' },
  { name: 'Fargate', category: 'containers' },
  { name: 'GitHub Actions', category: 'automation' },
  { name: 'Terraform Cloud', category: 'automation' },
  { name: 'GitOps', category: 'automation' },
  { name: 'CircleCI', category: 'automation' },
  { name: 'Datadog', category: 'security' },
  { name: 'Prometheus', category: 'security' },
  { name: 'Vault Enterprise', category: 'security' },
  { name: 'SOC2 Compliance', category: 'security' },
  { name: 'SRE', category: 'security' }
];

const quotes = [
  "Stability is a system, not an event.",
  "Deterministic configurations eliminate 99% of transient environment bugs.",
  "If it isn't observability-driven, it isn't production-ready.",
  "NixOS is the closest we've come to pure mathematical reproducibility in operating systems.",
  "Compliance shouldn't be a audit fire drill—it should be a continuous byproduct of IaC."
];

// ==========================================
// 2. Terminal Simulator Component
// ==========================================
const TerminalSimulator: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [stepIndex, setStepIndex] = useState<number>(0);

  const steps = [
    "$ ./bin/deploy.sh",
    "==> 1. Triggering Nix build on remote VM (sprite@127.0.0.1:2222)...",
    "warning: Git tree '/home/sprite/sober-nix' is dirty",
    "==> 2. Copying built system closure from VM to local store...",
    "copying 14 paths...",
    "==> 3. Activating new configuration...",
    "activating the configuration...",
    "setting up /etc...",
    "reloading user units for michael...",
    "✔ Deployment completed successfully! [Mako Notification Sent]"
  ];

  useEffect(() => {
    if (!isRunning) return;

    if (stepIndex < steps.length) {
      const timer = setTimeout(() => {
        setLines(prev => [...prev, steps[stepIndex]]);
        setStepIndex(prev => prev + 1);
      }, stepIndex === 0 ? 500 : stepIndex % 3 === 0 ? 1200 : 600);
      return () => clearTimeout(timer);
    } else {
      setIsRunning(false);
    }
  }, [isRunning, stepIndex]);

  const startSimulation = () => {
    setLines([]);
    setStepIndex(0);
    setIsRunning(true);
  };

  return (
    <div className="terminal-window" style={{ width: '100%' }}>
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="terminal-dot dot-red"></span>
          <span className="terminal-dot dot-yellow"></span>
          <span className="terminal-dot dot-green"></span>
        </div>
        <span className="terminal-title">michael@otus: ~/sober-nix</span>
      </div>
      <div className="terminal-body">
        {lines.map((line, idx) => {
          let styleClass = "";
          let prefix = "";
          if (line.startsWith("$")) {
            styleClass = "";
            prefix = "$ ";
            line = line.substring(2);
          } else if (line.startsWith("==>")) {
            styleClass = "terminal-info";
          } else if (line.startsWith("warning:") || line.startsWith("copying") || line.startsWith("activating") || line.startsWith("setting") || line.startsWith("reloading")) {
            styleClass = "terminal-subinfo";
          } else if (line.startsWith("✔")) {
            styleClass = "terminal-success";
          }

          return (
            <div key={idx} className={`terminal-line ${styleClass}`}>
              {prefix && <span className="terminal-prompt">{prefix}</span>}
              {line}
            </div>
          );
        })}
        {!isRunning && lines.length === 0 && (
          <div className="terminal-line" style={{ color: '#565f89' }}>
            Click "Run Deploy" to simulate the automated SOBER NixOS delivery pipeline...
          </div>
        )}
        {isRunning && stepIndex < steps.length && (
          <div className="terminal-line" style={{ display: 'inline-block', width: '2px', height: '15px', background: '#a9b1d6', animation: 'blink 0.8s infinite' }}></div>
        )}
        {!isRunning && (
          <button className="terminal-btn" onClick={startSimulation}>
            {lines.length > 0 ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><RotateCcw size={14}/> Reset Simulator</span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Play size={14}/> Run Deploy</span>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 3. SRE Cost Savings Calculator Component
// ==========================================
const CostCalculator: React.FC = () => {
  const [sreCount, setSreCount] = useState<number>(2);
  const [sreSalary, setSreSalary] = useState<number>(160000);

  const soberCost = 2450 * 12; // $29,400 per year
  const inHouseCost = Math.round(sreCount * sreSalary * 1.30); // Salary + 30% overhead/benefits
  const annualSavings = inHouseCost - soberCost;

  return (
    <div className="calculator-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <Calculator className="bento-card-icon" style={{ color: 'var(--accent-magenta)' }} />
        <span className="badge badge-magenta" style={{ margin: 0 }}>Financial Optimizer</span>
      </div>
      <h2>In-House SRE vs. SOBER Subscription</h2>
      <p style={{ color: 'var(--tertiary)' }}>Calculate how much business capital you reclaim by deploying reference stack subscriptions instead of building a platform team from scratch.</p>

      <div className="calculator-grid">
        <div className="calculator-controls">
          <div className="slider-group">
            <div className="slider-label">
              <span>FTE Senior SREs Needed</span>
              <span className="slider-value">{sreCount} Engineer{sreCount > 1 ? 's' : ''}</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="6" 
              value={sreCount} 
              onChange={(e) => setSreCount(Number(e.target.value))} 
            />
          </div>

          <div className="slider-group">
            <div className="slider-label">
              <span>Average Annual Base Salary</span>
              <span className="slider-value">${sreSalary.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="100000" 
              max="240000" 
              step="10000" 
              value={sreSalary} 
              onChange={(e) => setSreSalary(Number(e.target.value))} 
            />
          </div>
        </div>

        <div className="calculator-results">
          <div className="savings-num">${annualSavings.toLocaleString()}</div>
          <div className="savings-label">Your Annual Savings</div>
          <div className="savings-breakdown">
            <div className="breakdown-row">
              <span>Hiring SREs Cost:</span>
              <span style={{ fontFamily: 'monospace' }}>${inHouseCost.toLocaleString()}/yr</span>
            </div>
            <div className="breakdown-row">
              <span>SOBER Subscription:</span>
              <span style={{ fontFamily: 'monospace' }}>${soberCost.toLocaleString()}/yr</span>
            </div>
            <div className="breakdown-row" style={{ color: 'var(--accent-teal)' }}>
              <span>Total Reclaimed:</span>
              <span style={{ fontFamily: 'monospace' }}>${annualSavings.toLocaleString()}/yr</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. App Main Component
// ==========================================
export default function App() {
  const [view, setView] = useState<'home' | 'services' | 'philosophy' | 'resume' | 'platform' | 'edge'>('home');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mascotQuote, setMascotQuote] = useState<string>(quotes[0]);
  const [quoteIndex, setQuoteIndex] = useState<number>(0);
  
  // Lead Funnel Modal State
  const [showFunnel, setShowFunnel] = useState<boolean>(false);
  const [funnelStep, setFunnelStep] = useState<number>(1);
  const [funnelData, setFunnelData] = useState({
    cloudProvider: '',
    monthlySpend: '',
    bottleneck: '',
    teamSize: '',
    name: '',
    email: '',
    company: ''
  });

  // Resume filters state
  const [skillSearch, setSkillSearch] = useState<string>('');
  const [skillCategory, setSkillCategory] = useState<string>('all');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleMascotClick = () => {
    const nextIdx = (quoteIndex + 1) % quotes.length;
    setQuoteIndex(nextIdx);
    setMascotQuote(quotes[nextIdx]);
  };

  const startLeadFunnel = () => {
    setFunnelStep(1);
    setFunnelData({
      cloudProvider: '',
      monthlySpend: '',
      bottleneck: '',
      teamSize: '',
      name: '',
      email: '',
      company: ''
    });
    setShowFunnel(true);
  };

  const handleFunnelOption = (field: string, value: string) => {
    setFunnelData(prev => ({ ...prev, [field]: value }));
    setFunnelStep(prev => prev + 1);
  };

  const handleFunnelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFunnelStep(6); // Final custom recommendation step
  };

  // Filter skills based on tab and search query
  const filteredSkills = skillsData.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(skillSearch.toLowerCase());
    const matchesTab = skillCategory === 'all' || skill.category === skillCategory;
    return matchesSearch && matchesTab;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* ==========================================
         NAVIGATION HEADER
         ========================================== */}
      <header className="site-header">
        <div className="nav-container">
          <button className="logo-link" onClick={() => setView('home')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <Cpu className="logo-icon" />
            <span>SOBER</span>
          </button>
          
          <nav className="nav-links">
            <button 
              className={`nav-link ${view === 'services' ? 'active' : ''}`} 
              onClick={() => setView('services')}
            >
              Services & Subscriptions
            </button>
            <button 
              className={`nav-link ${view === 'philosophy' ? 'active' : ''}`} 
              onClick={() => setView('philosophy')}
            >
              Philosophy
            </button>
            <button 
              className={`nav-link ${view === 'resume' ? 'active' : ''}`} 
              onClick={() => setView('resume')}
            >
              Resume
            </button>
            <button 
              className={`nav-link ${view === 'platform' ? 'active' : ''}`} 
              onClick={() => setView('platform')}
              style={{ color: 'var(--accent-blue)', fontWeight: 'bold' }}
            >
              Platform Demo
            </button>
            <button 
              className={`nav-link ${view === 'edge' ? 'active' : ''}`} 
              onClick={() => setView('edge')}
              style={{ color: 'var(--accent-magenta)', fontWeight: 'bold' }}
            >
              SoberEdge
            </button>
            
            <button 
              className="cta-btn cta-primary" 
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              onClick={startLeadFunnel}
            >
              Free SRE Audit
            </button>

            <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle dark mode">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>
        </div>
      </header>

      {/* ==========================================
         PAGE VIEW ROUTER
         ========================================== */}
      <main style={{ flexGrow: 1 }}>
        
        {/* 4.1 HOME VIEW */}
        {view === 'home' && (
          <div className="landing-container fade-in">
            <section className="hero-section">
              <div className="hero-content">
                <span className="badge badge-magenta" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={12} /> Platform Engineering on Autopilot
                </span>
                <h1 className="hero-title">Your Entire Cloud Stack.<br/><span className="gradient-text">Deployed in 24 Hours.</span></h1>
                <p className="hero-subtitle">We build, deploy, and maintain secure, SOC2-ready, fully observable infrastructure directly in your AWS, GCP, or Fly.io account. Stop building VPCs; start shipping product.</p>
                <div className="hero-ctas">
                  <button className="cta-btn cta-primary" onClick={startLeadFunnel}>
                    Start Free Infrastructure Audit <ChevronRight size={16} />
                  </button>
                  <button className="cta-btn cta-secondary" onClick={() => setView('services')}>
                    Explore Pricing & Subscriptions
                  </button>
                </div>
              </div>

              <div className="mascot-container">
                <div style={{ textAlign: 'center' }}>
                  <img 
                    src="/images/owl-mascot.svg" 
                    alt="SOBER Owl Mascot" 
                    className="mascot-graphic"
                    onClick={handleMascotClick}
                  />
                  <div style={{
                    marginTop: '20px', 
                    padding: '12px 18px', 
                    background: 'var(--entry)', 
                    border: '1px solid var(--border)', 
                    borderRadius: '8px',
                    fontSize: '0.88rem',
                    fontStyle: 'italic',
                    maxWidth: '300px',
                    marginInline: 'auto',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all 0.3s ease'
                  }}>
                    "{mascotQuote}"
                    <div style={{ fontSize: '0.75rem', color: 'var(--tertiary)', marginTop: '6px', fontWeight: 'bold' }}>
                      (Click owl for next platform insight)
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Terminal Live Simulation Section */}
            <section style={{ padding: '40px 0 80px 0', borderTop: '1px solid var(--border)' }}>
              <h2 className="section-title">Declarative Deployment Pipeline</h2>
              <p className="section-subtitle">Observe SOBER's git-triggered developer deployment workflow in action.</p>
              <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <TerminalSimulator />
              </div>
            </section>

            {/* Bento Grid Features */}
            <section className="features-section" style={{ borderTop: '1px solid var(--border)' }}>
              <h2 className="section-title">Engineered for Velocity. Hardened for Security.</h2>
              <p className="section-subtitle">We provide a fully managed, versioned infrastructure stack so you can focus on building features.</p>
              
              <div className="bento-grid">
                <div className="bento-card card-large">
                  <span className="badge badge-blue">Ready in 24 Hours</span>
                  <h3><Cpu className="bento-card-icon" /> The SOBER Reference Architecture</h3>
                  <p>Get a production-grade VPC network layout, security group policies, IAM least-privilege configurations, and GitOps-native Kubernetes deployment pipelines. Configured entirely in version-controlled Terraform modules.</p>
                </div>
                
                <div className="bento-card card-medium">
                  <span className="badge badge-magenta">Onboarding</span>
                  <h3><Terminal className="bento-card-icon" /> Zero-Friction Dev Environments</h3>
                  <p>Onboard new hires in 2 minutes instead of 2 weeks. SOBER configures local workspaces using Nix shell, guaranteeing a 100% reproducible tech stack on every developer machine.</p>
                </div>
                
                <div className="bento-card card-medium">
                  <span className="badge badge-teal">Auditing</span>
                  <h3><ShieldCheck className="bento-card-icon" /> SOC2 Compliance out of the Box</h3>
                  <p>Security policies and audit logging are built into the platform's DNA. We automate credential rotation, encrypt data-at-rest and in-transit, and enforce TLS globally.</p>
                </div>
                
                <div className="bento-card card-large">
                  <span className="badge badge-green">Telemetry</span>
                  <h3><LineChart className="bento-card-icon" /> Deep Observability Pipeline</h3>
                  <p>Don't run blind in production. SOBER provisions a unified telemetry pipeline using Prometheus metrics, Loki log aggregation, Grafana dashboards, and Vector routers automatically routed to your Slack alerts.</p>
                </div>
              </div>
            </section>

            {/* SRE Calculator Section */}
            <section className="calculator-section">
              <CostCalculator />
            </section>
          </div>
        )}

        {/* 4.2 SERVICES VIEW */}
        {view === 'services' && (
          <div className="page-container fade-in">
            <h1 className="page-title"><span className="gradient-text">Services & Subscriptions</span></h1>
            <p className="page-subtitle">Production-Grade Infrastructure as a Service. We write and maintain the code; you own the cloud.</p>

            <div className="resume-grid" style={{ marginBottom: '50px' }}>
              <div className="resume-section" style={{ marginBottom: 0 }}>
                <span className="badge badge-blue">Ready in 24 Hours</span>
                <h3 style={{ margin: '5px 0 10px 0' }}>The Reference Architecture</h3>
                <p>Your complete production footprint. A multi-region secure network (VPC), Kubernetes runtime, secure secrets vault (SOPS/Vault), and GitOps CI/CD pipelines deployed to your cloud account in hours.</p>
              </div>
              <div className="resume-section" style={{ marginBottom: 0 }}>
                <span className="badge badge-magenta">Nix-Powered</span>
                <h3 style={{ margin: '5px 0 10px 0' }}>Deterministic Dev Workspaces</h3>
                <p>Onboard developers in 2 minutes, not 2 weeks. We unify local workstations and CI/CD pipelines using Nix shell, eliminating the "works on my machine" class of bugs forever.</p>
              </div>
              <div className="resume-section" style={{ marginBottom: 0 }}>
                <span className="badge badge-teal">SOC2 Ready</span>
                <h3 style={{ margin: '5px 0 10px 0' }}>Production Guardrails</h3>
                <p>Security is built into the foundation, not bolted on. Get minimum-privilege IAM policies, encrypted storage, and real-time observability telemetry (Prometheus/Grafana/Loki) out of the box.</p>
              </div>
            </div>

            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '10px' }}>Subscription Pricing</h2>
            <p style={{ textAlign: 'center', color: 'var(--tertiary)', marginBottom: '40px' }}>Fair, transparent pricing for teams of all sizes.</p>

            <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
              <div className="bento-card" style={{ borderTop: '4px solid var(--accent-blue)', display: 'flex', flexDirection: 'column' }}>
                <span className="badge badge-blue">New Product</span>
                <h3 style={{ margin: '5px 0' }}>SoberEdge: eBPF FaaS</h3>
                <p style={{ fontSize: '0.95rem', margin: '10px 0' }}>Next-generation WebAssembly runtime with kernel-level observability. Zero cold starts, global scale.</p>
                <div style={{ marginTop: 'auto' }}>
                   <button onClick={() => setView('edge')} className="cta-btn cta-secondary" style={{ width: '100%', justifyContent: 'center' }}>Explore SoberEdge →</button>
                </div>
              </div>

              <div className="bento-card" style={{ borderTop: '4px solid var(--accent-blue)', display: 'flex', flexDirection: 'column' }}>
                <span className="badge badge-blue">For Early Stage</span>
                <h3 style={{ margin: '5px 0' }}>Reference Boot</h3>
                <p style={{ fontFamily: 'monospace', color: 'var(--accent-blue)', fontSize: '1.6rem', fontWeight: 'bold', margin: '10px 0' }}>$12,500 <span style={{ fontSize: '0.9rem', fontWeight: 'normal', color: 'var(--content)' }}>one-time</span></p>
                <p style={{ fontSize: '0.95rem' }}>A rock-solid production blueprint for startups that need to launch instantly and correctly.</p>
                <ul style={{ fontSize: '0.9rem', paddingLeft: '20px', marginTop: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li>Full AWS/GCP Reference Architecture</li>
                  <li>Nix-based local developer configurations</li>
                  <li>GitHub Actions / GitOps CI/CD templates</li>
                  <li>30 days of post-launch SRE handoff support</li>
                </ul>
                <button className="cta-btn cta-secondary" style={{ marginTop: '25px', width: '100%', justifyContent: 'center' }} onClick={startLeadFunnel}>Get Started</button>
              </div>

              <div className="bento-card" style={{ borderTop: '4px solid var(--accent-magenta)', display: 'flex', flexDirection: 'column', boxShadow: '0 8px 24px rgba(187, 154, 247, 0.15)' }}>
                <span className="badge badge-magenta">Most Popular</span>
                <h3 style={{ margin: '5px 0' }}>Continuous Platform</h3>
                <p style={{ fontFamily: 'monospace', color: 'var(--accent-magenta)', fontSize: '1.6rem', fontWeight: 'bold', margin: '10px 0' }}>$2,450 <span style={{ fontSize: '0.9rem', fontWeight: 'normal', color: 'var(--content)' }}>/ month</span></p>
                <p style={{ fontSize: '0.95rem' }}>We act as your dedicated platform engineering team. We write the code; you own the cloud.</p>
                <ul style={{ fontSize: '0.9rem', paddingLeft: '20px', marginTop: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li><strong>Everything in Reference Boot included</strong></li>
                  <li>Continuous security patching and NixOS version upgrades</li>
                  <li>Automated dependency updates delivered via Pull Requests</li>
                  <li>Dedicated Slack channel with senior SOBER architects</li>
                  <li>2-hour urgent SLA response time</li>
                </ul>
                <button className="cta-btn cta-primary" style={{ marginTop: '25px', width: '100%', justifyContent: 'center' }} onClick={startLeadFunnel}>Subscribe Now</button>
              </div>
            </div>
          </div>
        )}

        {/* 4.3 PHILOSOPHY VIEW */}
        {view === 'philosophy' && (
          <div className="page-container fade-in">
            <h1 className="page-title"><span className="gradient-text">The SOBER Manifesto</span></h1>
            <p className="page-subtitle">Stability is a System. We apply the same rigor to our infrastructure that we apply to our lives.</p>

            <div className="resume-section">
              <h2 style={{ borderBottom: 'none', marginBottom: '10px' }}>Stability is a byproduct of discipline.</h2>
              <p>At SOBER, we reject technical volatility. We believe that cloud environments should be deterministic, immutable, and fully auditable. Modern development processes require platforms that protect builders from configuration drift and human error.</p>
            </div>

            <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginTop: '40px' }}>
              <div className="bento-card" style={{ padding: '24px', textAlign: 'center' }}>
                <span className="badge badge-blue">Pillar 1</span>
                <h4 style={{ color: 'var(--accent-blue)', fontSize: '1.2rem', marginBottom: '8px' }}>Compliant</h4>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>Governance by design. Secure architectures that satisfy compliance requirements natively.</p>
              </div>
              <div className="bento-card" style={{ padding: '24px', textAlign: 'center' }}>
                <span className="badge badge-magenta">Pillar 2</span>
                <h4 style={{ color: 'var(--accent-magenta)', fontSize: '1.2rem', marginBottom: '8px' }}>Composable</h4>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>Modular, declarative, and version-controlled infrastructure as code libraries.</p>
              </div>
              <div className="bento-card" style={{ padding: '24px', textAlign: 'center' }}>
                <span className="badge badge-teal">Pillar 3</span>
                <h4 style={{ color: 'var(--accent-teal)', fontSize: '1.2rem', marginBottom: '8px' }}>Cloud-Agnostic</h4>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>Ownership of your technical destiny. Open standards that migrate seamlessly.</p>
              </div>
              <div className="bento-card" style={{ padding: '24px', textAlign: 'center' }}>
                <span className="badge badge-green">Pillar 4</span>
                <h4 style={{ color: 'var(--accent-green)', fontSize: '1.2rem', marginBottom: '8px' }}>Observable</h4>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>If it isn't measured, it doesn't exist. Telemetry built directly into core components.</p>
              </div>
            </div>
          </div>
        )}

        {/* 4.4 RESUME VIEW */}
        {view === 'resume' && (
          <div className="page-container fade-in">
            <h1 className="page-title"><span className="gradient-text">Michael Singh</span></h1>
            <p className="page-subtitle">Senior DevOps Architect & Founder | Barbados | michael@sober.fyi</p>

            <div className="resume-section">
              <h2>Professional Summary</h2>
              <p>Senior DevOps Architect and Founder with over 10 years of experience designing secure, compliant infrastructure for high-growth US startups and FinTech unicorns. I specialize in <strong>Infrastructure-as-Code (IaC)</strong>, <strong>NixOS</strong>, and <strong>FinOps (Cloud Cost Reduction)</strong>. I bridge the gap between complex engineering problems and business goals, delivering "Golden Path" architectures that allow teams to ship faster with zero downtime.</p>
            </div>

            {/* Interactive Filterable Skills Finder */}
            <div className="resume-section">
              <h2>Core Competencies</h2>
              <div className="skills-finder">
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Search size={18} style={{ color: 'var(--tertiary)' }} />
                  <input 
                    type="text" 
                    placeholder="Search skills (e.g. AWS, Terraform, NixOS...)" 
                    className="search-input"
                    value={skillSearch}
                    onChange={(e) => setSkillSearch(e.target.value)}
                  />
                </div>
                
                <div className="category-tabs">
                  <button 
                    className={`category-tab ${skillCategory === 'all' ? 'active' : ''}`}
                    onClick={() => setSkillCategory('all')}
                  >
                    All Skills
                  </button>
                  <button 
                    className={`category-tab ${skillCategory === 'cloud' ? 'active' : ''}`}
                    onClick={() => setSkillCategory('cloud')}
                  >
                    Cloud
                  </button>
                  <button 
                    className={`category-tab ${skillCategory === 'iac' ? 'active' : ''}`}
                    onClick={() => setSkillCategory('iac')}
                  >
                    IaC
                  </button>
                  <button 
                    className={`category-tab ${skillCategory === 'containers' ? 'active' : ''}`}
                    onClick={() => setSkillCategory('containers')}
                  >
                    Containers
                  </button>
                  <button 
                    className={`category-tab ${skillCategory === 'automation' ? 'active' : ''}`}
                    onClick={() => setSkillCategory('automation')}
                  >
                    CI/CD
                  </button>
                  <button 
                    className={`category-tab ${skillCategory === 'security' ? 'active' : ''}`}
                    onClick={() => setSkillCategory('security')}
                  >
                    Security / SRE
                  </button>
                </div>
              </div>

              <div className="skills-tags-container">
                {filteredSkills.map((skill, idx) => (
                  <span key={idx} className="skill-tag">
                    {skill.name}
                  </span>
                ))}
                {filteredSkills.length === 0 && (
                  <span style={{ color: 'var(--tertiary)', fontSize: '0.9rem' }}>No skills match your search/filter criteria.</span>
                )}
              </div>
            </div>

            {/* Professional Experience Timeline */}
            <div className="resume-section">
              <h2>Professional Experience</h2>
              <div className="experience-timeline">
                
                <div className="timeline-item">
                  <div className="timeline-header">
                    <h3 className="timeline-role">Founder & Principal DevOps Architect</h3>
                    <span className="timeline-date">May 2023 – Present</span>
                  </div>
                  <div className="timeline-company">SYSTEMS ORIENTED BUSINESS ENGINEERING & RESEARCH (SOBER)</div>
                  <div className="timeline-body">
                    <ul>
                      <li>Founded a boutique consultancy delivering production-grade, security-hardened Reference Architectures to enable deterministic, reproducible cloud infrastructure.</li>
                      <li><strong>suena.energy (Staff DevOps)</strong>: Roadmapped the transition from manual ops to enterprise-grade automation.</li>
                      <li><strong>FinOps Leadership</strong>: Executed comprehensive cost-reduction strategies for AWS resources, optimizing instance sizing and budget efficiency.</li>
                      <li><strong>Levee (Senior Infrastructure Architect)</strong>: Implemented Terraform Cloud and GitHub Actions to drive a "commit-to-deploy" workflow with zero manual interference.</li>
                    </ul>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-header">
                    <h3 className="timeline-role">Senior DevOps Engineer</h3>
                    <span className="timeline-date">2021 – 2023</span>
                  </div>
                  <div className="timeline-company">GEM</div>
                  <div className="timeline-body">
                    <ul>
                      <li>Orchestrated the architectural design and management of a multi-cloud footprint focused on high availability.</li>
                      <li>Spearheaded a major infrastructure refactor that resulted in a ~20% reduction in monthly cloud costs.</li>
                    </ul>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-header">
                    <h3 className="timeline-role">DevOps Engineer</h3>
                    <span className="timeline-date">2019 – 2021</span>
                  </div>
                  <div className="timeline-company">CHAINALYSIS</div>
                  <div className="timeline-body">
                    <ul>
                      <li>Designed critical infrastructure supporting AML/KYC software used by global governments and financial institutions.</li>
                      <li>Executed a high-stakes migration of compliance software from Hetzner to AWS with zero unexpected downtime.</li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }} className="cta-btn cta-primary">
                <FileText size={18} /> Download Full Resume (PDF)
              </a>
            </div>
          </div>
        )}

        {view === 'platform' && (
          <div className="fade-in" style={{ height: 'calc(100vh - 80px)' }}>
            <Dashboard />
          </div>
        )}

        {view === 'edge' && (
          <div className="fade-in">
            <SoberEdge onBack={() => setView('home')} />
          </div>
        )}

      </main>

      {/* ==========================================
         CPA LEAD FUNNEL MODAL
         ========================================== */}
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
            border: '1.5px solid var(--border)',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '560px',
            boxShadow: 'var(--shadow-md)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Free Cloud Assessment</h3>
              <button 
                onClick={() => setShowFunnel(false)}
                style={{ background: 'none', border: 'none', color: 'var(--content)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Funnel Content */}
            <div style={{ padding: '24px', maxHeight: '75vh', overflowY: 'auto' }}>
              
              {/* Step 1: Cloud Provider */}
              {funnelStep === 1 && (
                <div className="fade-in">
                  <span className="badge badge-blue">Step 1 of 5</span>
                  <h3 style={{ marginBottom: '15px' }}>Which cloud provider does your startup use?</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button 
                      onClick={() => handleFunnelOption('cloudProvider', 'AWS')}
                      style={{ padding: '14px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--theme)', color: 'var(--primary)', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                      <Cloud size={16} /> AWS (Amazon Web Services)
                    </button>
                    <button 
                      onClick={() => handleFunnelOption('cloudProvider', 'GCP')}
                      style={{ padding: '14px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--theme)', color: 'var(--primary)', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                      <Cloud size={16} /> GCP (Google Cloud Platform)
                    </button>
                    <button 
                      onClick={() => handleFunnelOption('cloudProvider', 'Fly.io')}
                      style={{ padding: '14px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--theme)', color: 'var(--primary)', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                      <Layers size={16} /> Fly.io / MicroVMs
                    </button>
                    <button 
                      onClick={() => handleFunnelOption('cloudProvider', 'Multi-Cloud')}
                      style={{ padding: '14px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--theme)', color: 'var(--primary)', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                      <Layers size={16} /> Multi-Cloud Topology
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Monthly Spend */}
              {funnelStep === 2 && (
                <div className="fade-in">
                  <span className="badge badge-magenta">Step 2 of 5</span>
                  <h3 style={{ marginBottom: '15px' }}>What is your estimated monthly hosting spend?</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button 
                      onClick={() => handleFunnelOption('monthlySpend', '< $5,000')}
                      style={{ padding: '14px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--theme)', color: 'var(--primary)', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold' }}
                    >
                      Under $5,000 / mo
                    </button>
                    <button 
                      onClick={() => handleFunnelOption('monthlySpend', '$5,000 - $20,000')}
                      style={{ padding: '14px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--theme)', color: 'var(--primary)', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold' }}
                    >
                      $5,000 to $20,000 / mo
                    </button>
                    <button 
                      onClick={() => handleFunnelOption('monthlySpend', '$20,000 - $100,000')}
                      style={{ padding: '14px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--theme)', color: 'var(--primary)', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold' }}
                    >
                      $20,000 to $100,000 / mo
                    </button>
                    <button 
                      onClick={() => handleFunnelOption('monthlySpend', '$100,000+')}
                      style={{ padding: '14px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--theme)', color: 'var(--primary)', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold' }}
                    >
                      Over $100,000 / mo
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Main Challenge */}
              {funnelStep === 3 && (
                <div className="fade-in">
                  <span className="badge badge-teal">Step 3 of 5</span>
                  <h3 style={{ marginBottom: '15px' }}>What is your primary infrastructure bottleneck?</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button 
                      onClick={() => handleFunnelOption('bottleneck', 'Compliance (SOC2/ISO)')}
                      style={{ padding: '14px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--theme)', color: 'var(--primary)', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                      <ShieldCheck size={16} /> Preparing for compliance audit (SOC2/ISO)
                    </button>
                    <button 
                      onClick={() => handleFunnelOption('bottleneck', 'High Hosting Costs')}
                      style={{ padding: '14px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--theme)', color: 'var(--primary)', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                      <AlertTriangle size={16} /> Excessive cloud bills / FinOps optimization
                    </button>
                    <button 
                      onClick={() => handleFunnelOption('bottleneck', 'Slow Developer Onboarding')}
                      style={{ padding: '14px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--theme)', color: 'var(--primary)', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                      <Terminal size={16} /> Slow workspace onboarding (Nix environments)
                    </button>
                    <button 
                      onClick={() => handleFunnelOption('bottleneck', 'Unstable Deployments')}
                      style={{ padding: '14px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--theme)', color: 'var(--primary)', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                      <Cpu size={16} /> Unstable / flaky deployments or configuration drift
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Team Scale */}
              {funnelStep === 4 && (
                <div className="fade-in">
                  <span className="badge badge-green">Step 4 of 5</span>
                  <h3 style={{ marginBottom: '15px' }}>How many engineers are in your team?</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button 
                      onClick={() => handleFunnelOption('teamSize', '1 - 5')}
                      style={{ padding: '14px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--theme)', color: 'var(--primary)', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                      <Users size={16} /> 1 to 5 developers
                    </button>
                    <button 
                      onClick={() => handleFunnelOption('teamSize', '6 - 20')}
                      style={{ padding: '14px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--theme)', color: 'var(--primary)', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                      <Users size={16} /> 6 to 20 developers
                    </button>
                    <button 
                      onClick={() => handleFunnelOption('teamSize', '21 - 100')}
                      style={{ padding: '14px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--theme)', color: 'var(--primary)', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                      <Users size={16} /> 21 to 100 developers
                    </button>
                    <button 
                      onClick={() => handleFunnelOption('teamSize', '100+')}
                      style={{ padding: '14px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--theme)', color: 'var(--primary)', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                      <Users size={16} /> Over 100 developers
                    </button>
                  </div>
                </div>
              )}

              {/* Step 5: Contact Details */}
              {funnelStep === 5 && (
                <form onSubmit={handleFunnelSubmit} className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <span className="badge badge-blue">Step 5 of 5</span>
                  <h3>Get Your Custom SOBER Stack Proposal</h3>
                  <p style={{ color: 'var(--tertiary)', fontSize: '0.9rem' }}>Fill in your details below. SOBER will calculate your savings and prepare an architecture blueprint based on your parameters.</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Michael Singh"
                      className="search-input" 
                      value={funnelData.name}
                      onChange={(e) => setFunnelData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Company Web URL</label>
                    <input 
                      type="url" 
                      required
                      placeholder="https://sober.fyi" 
                      className="search-input"
                      value={funnelData.company}
                      onChange={(e) => setFunnelData(prev => ({ ...prev, company: e.target.value }))}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Work Email</label>
                    <input 
                      type="email" 
                      required
                      placeholder="michael@sober.fyi" 
                      className="search-input"
                      value={funnelData.email}
                      onChange={(e) => setFunnelData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="cta-btn cta-primary" 
                    style={{ marginTop: '15px', justifyContent: 'center' }}
                  >
                    Generate SOBER Proposal <ArrowRight size={16} />
                  </button>
                </form>
              )}

              {/* Step 6: Custom Proposal (funnel completed) */}
              {funnelStep === 6 && (
                <div className="fade-in" style={{ textAlign: 'center' }}>
                  <CheckCircle2 size={48} style={{ color: 'var(--accent-green)', marginBottom: '15px' }} />
                  <h2>Assessment Completed!</h2>
                  <p style={{ color: 'var(--tertiary)', marginBottom: '24px' }}>Hey {funnelData.name}, we've generated a custom blueprint for {funnelData.company.replace('https://', '')}.</p>

                  <div style={{
                    background: 'var(--theme)',
                    border: '1px solid var(--border)',
                    borderRadius: '10px',
                    padding: '20px',
                    textAlign: 'left',
                    marginBottom: '25px',
                    fontSize: '0.92rem'
                  }}>
                    <h4 style={{ color: 'var(--primary)', marginBottom: '10px' }}>Your Customized Recommendation:</h4>
                    <p style={{ marginBottom: '12px' }}>✔ <strong>Architecture Target:</strong> Deployed as a secure, SOC2-ready <strong>{funnelData.cloudProvider} Reference Architecture</strong>.</p>
                    {funnelData.bottleneck.includes('Compliance') && (
                      <p style={{ marginBottom: '12px' }}>✔ <strong>Compliance Focus:</strong> Pre-configured Vault secrets, KMS storage encryption, and IAM minimum-privilege audit logging to clear compliance audits immediately.</p>
                    )}
                    {funnelData.bottleneck.includes('Costs') && (
                      <p style={{ marginBottom: '12px' }}>✔ <strong>FinOps Focus:</strong> AWS budget alerts, Fargate CPU autoscaling, and remote building on flycast to reduce monthly cloud spend (Estimated saving: ~25% off your {funnelData.monthlySpend} bill).</p>
                    )}
                    {funnelData.bottleneck.includes('Onboarding') && (
                      <p style={{ marginBottom: '12px' }}>✔ <strong>Developer Onboarding:</strong> Standardized Nix Shell environment configurations. New developers will boot their workspaces in under 2 minutes.</p>
                    )}
                    <p>✔ <strong>Action Plan:</strong> Scale Subscription ($2,450/month) for continuous PR upgrades, library modules, and Slack support.</p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <a 
                      href="mailto:michael@sober.fyi?subject=SOBER Stack Review"
                      className="cta-btn cta-primary" 
                      style={{ justifyContent: 'center' }}
                      onClick={() => setShowFunnel(false)}
                    >
                      <Calendar size={16} /> Book 15-Min SRE consultation
                    </a>
                    <button 
                      onClick={() => setShowFunnel(false)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--tertiary)',
                        cursor: 'pointer',
                        fontSize: '0.85rem'
                      }}
                    >
                      Return to Homepage
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ==========================================
         FOOTER
         ========================================== */}
      <footer className="site-footer">
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '15px' }}>
          <a href="https://github.com/michaelssingh" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ display: 'flex', alignItems: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/></svg>
          </a>
          <a href="mailto:michael@sober.fyi" aria-label="Email" style={{ display: 'flex', alignItems: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </a>
          <a href="https://linkedin.com/in/michaelssingh" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ display: 'flex', alignItems: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </div>
        <p>© {new Date().getFullYear()} SOBER. Systems Oriented Business Engineering & Research. Powered by React & Vite.</p>
      </footer>
    </div>
  );
}
