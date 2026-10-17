# PowerShell Launcher for EventRoute AI Monorepo
Write-Host "=========================================================================" -ForegroundColor Cyan
Write-Host "   EVENTROUTE AI - FULL-STACK MONOREPO ORCHESTRATOR" -ForegroundColor Green
Write-Host "   Frontend (Port 3000) + FastAPI Backend (Port 8000)" -ForegroundColor Yellow
Write-Host "=========================================================================" -ForegroundColor Cyan
Write-Host ""

$RootDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$FrontendDir = Join-Path $RootDir "frontend"
$BackendDir = Join-Path $RootDir "backend"

# 1. Check frontend dependencies
if (-not (Test-Path "$FrontendDir\node_modules")) {
    Write-Host "[1/3] Installing frontend dependencies in /frontend..." -ForegroundColor Yellow
    Start-Process -FilePath "npm" -ArgumentList "install" -WorkingDirectory $FrontendDir -Wait -NoNewWindow
}

# 2. Detect Python
$python = Get-Command python -ErrorAction SilentlyContinue
if (-not $python) {
    $python = Get-Command py -ErrorAction SilentlyContinue
}

# 3. Launch Backend
if ($python) {
    Write-Host "[2/3] Launching FastAPI Backend on http://localhost:8000 (Docs: /docs)..." -ForegroundColor Green
    Start-Process -FilePath $python.Source -ArgumentList "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload" -WorkingDirectory $BackendDir
} else {
    Write-Host "[2/3] Python not found; frontend will use zero-dependency fallback AI engine." -ForegroundColor Yellow
}

# 4. Launch Frontend
Write-Host "[3/3] Launching React 19 Frontend at http://localhost:3000..." -ForegroundColor Cyan
Start-Process -FilePath "npm" -ArgumentList "run", "dev" -WorkingDirectory $FrontendDir
