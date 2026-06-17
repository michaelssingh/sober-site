import { useState, useEffect } from 'react';
import { 
  Cloud, 
  Database, 
  Network, 
  Terminal,
  Shield,
  Box,
  Settings,
  Activity,
  Play,
  CheckCircle2,
  Code,
  Loader2,
  RefreshCw,
  Zap
} from 'lucide-react';

interface Module {
  id: string;
  name: string;
  category: string;
  description: string;
  version?: string;
  downloads?: number;
}

interface Deployment {
  id: string;
  moduleId: string;
  status: string;
  lastApplied: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'catalog' | 'deployments' | 'settings'>('catalog');
  const [modules, setModules] = useState<Module[]>([]);
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [loading, setLoading] = useState(true);
  const [deployingId, setDeployingId] = useState<string | null>(null);

  const API_BASE = '/api';

  const fetchData = async () => {
    try {
      const [modRes, depRes] = await Promise.all([
        fetch(`${API_BASE}/modules`),
        fetch(`${API_BASE}/deployments`)
      ]);
      const modulesData = await modRes.json();
      const deploymentsData = await depRes.json();
      setModules(modulesData);
      setDeployments(deploymentsData);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, []);

  const handleDeploy = async (moduleId: string) => {
    setDeployingId(moduleId);
    try {
      await fetch(`${API_BASE}/deploy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId })
      });
      fetchData();
    } catch (error) {
      console.error('Deployment failed:', error);
    } finally {
      setTimeout(() => setDeployingId(null), 1500);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-slate-900">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  return (
    <div className="flex h-full bg-slate-900 text-slate-100 font-sans">
      
      {/* Sidebar Navigation */}
      <div className="w-64 border-r border-slate-800 bg-slate-950 flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <Box className="text-blue-500" size={28} />
          <h1 className="text-xl font-bold tracking-tight">IaC Platform</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('catalog')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'catalog' ? 'bg-blue-600/10 text-blue-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
          >
            <Cloud size={18} /> Module Catalog
          </button>
          <button 
            onClick={() => setActiveTab('deployments')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'deployments' ? 'bg-blue-600/10 text-blue-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
          >
            <Activity size={18} /> Deployments
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'settings' ? 'bg-blue-600/10 text-blue-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
          >
            <Settings size={18} /> Environment Settings
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-900 rounded-lg p-3 text-xs text-slate-400">
             <div className="flex items-center gap-2 mb-1">
               <div className="w-2 h-2 rounded-full bg-green-500"></div>
               <span className="text-slate-200 font-medium">Backend Connected</span>
             </div>
             API: http://localhost:4000
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900/50 backdrop-blur-md">
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <span>Workspace: <strong className="text-slate-200">Production-AWS</strong></span>
          </div>
          <button onClick={fetchData} className="text-slate-400 hover:text-white transition-colors">
            <RefreshCw size={18} />
          </button>
        </header>

        <div className="flex-1 overflow-auto p-8">
          
          {activeTab === 'catalog' && (
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">Infrastructure Modules</h2>
                <p className="text-slate-400">Production-ready modules served from the SoberEdge Registry.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map(module => (
                  <div key={module.id} className="bg-slate-950 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition-colors flex flex-col group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
                        {module.category === 'Networking' ? <Network size={24} /> : 
                         module.category === 'Database' ? <Database size={24} /> : 
                         module.category === 'Serverless' ? <Zap size={24} /> : 
                         <Terminal size={24} />}
                      </div>
                      <span className="text-xs font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded">v1.0.0</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">{module.name}</h3>
                    <p className="text-sm text-slate-400 flex-1 mb-6">{module.description}</p>
                    
                    <div className="flex items-center justify-between border-t border-slate-800 pt-4 mt-auto">
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Code size={12} /> Registry Verified
                      </span>
                      <button 
                        onClick={() => handleDeploy(module.id)}
                        disabled={deployingId === module.id}
                        className="text-sm text-blue-400 font-medium hover:text-blue-300 flex items-center gap-1 disabled:opacity-50"
                      >
                        {deployingId === module.id ? 'Deploying...' : 'Deploy'} <Play size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'deployments' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Active Deployments</h2>
              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-900 border-b border-slate-800">
                    <tr>
                      <th className="px-6 py-4 text-sm font-semibold text-slate-400">ID</th>
                      <th className="px-6 py-4 text-sm font-semibold text-slate-400">Module</th>
                      <th className="px-6 py-4 text-sm font-semibold text-slate-400">Status</th>
                      <th className="px-6 py-4 text-sm font-semibold text-slate-400">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {deployments.map(dep => (
                      <tr key={dep.id} className="hover:bg-slate-900/50 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs text-slate-500">{dep.id}</td>
                        <td className="px-6 py-4 text-slate-300 font-medium">{dep.moduleId}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                            dep.status === 'Healthy' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                            'bg-blue-500/10 text-blue-400 border-blue-500/20'
                          }`}>
                            {dep.status === 'Healthy' ? <CheckCircle2 size={12} /> : <Loader2 size={12} className="animate-spin" />}
                            {dep.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">{new Date(dep.lastApplied).toLocaleTimeString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-2xl mx-auto text-center py-20">
              <Shield size={48} className="mx-auto text-slate-600 mb-6" />
              <h2 className="text-2xl font-bold mb-2">Secure Cloud Environments</h2>
              <p className="text-slate-400">Your infrastructure is protected by eBPF-level syscall monitoring.</p>
              <div className="mt-8 flex justify-center gap-4">
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors">
                  Add AWS Account
                </button>
                <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors">
                  View Security Logs
                </button>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
