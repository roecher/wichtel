# Development Guide

## Local Development Setup

### 1. Install Global Tools

```bash
# Node.js & npm (check: node -v, npm -v)
# .NET 8 SDK (check: dotnet --version)
```

### 2. Frontend Development

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:5173 in your browser
```

### 3. Generate Test Assignments

```bash
cd generator

# Build the generator
dotnet build

# Generate assignments from wichtel.json
dotnet run ../wichtel.json ../frontend/public/data/assignments.json

# Output will show the generated assignments
```

### 4. Test a Wichtel Link

The generator will output tokens. Use one to test:

```
http://localhost:5173/wichtel/PASTE-TOKEN-HERE
```

## Project Files Overview

### Frontend Files

- `frontend/src/App.tsx` - Main routing component
- `frontend/src/pages/Home.tsx` - Landing page ("Wichteln 2025")
- `frontend/src/pages/WichtelReveal.tsx` - Reveal page with token lookup
- `frontend/src/components/WichtelCard.tsx` - Reusable card component
- `frontend/src/types/index.ts` - TypeScript interfaces
- `frontend/public/data/assignments.json` - Static assignments file
- `frontend/vite.config.ts` - Build configuration
- `frontend/tailwind.config.js` - CSS theme

### Generator Files

- `generator/Program.cs` - Main C# program with derangement algorithm
- `generator/WichtelGenerator.csproj` - .NET project configuration

### Configuration

- `wichtel.json` - Participant list
- `staticwebapp.config.json` - Azure SPA routing configuration

## Common Tasks

### Modify Participants

1. Edit `wichtel.json` with new participants
2. Run the generator to create new assignments
3. Assignments are auto-reloaded in the app

### Change Colors/Design

1. Edit `frontend/src/components/WichtelCard.tsx`
2. Colors are in Tailwind classes (e.g., `from-red-400`)
3. Changes auto-reload in dev mode

### Add New Routes

1. Create a new file in `frontend/src/pages/`
2. Add route in `frontend/src/App.tsx` using React Router
3. No server changes needed

### Build for Production

```bash
cd frontend
npm run build

# Output in frontend/dist/
```

## Debugging

### Check Browser Console

Open DevTools (F12) to see:
- Network requests to `assignments.json`
- Any loading/token errors
- Console logs (avoided in production)

### Check Assignments File

Verify `frontend/public/data/assignments.json` exists and contains assignments:

```bash
cat frontend/public/data/assignments.json
```

### Test Token Lookup

Manually test if a token works:

```javascript
// In browser console:
fetch('/data/assignments.json')
  .then(r => r.json())
  .then(d => d.assignments.find(a => a.token === 'YOUR-TOKEN'))
```

## Performance Tips

- Assignments JSON stays small (only 1 per person + headers)
- Bundle size ~50KB gzipped (React + Vite)
- No database or backend calls
- Static file hosting (Azure SWA)

## Architecture Decision

Why this approach:

- ✅ No server state needed
- ✅ Simple to deploy & scale
- ✅ Secure (tokens are unguessable GUIDs)
- ✅ Fast (static files only)
- ✅ Works offline once loaded
- ✅ Easy to test (all local)

## Next Steps

1. Configure participants in `wichtel.json`
2. Run generator to create assignments
3. Share personal links with participants
4. Deploy to Azure Static Web Apps
