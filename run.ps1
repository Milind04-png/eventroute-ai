# PowerShell Launcher for EventRoute AI
Write-Host "=========================================================================" -ForegroundColor Cyan
Write-Host "   EVENTROUTE AI - EXPLAINABLE OPPORTUNITY INTELLIGENCE" -ForegroundColor Green
Write-Host "   Fulfills Priority Build Order & Judge Demo Flow" -ForegroundColor Yellow
Write-Host "=========================================================================" -ForegroundColor Cyan
Write-Host ""

$CurrentDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# Check if npm modules exist
if (-not (Test-Path "$CurrentDir\node_modules")) {
    Write-Host "[1/2] Installing Node.js frontend dependencies..." -ForegroundColor Yellow
    Start-Process -FilePath "npm" -ArgumentList "install" -WorkingDirectory $CurrentDir -Wait -NoNewWindow
}

Write-Host "[2/2] Launching Vite development server at http://localhost:3000..." -ForegroundColor Green
Start-Process -FilePath "npm" -ArgumentList "run", "dev" -WorkingDirectory $CurrentDir
