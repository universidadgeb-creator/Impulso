@echo off
cd /d "%~dp0"
start "" "http://localhost:3456/bienvenida.html"
python -m http.server 3456
pause
