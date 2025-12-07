#!/bin/bash

# Wichtel App Setup Script
# This script helps set up and run the Wichtel app

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🎄 Wichtel 2025 - Setup Script${NC}\n"

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi
echo "✅ Node.js $(node --version)"

if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install npm"
    exit 1
fi
echo "✅ npm $(npm --version)"

if ! command -v dotnet &> /dev/null; then
    echo "❌ .NET not found. Please install .NET 8 SDK"
    exit 1
fi
echo "✅ .NET $(dotnet --version)"

echo -e "\n${YELLOW}Available commands:${NC}\n"
echo "  ./setup.sh dev          - Start frontend dev server"
echo "  ./setup.sh build        - Build for production"
echo "  ./setup.sh install      - Install dependencies"
echo "  ./setup.sh generate     - Generate assignments"
echo "  ./setup.sh clean        - Clean build artifacts"
echo ""

COMMAND=${1:-help}

case $COMMAND in
  dev)
    echo -e "${BLUE}Starting frontend dev server...${NC}"
    cd frontend
    npm run dev
    ;;
  build)
    echo -e "${BLUE}Building for production...${NC}"
    cd frontend
    npm run build
    echo -e "${GREEN}✓ Build complete! Output in frontend/dist/${NC}"
    ;;
  install)
    echo -e "${BLUE}Installing dependencies...${NC}"
    cd frontend
    npm install
    echo -e "${GREEN}✓ Dependencies installed${NC}"
    ;;
  generate)
    echo -e "${BLUE}Generating assignments...${NC}"
    cd generator
    dotnet build
    dotnet run ../wichtel.json ../frontend/public/data/assignments.json
    echo -e "${GREEN}✓ Assignments generated${NC}"
    ;;
  clean)
    echo -e "${BLUE}Cleaning build artifacts...${NC}"
    rm -rf frontend/dist
    rm -rf frontend/node_modules
    rm -rf generator/bin
    rm -rf generator/obj
    echo -e "${GREEN}✓ Cleaned${NC}"
    ;;
  *)
    echo "Unknown command: $COMMAND"
    exit 1
    ;;
esac
