#!/bin/bash

# Azure Static Web App Deployment Script
# This script creates an Azure Static Web App and configures GitHub Actions deployment

set -e

echo "🚀 Creating Wichtel Azure Static Web App..."
echo ""

# Configuration
RESOURCE_GROUP="wichtel-rg"
APP_NAME="wichtel-app"
LOCATION="westeurope"
GITHUB_REPO="https://github.com/roecher/wichtel"
BRANCH="main"

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo "❌ Azure CLI is not installed."
    echo "Please install it first:"
    echo "  macOS: brew install azure-cli"
    echo "  Or visit: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
    exit 1
fi

# Login to Azure
echo "📝 Logging in to Azure..."
az login

# Create resource group if it doesn't exist
echo "📦 Creating resource group: $RESOURCE_GROUP..."
az group create \
  --name $RESOURCE_GROUP \
  --location $LOCATION \
  || echo "Resource group already exists"

# Create Static Web App with GitHub integration
echo "🌐 Creating Static Web App: $APP_NAME..."
az staticwebapp create \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --source $GITHUB_REPO \
  --location $LOCATION \
  --branch $BRANCH \
  --app-location "frontend" \
  --output-location "dist" \
  --login-with-github

# Get the deployment token
echo "🔑 Getting deployment token..."
DEPLOYMENT_TOKEN=$(az staticwebapp secrets list \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --query "properties.apiKey" \
  --output tsv)

# Get the app URL
APP_URL=$(az staticwebapp show \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --query "defaultHostname" \
  --output tsv)

echo ""
echo "✅ Static Web App created successfully!"
echo ""
echo "📋 Deployment Information:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "App Name:       $APP_NAME"
echo "Resource Group: $RESOURCE_GROUP"
echo "Location:       $LOCATION"
echo "URL:            https://$APP_URL"
echo ""
echo "🔐 Deployment Token (save this as GitHub secret):"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "$DEPLOYMENT_TOKEN"
echo ""
echo "📝 Next Steps:"
echo "1. Copy the deployment token above"
echo "2. Go to: https://github.com/roecher/wichtel/settings/secrets/actions"
echo "3. Create a new secret:"
echo "   Name: AZURE_STATIC_WEB_APPS_API_TOKEN"
echo "   Value: <paste the token>"
echo "4. Push to main branch to trigger deployment"
echo ""
echo "🎉 Done! Your app will be available at: https://$APP_URL"
