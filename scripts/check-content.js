const https = require('https');

https.get('https://library.atrbd.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Check if "কোনো বই পাওয়া যায়নি" or empty states exist
    console.log('Includes কোনো বই:', data.includes('কোনো বই'));
    console.log('Includes নতুন প্রকাশিত:', data.includes('নতুন প্রকাশিত'));
    console.log('Includes বেস্টসেলার:', data.includes('বেস্টসেলার'));
    console.log('Includes সদকায়ে জারিয়া:', data.includes('সদকায়ে জারিয়া'));
    
    // Find all headings (h1, h2, h3)
    const headings = data.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi) || [];
    console.log('\nHeadings found (' + headings.length + '):');
    headings.forEach(h => console.log(' -', h.replace(/<[^>]+>/g, '').trim()));

    // Search for book card titles or product names
    const regex = /class="[^"]*font-semibold[^"]*"[^>]*>(.*?)<\//g;
    let m;
    const items = [];
    while ((m = regex.exec(data)) !== null) {
      items.push(m[1].trim());
    }
    console.log('\nItems found in cards:', items.slice(0, 15));
  });
});
