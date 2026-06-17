#!/bin/bash
# --- SOBER Dev Manager ---
# Manages background processes for the SOBER Dashboard.

FRONTEND_PID="frontend.pid"
BACKEND_PID="backend.pid"

stop_servers() {
    echo "Stopping servers..."
    if [ -f "$FRONTEND_PID" ]; then
        PID=$(cat "$FRONTEND_PID")
        echo "  - Killing frontend (PID $PID)"
        kill "$PID" 2>/dev/null || true
        rm "$FRONTEND_PID"
    fi
    if [ -f "$BACKEND_PID" ]; then
        PID=$(cat "$BACKEND_PID")
        echo "  - Killing backend (PID $PID)"
        kill "$PID" 2>/dev/null || true
        rm "$BACKEND_PID"
    fi
}

start_servers() {
    stop_servers
    
    echo "Starting backend (API)..."
    cd backend
    # Use setsid or disown to ensure it survives shell exit
    nohup npm run dev > ../backend.log 2>&1 &
    echo $! > "../$BACKEND_PID"
    cd ..

    echo "Starting frontend (Vite)..."
    nohup npm run dev > frontend.log 2>&1 &
    echo $! > "$FRONTEND_PID"

    echo ""
    echo "✓ SOBER Site forked to background!"
    echo "  - Frontend: http://localhost:5173 (Log: frontend.log)"
    echo "  - Backend:  http://localhost:4000 (Log: backend.log)"
    echo "  - PIDs:     $(cat $FRONTEND_PID) (web), $(cat $BACKEND_PID) (api)"
}

case "${1:-start}" in
    start) start_servers ;;
    stop) stop_servers ;;
    restart) start_servers ;;
    *) start_servers ;;
esac
