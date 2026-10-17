@echo off
title EventRoute AI Full-Stack Platform
cd /d "%~dp0"

echo =========================================================================
echo    EVENTROUTE AI - EXPLAINABLE OPPORTUNITY INTELLIGENCE
echo    Core Platform + AI Chatbot + OD Leave Automation
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

echo 1. Launching frontend development server...
start cmd /k "cd /d %~dp0 && npm run dev"

echo 2. Launching FastAPI backend server on http://localhost:8000...
echo    Interactive API Documentation: http://localhost:8000/docs
echo.
%PYTHON_CMD% -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
pause
