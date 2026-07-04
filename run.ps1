# run.ps1 - Unified Dev Server Launcher for IOE Exam Question Paper Generator

# Prepend Node/npm to the session PATH
$env:PATH = "C:\Users\Asus Tuf\AppData\Local\hermes\node;C:\Users\Asus Tuf\AppData\Local\Microsoft\WinGet\Links;" + $env:PATH

Write-Host "🚀 STARTING IOE EXAM GENERATOR (DEV SERVERS)..." -ForegroundColor Cyan

# 1. Start the NestJS Backend Server
Write-Host "🟢 Spawning NestJS Backend on port 5000..." -ForegroundColor Green
$BackendJob = Start-Process -FilePath "cmd" -ArgumentList "/c npm run start:dev" -WorkingDirectory "backend" -PassThru -NoNewWindow

# 2. Start the Vite Frontend Server
Write-Host "🟢 Spawning Vite Frontend on port 5173..." -ForegroundColor Green
$FrontendJob = Start-Process -FilePath "cmd" -ArgumentList "/c npm run dev" -WorkingDirectory "frontend" -PassThru -NoNewWindow

Write-Host "🎉 Both servers launched! Press Ctrl+C in this terminal to shut down both processes." -ForegroundColor Magenta

# Monitor and handle Ctrl+C cleanup
try {
    while ($true) {
        Start-Sleep -Seconds 1
    }
}
finally {
    Write-Host "`n🛑 Shutting down dev servers..." -ForegroundColor Yellow
    if ($BackendJob) {
        Stop-Process -Id $BackendJob.Id -Force -ErrorAction SilentlyContinue
    }
    if ($FrontendJob) {
        Stop-Process -Id $FrontendJob.Id -Force -ErrorAction SilentlyContinue
    }
    Write-Host "👋 Goodbye!" -ForegroundColor Green
}
