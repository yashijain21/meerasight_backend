$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendDir = Join-Path $root 'backend'
$frontendDir = Join-Path $root 'frontend'

# Ensure backend env exists
$backendEnv = Join-Path $backendDir '.env'
if (-not (Test-Path $backendEnv)) {
  Set-Content -Path $backendEnv -Value "MONGO_URL=mongodb://localhost:27017`nDB_NAME=meerasight`nCORS_ORIGINS=*"
}

# Ensure frontend env exists
$frontendEnv = Join-Path $frontendDir '.env'
if (-not (Test-Path $frontendEnv)) {
  Set-Content -Path $frontendEnv -Value "REACT_APP_BACKEND_URL=http://localhost:8000"
}

$pythonExe = 'C:\Users\LENOVO\AppData\Local\Programs\Python\Python314\python.exe'
$npmCmd = 'C:\Program Files\nodejs\npm.cmd'

Start-Process -FilePath $pythonExe -ArgumentList '-m','uvicorn','server:app','--host','127.0.0.1','--port','8000' -WorkingDirectory $backendDir
Start-Process -FilePath $npmCmd -ArgumentList 'start' -WorkingDirectory $frontendDir

Write-Host 'Backend starting at http://localhost:8000'
Write-Host 'Frontend starting at http://localhost:3000'
