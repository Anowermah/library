const https = require('https');

function checkAsset(path) {
  const url = 'https://library.atrbd.com' + path;
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ path, status: res.statusCode, contentType: res.headers['content-type'], size: res.headers['content-length'] });
    }).on('error', err => resolve({ path, error: err.message }));
  });
}

async function run() {
  const paths = [
    '/favicon.png',
    '/favicon.ico',
    '/images/hero-1.jpg',
    '/icons/main/icon-192x192.png',
    '/icons/book-placeholder.svg',
    '/uploads/avatars/avatar_cmw21ieb00000oaav1o6ljc68_1793792121583.png',
    '/uploads/media/image/2026/11/weeklyarafat680102_1793877067914_59e028bc.png',
  ];

  for (const p of paths) {
    const res = await checkAsset(p);
    console.log(p, '-> Status:', res.status, 'Type:', res.contentType, 'Size:', res.size);
  }
}

run();
