const https = require('https');

https.get('https://library.atrbd.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const idx = data.indexOf('নতুন প্রকাশিত বই');
    if (idx !== -1) {
      console.log('--- SECTION SNIPPET ---');
      console.log(data.substring(idx - 100, idx + 1500));
    } else {
      console.log('Section not found');
    }
  });
});
