# Azure Deployment Setup Guide

This guide walks you through setting up continuous deployment for the Wichtel app to Azure Static Web Apps using GitHub Actions.

## Prerequisites

- Azure subscription
- GitHub account with the wichtel repository
- Admin access to both Azure and GitHub

## Step 1: Create Azure Static Web App

### Option A: Using Azure Portal

1. Go to [Azure Portal](https://portal.azure.com)
2. Click **Create a resource** → search for **Static Web App**
3. Click **Create**
4. Fill in the details:
   - **Resource Group**: Create new or select existing
   - **Name**: `wichtel-app` (or your preferred name)
   - **Plan**: Free (for development) or Standard (for production)
   - **Region**: Select closest to you
5. Click **Next: Deployment details**

### Option B: Using Azure CLI

```bash
az staticwebapp create \
  --name wichtel-app \
  --resource-group my-resource-group \
  --source https://github.com/roecher/wichtel \
  --location westeurope \
  --branch main \
  --build-folder frontend/dist \
  --app-location frontend
```

## Step 2: Get the Deployment Token

1. In Azure Portal, go to your Static Web App resource
2. Click **Manage deployment token**
3. Copy the API token

## Step 3: Add GitHub Secret

1. Go to your GitHub repository: https://github.com/roecher/wichtel
2. Go to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
5. Value: Paste the deployment token
6. Click **Add secret**

## Step 4: Configure Deployment

The GitHub Actions workflow (`.github/workflows/azure-deploy.yml`) will automatically:

1. Build the React frontend
2. Deploy to Azure Static Web Apps on every push to `main`
3. Upload build artifacts

## Step 5: Verify Deployment

### Check GitHub Actions

1. Go to your repository
2. Click **Actions** tab
3. Look for the "Deploy to Azure Static Web App" workflow
4. Watch the build progress
5. Once complete, your app will be live!

### View Your App

- Your Static Web App URL will be shown in the Actions output
- Also available in Azure Portal under your Static Web App resource

## Azure Static Web App URL Format

Your app will be available at:
```
https://<random-name>.azurestaticapps.net
```

## Configuration Files

### `staticwebapp.config.json`

Configures routing and SPA behavior for Azure Static Web Apps:

```json
{
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/data/*", "*.{css,gif,ico,jpg,js,png,svg,webp}"]
  },
  "mimeTypes": {
    ".json": "application/json"
  }
}
```

This ensures React Router works correctly and SPA navigation falls back to `index.html`.

## Environment Variables

To add environment variables for your Azure deployment:

1. In Azure Portal, go to Static Web App → Settings → Configuration
2. Add app settings as needed
3. Redeploy from GitHub (push to main)

## Troubleshooting

### Build Fails in GitHub Actions

1. Check GitHub Actions logs: Repository → Actions → Latest workflow
2. Common issues:
   - Missing dependencies: Run `npm install` locally
   - Build errors: Check `npm run build` output
   - Path issues: Ensure `app_location` in workflow matches your frontend folder

### App Shows 404

- Check `staticwebapp.config.json` is in `frontend/` folder
- Verify `navigationFallback` is configured correctly
- Check Azure deployment logs

### Can't Access App

- Verify Static Web App is running (Azure Portal)
- Check firewall/network settings
- Try private/incognito browser

## Monitoring

### View Logs

```bash
# Using Azure CLI
az staticwebapp logs --name wichtel-app
```

### GitHub Actions Logs

- Repository → Actions → Select workflow run
- View logs for each step

## Custom Domain (Optional)

1. In Azure Portal, go to Static Web App → Custom domains
2. Click **+ Add**
3. Enter your domain name
4. Follow DNS configuration instructions
5. Once verified, your app is accessible at your custom domain

## Security Best Practices

1. ✅ Keep deployment token secret (never commit to repo)
2. ✅ Use branch protections for `main`
3. ✅ Review pull requests before merging
4. ✅ Monitor build logs for errors
5. ✅ Keep dependencies updated

## Cost Considerations

- **Free tier**: Perfect for development and testing
  - Up to 0.5 GB storage
  - Unlimited bandwidth
  - 100 build minutes/month
  - SSL certificate included

- **Standard tier**: For production apps
  - Unlimited storage
  - Unlimited bandwidth and builds
  - SLA guaranteed
  - Advanced analytics

## Next Steps

1. Set up custom domain if needed
2. Configure monitoring and alerts
3. Set up development environment for local testing
4. Document any custom deployment requirements
5. Train team on deployment process

For more information, see [Microsoft Azure Static Web Apps Documentation](https://learn.microsoft.com/en-us/azure/static-web-apps/)
