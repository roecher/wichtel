# Azure Static Web Apps Deployment Guide

## Overview

The Wichtel app is designed to run on Azure Static Web Apps (SWA), which provides:
- Free or low-cost hosting
- Automatic HTTPS
- Global CDN
- Automatic builds from GitHub
- Zero-cost tier available

## Prerequisites

- Azure account (free tier available)
- GitHub account with repo access
- Azure CLI installed (`az` command)

## Method 1: GitHub Actions Integration (Recommended)

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Wichtel app"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/wichtel.git
git push -u origin main
```

### Step 2: Create Azure Static Web App

```bash
# Login to Azure
az login

# Create resource group
az group create \
  --name wichtel-rg \
  --location eastus

# Create static web app
az staticwebapp create \
  --name wichtel-app \
  --resource-group wichtel-rg \
  --source https://github.com/YOUR-USERNAME/wichtel.git \
  --location eastus \
  --branch main
```

### Step 3: Configure Build Settings

Azure will create a GitHub Actions workflow. Verify `.github/workflows/` has a workflow that:

**Build configuration:**
```yaml
app_location: "frontend"
api_location: ""
output_location: "dist"
```

**Build command (if needed):**
```bash
cd frontend && npm install && npm run build
```

### Step 4: Deploy

Push changes to main:
```bash
git push origin main
```

GitHub Actions will automatically:
1. Build the app
2. Deploy to Azure SWA
3. Show deployment URL

## Method 2: Manual Deployment

### Step 1: Build Locally

```bash
cd frontend
npm install
npm run build
```

### Step 2: Install Azure SWA CLI

```bash
npm install -g @azure/static-web-apps-cli
```

### Step 3: Deploy

```bash
# Login to Azure
az login

# Deploy
swa deploy ./dist \
  --app-location . \
  --app-build-command "npm run build"
```

## Step 3: Update Assignments

After deployment, you need to add the assignments file:

### Option A: Include in Build

The `frontend/public/data/assignments.json` is included in the build by default.

Generate assignments locally:
```bash
cd generator
dotnet build
dotnet run ../wichtel.json ../frontend/public/data/assignments.json
```

Then push to GitHub and redeploy.

### Option B: Upload Separately

After generating assignments:

```bash
# Copy to dist folder before deployment
cp frontend/public/data/assignments.json frontend/dist/data/

# Then deploy
az staticwebapp deploy \
  --name wichtel-app \
  --branch main \
  --source-path frontend/dist
```

## Verify Deployment

1. **Check deployment status:**
   ```bash
   az staticwebapp show \
     --resource-group wichtel-rg \
     --name wichtel-app
   ```

2. **Get deployment URL:**
   ```bash
   az staticwebapp show \
     --resource-group wichtel-rg \
     --name wichtel-app \
     --query "defaultHostname"
   ```

3. **Test in browser:**
   ```
   https://YOUR-APP-NAME.azurestaticapps.net/
   ```

4. **Test Wichtel link:**
   ```
   https://YOUR-APP-NAME.azurestaticapps.net/wichtel/TOKEN
   ```

## SPA Routing Configuration

The `staticwebapp.config.json` ensures SPA routing works correctly:

```json
{
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/data/*", "*.{css,gif,ico,jpg,js,png,svg,webp}"]
  }
}
```

This means:
- All routes fall back to `index.html` (React Router handles them)
- Static files in `/data/` aren't rewritten
- CSS, images, JS aren't rewritten

## Sharing Personal Links

After deployment, share links like:

```
https://YOUR-APP-NAME.azurestaticapps.net/wichtel/550e8400-e29b-41d4-a716-446655440001
```

Replace the domain and token with yours.

## Costs

Azure Static Web Apps free tier includes:
- 100 GB bandwidth/month per subscription
- $0 compute cost
- Minimal storage cost (assignments.json is tiny)

**Estimated cost: $0-2/month** for small usage.

## Monitoring

Check deployment logs in Azure Portal:
1. Go to Azure Portal → Static Web Apps
2. Select your app
3. View "Deployments" tab

Or use Azure CLI:
```bash
az staticwebapp show \
  --resource-group wichtel-rg \
  --name wichtel-app
```

## Troubleshooting

### App shows blank page

1. Check browser console (F12) for errors
2. Verify `assignments.json` is deployed
3. Check path is `/data/assignments.json`

### Getting 404 on custom routes

The `staticwebapp.config.json` should handle this. Verify:
- File exists in `frontend/` directory
- It's included in the build

### Can't find token in assignments.json

1. Verify `assignments.json` was generated
2. Check token spelling exactly (including hyphens)
3. Regenerate assignments if needed

## Updating the App

1. Make changes locally
2. Build and test: `npm run build`
3. Push to GitHub: `git push origin main`
4. Azure automatically redeploys

## Updating Assignments

1. Modify `wichtel.json` with new participants
2. Run generator: `dotnet run ../wichtel.json ../frontend/public/data/assignments.json`
3. Commit: `git add frontend/public/data/assignments.json && git commit -m "Update assignments"`
4. Push: `git push origin main`
5. Azure redeploys automatically

## Custom Domain (Optional)

To use a custom domain like `wichtel.example.com`:

1. Go to Azure Portal → Static Web App
2. Under "Custom domains", add your domain
3. Follow DNS configuration steps
4. HTTPS is automatic

## Environment Variables

For sensitive config (not needed for this app):

1. Create `.env` file
2. Reference in build
3. Build replaces with values

Since this app doesn't need secrets, skip this step.

## Security

The deployment:
- ✅ Uses HTTPS automatically
- ✅ Tokens are unguessable (GUIDs)
- ✅ No authentication needed (family scenario)
- ✅ No personal data in browser
- ✅ Static files only (no server vulnerabilities)

## Backup & Recovery

The app is stateless, so:
- Code is in GitHub (backup)
- Assignments are in GitHub (backup)
- No database to back up
- Redeploy anytime from GitHub

## Questions?

See the main README.md or DEVELOPMENT.md for more help.

🎄 Happy Wichteling! 🎁
