const https = require('https');

function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ url, status: res.statusCode, length: data.length, body: data.substring(0, 500) });
      });
    }).on('error', err => resolve({ url, error: err.message }));
  });
}

async function run() {
  const urls = [
    'https://library.atrbd.com/api/products',
    'https://library.atrbd.com/api/categories',
    'https://library.atrbd.com/api/donations',
    'https://library.atrbd.com/api/publishers',
  ];

  for (const u of urls) {
    const res = await checkUrl(u);
    console.log('\n--- ' + u + ' ---');
    console.log('Status:', res.status);
    console.log('Response:', res.body);
  }
}

run();
