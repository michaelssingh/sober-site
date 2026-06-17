# Sober Site Development

## Overview
This is the product repository for the Sober Infrastructure Platform dashboard.

## Development Workflow
The site consists of a React (Vite) frontend and an Express backend.

### Local Development
To start both the frontend and backend servers in the background, use the provided helper script:
```bash
./dev.sh
```
The script redirects logs to `frontend.log` and `backend.log` and saves PIDs to `.pid` files.

To stop the background servers:
```bash
./dev.sh stop
```
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:4000 (Proxied via `/api`)

### Infrastructure & Tunneling
Development happens on a remote VM (**agy**). To access the site from your local workstation (**otus**), you must use the `sprite-tunnel` script from the `sober-nix` repository.

The tunnel forwards the following ports from **agy** to **otus**:
- `5173`: Frontend
- `4000`: Backend API
