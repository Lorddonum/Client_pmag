# Deployment Package Ready!

## ✅ What's Built:
- **Client:** `dist/public/` (frontend files)
- **Server:** Will run from source files (no bundling needed)

## 📦 Files to Upload via FileZilla:

Upload these to `/public_html/`:

```
📁 dist/public/          ← Built frontend
📁 server/               ← Server source code
📁 shared/               ← Shared schema
📁 client/               ← Client source (for rebuilds)
📄 package.json
📄 package-lock.json
📄 drizzle.config.ts
📄 vite.config.ts
📄 tsconfig.json
📄 .env                  ← UPDATE FIRST!
```

## 🔧 Update .env Before Upload:

```env
DATABASE_URL=mysql://u872379294_admin_t:YOUR_PASSWORD@localhost:3306/u872379294_paralight_d
NODE_ENV=production
PORT=5000
```

## 📤 FileZilla Connection:

- **Host:** `ftp://slateblue-mouse-972975.hostingersite.com`
- **Username:** `u872379294`
- **Password:** [Your FTP password]
- **Port:** `21`

## ⚡ After Upload:

### 1. Install dependencies via SSH:
```bash
cd /home/u872379294/domains/slateblue-mouse-972975.hostingersite.com/public_html
npm install --production
```

### 2. Push database schema:
```bash
npm run db:push
```

### 3. Configure Node.js Application:
- **Application root:** `/home/u872379294/domains/slateblue-mouse-972975.hostingersite.com/public_html`
- **Startup file:** `server/index.ts`
- **Node version:** 20.x or 22.x
- **Environment variables:**
  ```
  DATABASE_URL=mysql://u872379294_admin_t:PASSWORD@localhost:3306/u872379294_paralight_d
  NODE_ENV=production
  PORT=5000
  ```

### 4. Start application!

---

## ⏱️ Estimated Upload Time:
- **With node_modules:** 20-30 minutes
- **Without node_modules:** 5-10 minutes (then npm install on server)

**Recommendation:** Upload without `node_modules`, then run `npm install` on server.
