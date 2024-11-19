module.exports = {
    siteUrl: 'https://immocean.ma', // Replace with your site URL
    generateRobotsTxt: true,           // Automatically generate robots.txt
    changefreq: 'daily',               // Change frequency (optional)
    priority: 0.7,                     // Default priority for pages (optional)
    sitemapSize: 5000,                 // Split sitemaps if too large (optional)
    robotsTxtOptions: {
      policies: [
        { userAgent: '*', allow: '/' },
        { userAgent: 'BadBot', disallow: '/' },
      ],
    },
  };
  