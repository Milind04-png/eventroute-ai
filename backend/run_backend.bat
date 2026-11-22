@echo off
title EventRoute AI - FastAPI Backend Service
cd /d "%~dp0"

echo =========================================================================
echo    EVENTROUTE AI - FASTAPI BACKEND SERVICE
echo    API Docs: http://localhost:8001/docs
echo =========================================================================
echo.

set PYTHON_CMD=python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    py --version >nul 2>&1
    if %errorlevel% equ 0 (
        set PYTHON_CMD=py
    )
)

echo Starting Uvicorn server on http://localhost:8001...
%PYTHON_CMD% -m uvicorn main:app --host 127.0.0.1 --port 8001 --reload
pause
