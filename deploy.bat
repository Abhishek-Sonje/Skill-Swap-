@echo off
setlocal enabledelayedexpansion

REM Skill Swap Deployment Script for Windows
REM This script automates the deployment process

echo 🚀 Starting Skill Swap Deployment

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: Please run this script from the project root directory
    pause
    exit /b 1
)

REM Check Node.js version
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js version: %NODE_VERSION%

REM Install dependencies
echo 📦 Installing dependencies...
call npm run install:all
if errorlevel 1 (
    echo ❌ Error: Failed to install dependencies
    pause
    exit /b 1
)

REM Check if .env files exist
if not exist "Server\.env" (
    echo ⚠️  Warning: Server\.env not found
    echo    Please create it from Server\env.example
    echo    Continuing with build...
)

if not exist "Client\.env.local" (
    echo ⚠️  Warning: Client\.env.local not found
    echo    Please create it from Client\env.example
    echo    Continuing with build...
)

REM Build the client
echo 🔨 Building client application...
call npm run build:client
if errorlevel 1 (
    echo ❌ Error: Build failed
    pause
    exit /b 1
)

if not exist "Client\dist" (
    echo ❌ Error: Build failed - Client\dist not found
    pause
    exit /b 1
)

echo ✅ Client built successfully

REM Check if Docker is available
docker --version >nul 2>&1
if %errorlevel% equ 0 (
    echo 🐳 Docker detected
    
    set /p DOCKER_DEPLOY="Do you want to deploy with Docker? (y/n): "
    if /i "!DOCKER_DEPLOY!"=="y" (
        echo 🐳 Building and starting Docker containers...
        
        REM Check if docker-compose is available
        docker-compose --version >nul 2>&1
        if %errorlevel% equ 0 (
            docker-compose up -d --build
            if errorlevel 1 (
                echo ❌ Error: Failed to start Docker containers
            ) else (
                echo ✅ Docker containers started successfully
                echo 🌐 Application should be available at: http://localhost:5000
            )
        ) else (
            echo ❌ docker-compose not found
            echo 🐳 Building Docker image manually...
            docker build -t skill-swap .
            if errorlevel 1 (
                echo ❌ Error: Failed to build Docker image
            ) else (
                echo ✅ Docker image built successfully
                echo 🐳 Run with: docker run -p 5000:5000 skill-swap
            )
        )
    ) else (
        echo 📋 Manual deployment instructions:
        echo    1. Copy the built files to your server
        echo    2. Set up environment variables
        echo    3. Start the server with: npm start
    )
) else (
    echo 📋 Docker not detected. Manual deployment required.
    echo    See DEPLOYMENT.md for detailed instructions.
)

REM Show deployment summary
echo 🎉 Deployment process completed!
echo 📁 Build output: Client\dist
echo 📚 Documentation: DEPLOYMENT.md

REM Check if PM2 is available for process management
pm2 --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ⚡ PM2 detected - you can use it for process management
    echo    Start with: pm2 start Server\server.js --name "skill-swap"
)

echo ✨ Happy deploying!
pause 