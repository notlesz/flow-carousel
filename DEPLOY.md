# 🚀 Deploy Instructions

## 📦 NPM Package Publication

```bash
# Build the library
npm run build

# Test the package locally
npm pack --dry-run

# Publish to NPM
npm publish
```

## 🌐 Vercel Demo Deployment

### Automatic Deployment (Recommended)

1. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository: `notlesz/flow-carousel`
   - Vercel will automatically detect the `vercel.json` configuration

2. **Vercel Configuration** (already set up):
   ```json
   {
     "buildCommand": "npm run build:demo",
     "outputDirectory": "demo-dist",
     "framework": "vite",
     "installCommand": "npm install"
   }
   ```

3. **Deploy**: Push to main branch and Vercel deploys automatically!

### Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

## 📋 Scripts Available

| Script | Purpose | Output |
|--------|---------|---------|
| `npm run build` | Build NPM package | `dist/` |
| `npm run build:demo` | Build demo for Vercel | `demo-dist/` |
| `npm run dev` | Development server | `localhost:5173` |
| `npm run preview:demo` | Preview demo build | `localhost:4173` |

## 🔗 URLs

- **Demo**: https://flow-carousel.vercel.app
- **NPM**: https://www.npmjs.com/package/flow-carousel
- **GitHub**: https://github.com/notlesz/flow-carousel

## 🛠️ Build Outputs

### NPM Package (dist/)
- `flow-carousel.es.js` (18.4 KB)
- `flow-carousel.umd.js` (12.7 KB) 
- `flow-carousel.css` (6.98 KB)
- TypeScript declarations

### Demo (demo-dist/)
- `index.html` with full landing page
- Bundled React application (~168 KB)
- All assets and styles included
