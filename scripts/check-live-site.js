const https = require('https');

https.get('https://library.atrbd.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('HTML Length:', data.length);
    
    // Check all img tags
    const imgTags = data.match(/<img[^>]+>/gi) || [];
    console.log('Total <img> tags:', imgTags.length);
    imgTags.forEach((t, i) => console.log(`Img ${i}:`, t));
    
    // Check for _next/image
    const nextImages = data.match(/\/_next\/image\?[^"'\s<>]+/gi) || [];
    console.log('Total /_next/image URLs:', nextImages.length);
    nextImages.forEach((u, i) => console.log(`NextImg ${i}:`, decodeURIComponent(u)));

    // Check for any image extensions (.png, .jpg, .webp, .svg)
    const imgExts = data.match(/https?:\/\/[^"'\s<>]+\.(png|jpg|jpeg|webp|avif|svg)/gi) || [];
    console.log('External Image URLs:', imgExts.length);
    imgExts.slice(0, 10).forEach(u => console.log('ExtImg:', u));

    // Check for books/products
    const hasBooks = data.includes('বই') || data.includes('book');
    console.log('Mentions books:', hasBooks);
  });
}).on('error', err => console.error('Fetch error:', err.message));
