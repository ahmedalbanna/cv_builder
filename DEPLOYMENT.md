# 🚀 CV Builder - Deployment Guide

## Quick Deploy to Popular Platforms

### **1. Vercel (Recommended)**

Easiest and fastest deployment:

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

Or use the Vercel dashboard:
1. Go to [vercel.com](https://vercel.com)
2. Import your Git repository
3. Vercel auto-detects Vite and deploys!

**Build Settings:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

---

### **2. Netlify**

Simple drag-and-drop or Git deployment:

**Option A: Drag & Drop**
```bash
npm run build
# Then drag the 'dist' folder to netlify.com/drop
```

**Option B: Netlify CLI**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

**Build Settings:**
- Build Command: `npm run build`
- Publish Directory: `dist`

---

### **3. GitHub Pages**

Free hosting with custom domain support:

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

Then enable GitHub Pages in repository settings.

---

### **4. Firebase Hosting**

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting
# Choose 'dist' as public directory
# Configure as single-page app: Yes

# Deploy
npm run build
firebase deploy
```

---

### **5. Cloudflare Pages**

1. Push your code to GitHub/GitLab
2. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
3. Connect your repository
4. Set build command: `npm run build`
5. Set output directory: `dist`
6. Deploy!

---

## Environment Configuration

### Required for PWA:
- ✅ **HTTPS** - PWAs require secure connection
- ✅ **Custom Domain** (optional but recommended)

All platforms above provide HTTPS automatically.

---

## Post-Deployment Checklist

After deploying, verify:

- [x] Website loads correctly
- [x] All icons display properly
- [x] PWA install prompt appears
- [x] Service worker registers (check DevTools)
- [x] Offline mode works
- [x] PDF export works
- [x] Data saves to localStorage

---

## Custom Domain Setup

### Vercel:
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### Netlify:
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS

---

## Performance Optimization

Already included in the build:
- ✅ Code splitting
- ✅ Tree shaking
- ✅ Asset optimization
- ✅ Service worker caching
- ✅ Lazy loading

---

## Monitoring & Analytics

Add analytics by updating `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## Continuous Deployment

All platforms support automatic deployment on Git push:

1. Connect your GitHub/GitLab repository
2. Every push to `main` branch triggers automatic build
3. Preview deployments for pull requests

---

## Budget Estimates

| Platform | Free Tier | Bandwidth | Build Minutes |
|----------|-----------|-----------|---------------|
| Vercel | ✅ | 100GB/month | 6000 min/month |
| Netlify | ✅ | 100GB/month | 300 min/month |
| GitHub Pages | ✅ | 100GB/month | Unlimited |
| Firebase | ✅ | 10GB/month | N/A |
| Cloudflare | ✅ | Unlimited | 500/month |

**All are FREE for this project!** 🎉

---

## Need Help?

- Check [PWA_INSTALLATION_GUIDE.md](./PWA_INSTALLATION_GUIDE.md) for PWA details
- Check [README.md](./README.md) for project overview
- Check [QUICKSTART.md](./QUICKSTART.md) for development guide
