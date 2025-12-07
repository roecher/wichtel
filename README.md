# Wichtel 2025 - Secret Santa Web App

A modern, Christmas-themed Secret Santa (Wichtel) web app built with React, Vite, and TypeScript. Designed to be hosted on Azure Static Web Apps.

## Features

- 🎄 Beautiful, responsive design with glassmorphism styling
- 🔐 Secure token-based access to assignments
- 📱 Fully responsive (works on mobile and desktop)
- ⚡ Fast and lightweight (React + Vite)
- 🚀 Easy deployment to Azure Static Web Apps
- 🔀 Proper Secret Santa derangement algorithm (no one draws themselves)

## Project Structure

```
wichtel/
├── frontend/                      # React + Vite frontend app
│   ├── src/
│   │   ├── pages/               # Page components
│   │   │   ├── Home.tsx         # Landing page
│   │   │   └── WichtelReveal.tsx # Secret reveal page
│   │   ├── components/
│   │   │   └── WichtelCard.tsx   # Reusable card component
│   │   ├── types/
│   │   │   └── index.ts         # TypeScript type definitions
│   │   ├── App.tsx              # Main app with routing
│   │   ├── main.tsx             # React entry point
│   │   └── index.css            # Global styles
│   ├── public/
│   │   └── data/
│   │       └── assignments.json # Generated assignments (static)
│   ├── index.html               # HTML template
│   ├── vite.config.ts           # Vite configuration
│   ├── tsconfig.json            # TypeScript config
│   ├── tailwind.config.js       # Tailwind CSS config
│   ├── postcss.config.js        # PostCSS config
│   ├── staticwebapp.config.json # Azure SWA config
│   └── package.json             # Dependencies
├── generator/                     # .NET 8 assignment generator
│   ├── Program.cs               # Main generator logic
│   └── WichtelGenerator.csproj   # .NET project file
├── wichtel.json                  # Participants configuration
└── README.md                      # This file
```

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- .NET 8 SDK (for the assignment generator)
- Git

### 1. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 2. Run Frontend Locally

```bash
cd frontend
npm run dev
```

The app will be available at `http://localhost:5173`.

### 3. Generate Assignments (Optional)

If you want to generate new assignments from participants:

```bash
cd generator

# Build the .NET app
dotnet build

# Run the generator with participants file
dotnet run ../wichtel.json ../frontend/public/data/assignments.json
```

This creates a new `assignments.json` with random assignments and unguessable tokens.

### 4. Test a Link

Once assignments are generated, test a Wichtel link:

```
http://localhost:5173/wichtel/550e8400-e29b-41d4-a716-446655440001
```

Replace the token with one from the generated `assignments.json`.

## Usage

### For Users

1. Receive a personal link like: `https://wichtel.example.com/wichtel/YOUR-TOKEN-HERE`
2. Open the link in your browser
3. Click "Reveal" to see who you're buying a gift for
4. That's it! 🎁

### For Organizers

#### Step 1: Configure Participants

Edit `wichtel.json` with your participants:

```json
[
  {
    "name": "John Doe",
    "contact": "john@example.com",
    "contactType": "email",
    "id": "john"
  },
  {
    "name": "Jane Smith",
    "contact": null,
    "contactType": "whatsapp",
    "id": "jane"
  }
]
```

**Fields:**
- `name`: Display name of the participant
- `contact`: Email or WhatsApp number (optional, not included in assignments)
- `contactType`: Either "email" or "whatsapp"
- `id`: Unique identifier

#### Step 2: Generate Assignments

```bash
cd generator
dotnet build
dotnet run ../wichtel.json ../frontend/public/data/assignments.json
```

This generates `assignments.json` with:
- Random, unguessable tokens (GUIDs)
- Secret Santa derangement (everyone draws someone different from themselves)
- Receiver names (no personal contact info)

#### Step 3: Share Personal Links

For each participant, share their personal link. The tokens are listed in `assignments.json`:

