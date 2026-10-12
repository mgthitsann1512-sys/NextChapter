NEXT CHAPTER CAFE OFFLINE DAILY LOG PWA - STARTER BUILD

Included:
- Mobile-first Daily Log
- Daily sales and expense fields in MMK
- Net sales, expenses, net profit/loss and 11.76% investor share calculations
- Monthly summary
- Local browser database storage (IndexedDB)
- CSV export and JSON backup/restore
- PWA manifest and service worker for offline app shell caching

IMPORTANT LIMITS:
- This is a PWA source package, not yet published to a public HTTPS website.
- PWA installation and reliable offline service-worker caching require HTTPS hosting (or localhost during development).
- Automatic cloud backup/sync is NOT connected in this starter build. Choose and configure a cloud provider/backend with authentication and access rules before storing financial data online.
- Browser local data can be lost if site data is cleared or the app/browser is uninstalled. Export JSON backups regularly.
- Investor share is calculated as 11.76% of recorded net profit. Check the signed investment agreement for the exact profit definition and loss carry-forward rules.

Quick test:
1. Upload/deploy these files to an HTTPS static host (keep all files in the same folder).
2. Open the website on Android Chrome.
3. Use Chrome menu > Add to Home screen / Install app.
4. Open once while online so the service worker can cache the app shell.
5. Add a test record and export a JSON backup before entering real accounts.
