# 🚀 Beginner-Friendly Deployment Options

Two quick ways to publish the production-ready **anderson-cleaning** Next.js site if you just need a link to share. Both start from the `anderson-cleaning/` folder in this repo.

---

## ✅ Option 1: Deploy with Vercel (Recommended)

1. **Install the CLI (one time):**
   ```bash
   npm install -g vercel
   ```
2. **Authenticate:**
   ```bash
   vercel login
   ```
   Follow the emailed magic link to finish signing in.
3. **Deploy the site:**
   ```bash
   cd anderson-cleaning
   vercel --prod
   ```
4. **Share your link:** Vercel prints a URL like `https://your-site.vercel.app`. Visit it to verify the build, then share it with stakeholders.

**Need to redeploy after making changes?** Run `npm install`, `npm run build`, and `vercel --prod` again from inside `anderson-cleaning/`.

---

## ✅ Option 2: Upload a Static Export to Netlify

If someone explicitly needs a drag-and-drop handoff:

1. **Build the static export:**
   ```bash
   cd anderson-cleaning
   npm install
   npm run build
   npm run export
   ```
   The generated files live in `out/`.
2. **Visit [app.netlify.com/drop](https://app.netlify.com/drop)** and drag the entire `out/` folder onto the upload target.
3. **Wait 10–20 seconds:** Netlify returns a URL like `https://something-random.netlify.app`.
4. **Share the link:** Double-check critical pages/forms before sending.

---

## 🆘 Common Issues

- **"Command not found" for `npm` or `vercel`?** Install the [latest Node.js LTS](https://nodejs.org/) and re-run the commands.
- **Permission errors on macOS?** Prefix global installs with `sudo npm install -g vercel` (enter your computer password when prompted).
- **Broken build after copying the repo?** Remove `node_modules`, run `npm install`, and then `npm run build` again inside `anderson-cleaning/`.

Redeploy whenever you update content, and ping the engineering team if anything in the deployment dashboard looks unfamiliar.