```
https://wichtel.example.com/wichtel/550e8400-e29b-41d4-a716-446655440001
```

(Replace the domain and token with yours)

## Build for Production

```bash
cd frontend
npm run build
```

The production-ready app will be in `frontend/dist/`.

## Deploy to Azure Static Web Apps

### Prerequisites

- Azure account
- Azure CLI (`az` command)
- GitHub account with this repo

### Deployment Steps

1. **Create Azure Static Web App**

   ```bash
   az staticwebapp create \
     --name wichtel-app \
     --resource-group your-resource-group \
     --source https://github.com/YOUR-USERNAME/wichtel \
     --location eastus \
     --branch main
   ```

2. **Configure Build**

   The included `staticwebapp.config.json` handles SPA routing automatically.

3. **Add Deployment Workflow**

   Azure will create a GitHub Actions workflow for you. Ensure it:
   - Installs dependencies: `npm install`
   - Builds the app: `npm run build`
   - Sets app location to `frontend`
   - Sets output location to `frontend/dist`

4. **Upload Assignments**

   After building, place `frontend/public/data/assignments.json` in the deployed output.

### Manual Deployment

If you prefer manual deployment:

```bash
# Build the app
cd frontend
npm run build

# Install Azure Static Web Apps CLI
npm install -g @azure/static-web-apps-cli

# Deploy
swa deploy --app-location dist --output-location dist
```

## Security & Privacy

✅ **What's Secure:**
- Tokens are random UUIDs (unguessable)
- No authentication needed (family-friendly scenario)
- Assignments file contains only tokens, giver IDs, and receiver names
- No personal contact info in the browser or assignments file
- Tokens are URL-based (short-lived, family-shared)

⚠️ **Limitations:**
- Tokens are long but can theoretically be brute-forced if someone dedicates time
- Assignments file is public (but tokens are hard to guess)
- No session management (suitable for one-time access)
- For a family/friend group scenario, this is appropriate

## Customization

### Colors & Design

Edit `frontend/src/components/WichtelCard.tsx` to customize:
- Gradient colors (from red/green to your preference)
- Emojis (change 🎄🎁❄️🎅)
- Card size and animations

### Text & Messages

- Edit `frontend/src/pages/Home.tsx` for the landing page
- Edit `frontend/src/pages/WichtelReveal.tsx` for the reveal page

### Tailwind Styling

The app uses Tailwind CSS. Modify `frontend/tailwind.config.js` for theme changes.

## Troubleshooting

### "This link is not valid"

- Check that the token in the URL matches one in `assignments.json`
- Verify `assignments.json` is in `frontend/public/data/`
- Check browser console for any network errors

### Build fails with TypeScript errors

```bash
cd frontend
npm install
npm run build
```

### Port 5173 already in use

```bash
npm run dev -- --port 3000
```

## Technical Details

### Derangement Algorithm

The assignment generator uses a Fisher-Yates shuffle with validation to ensure no participant draws themselves. This is a proper Secret Santa / Wichtel algorithm.

### Frontend Architecture

- **Routing:** React Router for client-side routing
- **Styling:** Tailwind CSS with custom gradients
- **State:** React hooks (useState, useEffect)
- **Build:** Vite (fast, modern bundler)
- **Deployment:** Azure Static Web Apps (serverless)

### Backend / Data

- **Assignments:** Static JSON file (no server needed)
- **Hosting:** Azure Static Web Apps
- **Storage:** Static file serving

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the PRD for requirements
3. Check browser console for errors
4. Verify files are in correct locations

## Example Links

After generating assignments, share personal links like:

```
https://wichtel.example.com/wichtel/550e8400-e29b-41d4-a716-446655440001
https://wichtel.example.com/wichtel/550e8400-e29b-41d4-a716-446655440002
https://wichtel.example.com/wichtel/550e8400-e29b-41d4-a716-446655440003
```

Each person gets a unique token that reveals their assigned recipient.

## Happy Wichteling! 🎄🎁❄️
