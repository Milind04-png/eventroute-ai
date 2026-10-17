@echo off
title EventRoute AI - Full-Stack Orchestrator
cd /d "%~dp0"

echo =========================================================================
echo    EVENTROUTE AI - EXPLAINABLE OPPORTUNITY INTELLIGENCE
echo    Full-Stack Monorepo Launcher (Frontend + FastAPI Backend)
echo =========================================================================
echo.

:: Detect Python
set PYTHON_CMD=python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    py --version >nul 2>&1
    if %errorlevel% equ 0 (
        set PYTHON_CMD=py
    )
)

echo [1/2] Launching React 19 frontend development server on http://localhost:3000...
start cmd /k "cd /d %~dp0frontend && npm run dev"

echo [2/2] Launching FastAPI backend server on http://localhost:8000...
echo       Interactive API Documentation: http://localhost:8000/docs
echo.
cd /d "%~dp0backend"
%PYTHON_CMD% -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
pause
