# Infrastructure Platform Architecture

## Overview
This platform is a comprehensive Infrastructure as Code (IaC) library and deployment orchestrator (similar to Gruntwork or Spacelift).

## Components

1. **Frontend (React/Vite)**
   - SaaS Dashboard to browse available infrastructure modules.
   - Configure parameters for modules (VPC sizes, EKS node groups).
   - Deployment logs and state management UI.

2. **Backend (Planned)**
   - API to handle deployment requests.
   - State locking and secrets management.

3. **IaC Modules (Terraform)**
   - Reusable, battle-tested Terraform modules (e.g., `iac-modules/vpc`, `iac-modules/eks`).
