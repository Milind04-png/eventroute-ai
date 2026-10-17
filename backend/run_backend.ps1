# PowerShell Launcher for FastAPI Backend
Write-Host "=========================================================================" -ForegroundColor Cyan
Write-Host "   EVENTROUTE AI - FASTAPI BACKEND SERVICE" -ForegroundColor Green
Write-Host "   Interactive API Documentation: http://localhost:8000/docs" -ForegroundColor Yellow
Write-Host "=========================================================================" -ForegroundColor Cyan
Write-Host ""

$CurrentDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# Check if Python is installed
$python = Get-Command python -ErrorAction SilentlyContinue
if (-not $python) {
    $python = Get-Command py -ErrorAction SilentlyContinue
}

if (-not $python) {
    Write-Error "Python was not detected on your PATH. Please install Python 3.10+."
    exit 1
}

Write-Host "Launching Uvicorn server on http://localhost:8000..." -ForegroundColor Green
Start-Process -FilePath $python.Source -ArgumentList "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload" -WorkingDirectory $CurrentDir
