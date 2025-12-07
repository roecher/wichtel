# Quick Start Guide

## ⚡ Get Running in 5 Minutes

### 1. Install Dependencies (1 min)
```bash
cd frontend
npm install
```

### 2. Start Dev Server (1 min)
```bash
npm run dev
```
→ Opens at `http://localhost:5173`

### 3. Generate Assignments (2 min)
```bash
cd ../generator
dotnet build
dotnet run ../wichtel.json ../frontend/public/data/assignments.json
```

### 4. Test a Link (1 min)
Open your browser with a token from the output:
```
http://localhost:5173/wichtel/550e8400-e29b-41d4-a716-446655440001
```

Click "Reveal" to see it works! 🎁

---

## 📋 What You Get

✅ **Frontend** - Modern React + Vite app with routing
✅ **Generator** - .NET tool that creates secret assignments
✅ **Responsive Design** - Works on mobile & desktop  
✅ **Glassmorphism UI** - Beautiful Christmas theme
✅ **Azure Ready** - Deploys to Static Web Apps in 1 click

---

## 🚀 Deploy to Azure

See `AZURE_DEPLOYMENT.md` for step-by-step deployment guide.

---

## 📖 Learn More

- **README.md** - Full documentation
- **DEVELOPMENT.md** - Development guide
- **AZURE_DEPLOYMENT.md** - Azure deployment guide
- **prd.md** - Original requirements

---

## 🎄 Next Steps

1. **Customize participants:**
   - Edit `wichtel.json` with your group
   - Run generator again

2. **Personalize the design:**
   - Edit colors in `frontend/src/components/WichtelCard.tsx`
   - Change text in page components

3. **Deploy:**
   - Push to GitHub
   - Link to Azure Static Web Apps
   - Share personal Wichtel links

---

## 💡 Key Commands

```bash
# Frontend
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Test production build

# Generator
cd generator
dotnet build                  # Compile
dotnet run ../wichtel.json .. # Generate assignments

# Quick setup
cd ..
./setup.sh dev                # Start dev (requires chmod +x)
./setup.sh generate           # Generate assignments
./setup.sh build              # Build for production
```

---

**Questions?** Check the README or DEVELOPMENT guide.

**Ready?** Let's make some Wichtel magic! ✨🎄
