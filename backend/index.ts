import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Mock Data for Infrastructure Modules
const iacModules = [
  { id: 'vpc', name: 'AWS VPC', category: 'Networking', description: 'Production-grade VPC with public/private subnets and NAT Gateways.' },
  { id: 'eks', name: 'AWS EKS', category: 'Compute', description: 'Managed Kubernetes Cluster with OIDC, IRSA, and autoscaling node groups.' }
];

// In-memory deployment store
const deployments: any[] = [
  { id: 'dep-01', moduleId: 'vpc', status: 'Healthy', lastApplied: new Date().toISOString() }
];

app.get('/api/modules', (req, res) => {
  res.json(iacModules);
});

app.get('/api/deployments', (req, res) => {
  res.json(deployments);
});

app.post('/api/deploy', (req, res) => {
  const { moduleId } = req.body;
  const newDeployment = {
    id: `dep-${Math.random().toString(36).substr(2, 4)}`,
    moduleId,
    status: 'In Progress',
    lastApplied: new Date().toISOString(),
    logs: [
      `Initializing ${moduleId}...`,
      `Analyzing eBPF constraints...`,
      `Compiling WASM bytecode...`,
      `Deployment successful.`
    ]
  };
  deployments.push(newDeployment);
  res.status(201).json(newDeployment);
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', service: 'iac-platform-api' });
});

app.post('/api/leads', (req, res) => {
  const { email } = req.body;
  console.log(`[LEAD CAPTURE] New signup: ${email}`);
  // In a real app, save to DB or send to marketing tool
  res.status(201).json({ success: true, message: 'Lead captured successfully' });
});

app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});
