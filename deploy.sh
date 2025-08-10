#!/bin/bash

# Skill Swap Deployment Script
# This script automates the deployment process

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="skill-swap"
SERVER_DIR="Server"
CLIENT_DIR="Client"
BUILD_DIR="Client/dist"

echo -e "${GREEN}🚀 Starting Skill Swap Deployment${NC}"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Please run this script from the project root directory${NC}"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo -e "${RED}❌ Error: Node.js 16+ is required. Current version: $(node --version)${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js version: $(node --version)${NC}"

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm run install:all

# Check if .env files exist
if [ ! -f "$SERVER_DIR/.env" ]; then
    echo -e "${YELLOW}⚠️  Warning: $SERVER_DIR/.env not found${NC}"
    echo -e "${YELLOW}   Please create it from $SERVER_DIR/env.example${NC}"
    echo -e "${YELLOW}   Continuing with build...${NC}"
fi

if [ ! -f "$CLIENT_DIR/.env.local" ]; then
    echo -e "${YELLOW}⚠️  Warning: $CLIENT_DIR/.env.local not found${NC}"
    echo -e "${YELLOW}   Please create it from $CLIENT_DIR/env.example${NC}"
    echo -e "${YELLOW}   Continuing with build...${NC}"
fi

# Build the client
echo -e "${YELLOW}🔨 Building client application...${NC}"
npm run build:client

if [ ! -d "$BUILD_DIR" ]; then
    echo -e "${RED}❌ Error: Build failed - $BUILD_DIR not found${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Client built successfully${NC}"

# Check if Docker is available
if command -v docker &> /dev/null; then
    echo -e "${GREEN}🐳 Docker detected${NC}"
    
    # Ask user if they want to deploy with Docker
    read -p "Do you want to deploy with Docker? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}🐳 Building and starting Docker containers...${NC}"
        
        # Build and start with docker-compose
        if command -v docker-compose &> /dev/null; then
            docker-compose up -d --build
            echo -e "${GREEN}✅ Docker containers started successfully${NC}"
            echo -e "${GREEN}🌐 Application should be available at: http://localhost:5000${NC}"
        else
            echo -e "${RED}❌ docker-compose not found${NC}"
            echo -e "${YELLOW}   Building Docker image manually...${NC}"
            docker build -t $APP_NAME .
            echo -e "${GREEN}✅ Docker image built successfully${NC}"
            echo -e "${YELLOW}   Run with: docker run -p 5000:5000 $APP_NAME${NC}"
        fi
    else
        echo -e "${YELLOW}📋 Manual deployment instructions:${NC}"
        echo -e "${YELLOW}   1. Copy the built files to your server${NC}"
        echo -e "${YELLOW}   2. Set up environment variables${NC}"
        echo -e "${YELLOW}   3. Start the server with: npm start${NC}"
    fi
else
    echo -e "${YELLOW}📋 Docker not detected. Manual deployment required.${NC}"
    echo -e "${YELLOW}   See DEPLOYMENT.md for detailed instructions.${NC}"
fi

# Show deployment summary
echo -e "${GREEN}🎉 Deployment process completed!${NC}"
echo -e "${GREEN}📁 Build output: $BUILD_DIR${NC}"
echo -e "${GREEN}📚 Documentation: DEPLOYMENT.md${NC}"

# Check if PM2 is available for process management
if command -v pm2 &> /dev/null; then
    echo -e "${GREEN}⚡ PM2 detected - you can use it for process management${NC}"
    echo -e "${YELLOW}   Start with: pm2 start $SERVER_DIR/server.js --name \"$APP_NAME\"${NC}"
fi

echo -e "${GREEN}✨ Happy deploying!${NC}" 