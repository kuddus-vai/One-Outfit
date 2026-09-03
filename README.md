# One Outfit — Menswear E-Commerce Store

Premium fashion e-commerce storefront for **One Outfit**, featuring high-contrast monochrome branding, denim lookbooks, size charts, instant quick-view modals, cart, checkout, customer reviews, and bilingual English / Bengali support.

---

## 🚀 GitHub Pages Deployment Guide

This project is configured to deploy directly to **GitHub Pages**.

### Option 1: Automatic Deployment with GitHub Actions (Recommended)

1. Push this repository to GitHub on the `main` (or `master`) branch.
2. In your GitHub repository:
   - Go to **Settings** → **Pages** (in the left sidebar).
   - Under **Build and deployment** → **Source**, select **GitHub Actions**.
3. Every time you push changes to `main`, GitHub will automatically build and publish the site.

---

### Option 2: Manual 1-Command CLI Deployment (`gh-pages`)

If you prefer deploying directly from your local terminal:

```bash
# 1. Install dependencies
npm install

# 2. Build and deploy to the gh-pages branch
npm run deploy
```

Then in **Settings** → **Pages**:
- Under **Source**, choose **Deploy from a branch**.
- Select the `gh-pages` branch and `/ (root)` folder, then click **Save**.

---

## 🛠️ Local Development

```bash
# Start local dev server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## ✨ Features Included

- **Monochrome Streetwear Aesthetics**: Clean black & white design with Dhaka retail branding.
- **Client-Side Hash Routing**: Full page reload support on static hosts like GitHub Pages (`#/shop`, `#/products/:slug`, `#/cart`, `#/checkout`).
- **404 Deep Link Fallback**: Automatically redirects standard URLs to the application routes.
- **Static Asset Relative Paths**: `vite.config.ts` configured with `base: './'` for seamless hosting under subdirectories (e.g. `https://<username>.github.io/<repo-name>/`).
- **Bilingual English & Bengali**: Switch effortlessly between English and Bangla UI.
- **Cart & Order System**: Complete cart, checkout with Cash on Delivery (COD), order tracking, and social commerce concierge.
