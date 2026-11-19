// server.js — Production entry point for cPanel Node.js App (Phusion Passenger / CloudLinux)
const { createServer } = require('http');
const { parse } = require('url');
const path = require('path');
const fs = require('fs');
const next = require('next');

// Detect Phusion Passenger environment on cPanel
const isPassenger = typeof PhusionPassenger !== 'undefined' || process.env.PASSENGER_APP_ENV || process.env.PORT === 'passenger';

const dev = false;
const hostname = isPassenger ? undefined : (process.env.HOSTNAME || '0.0.0.0');
const port = isPassenger ? 'passenger' : (parseInt(process.env.PORT, 10) || 3000);

if (typeof PhusionPassenger !== 'undefined') {
  PhusionPassenger.configure({ autoInstall: false });
}

// Initialize Next.js explicitly with __dirname so it always finds .next
const app = next({ dev, hostname, port: typeof port === 'number' ? port : 3000, dir: __dirname });
const handle = app.getRequestHandler();

const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8',
};

function serveStaticFile(filePath, res, isImmutable = false) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const stat = fs.statSync(filePath);

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stat.size,
      'Cache-Control': isImmutable
        ? 'public, max-age=31536000, immutable'
        : 'public, max-age=86400, stale-while-revalidate=604800',
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
    return true;
  } catch (e) {
    return false;
  }
}

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;

      // 1. Direct fail-safe serving for Next.js static assets (CSS, JS chunks, media)
      if (pathname && pathname.startsWith('/_next/static/')) {
        const relativeStaticPath = pathname.slice('/_next/static/'.length);
        const diskPath = path.join(__dirname, '.next', 'static', relativeStaticPath);
        if (fs.existsSync(diskPath) && fs.statSync(diskPath).isFile()) {
          serveStaticFile(diskPath, res, true);
          return;
        }
      }

      // 2. Direct fail-safe serving for public assets (images, icons, manifests)
      if (pathname && pathname !== '/' && !pathname.startsWith('/api/') && !pathname.startsWith('/_next/')) {
        const diskPath = path.join(__dirname, 'public', pathname);
        if (fs.existsSync(diskPath) && fs.statSync(diskPath).isFile()) {
          serveStaticFile(diskPath, res, false);
          return;
        }
      }

      // 3. Delegate all dynamic routes, API endpoints, and SSR to Next.js handler
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling request:', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  });

  server.on('error', (err) => {
    console.error('Server listen error:', err);
    // Anti-loop safeguard: sleep 10 seconds before exit to prevent Passenger rapid respawn loops
    setTimeout(() => {
      process.exit(1);
    }, 10000);
  });

  if (isPassenger) {
    server.listen('passenger', () => {
      console.log('> Shubban Library server ready on Phusion Passenger socket');
    });
  } else {
    server.listen(port, hostname, () => {
      console.log(`> Shubban Library server ready on http://${hostname}:${port}`);
    });
  }
}).catch((err) => {
  console.error('Fatal error preparing Next.js application:', err);
  // Anti-loop safeguard: sleep 10 seconds before exit
  setTimeout(() => {
    process.exit(1);
  }, 10000);
});
