import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const site = 'https://www.panhiro.top';

const products = [
  {
    slug: 'vk-y1-ev-powered-pressure-washer',
    name: 'VK-Y1 EV Powered Pressure Washer',
    model: 'VK-Y1',
    image: '/assets/vk-y1-01.jpg',
    headline: 'EV powered pressure washer for mobile cleaning teams',
    description:
      'Panhiro VK-Y1 is an EV powered permanent-magnet inverter pressure washer for mobile car washing, outdoor cleaning, property maintenance, and high-frequency commercial use.',
    specs: [
      ['Power', '2000W'],
      ['Pressure', '110 bar'],
      ['Flow rate', '8 L/min'],
      ['Motor', 'Permanent-magnet brushless inverter motor'],
      ['Use case', 'EV power output, mobile washing, commercial cleaning'],
    ],
    keywords: ['EV powered pressure washer', 'permanent magnet pressure washer', 'mobile car wash machine'],
  },
  {
    slug: 'vk-1011-commercial-pressure-washer',
    name: 'VK-1011 Commercial Pressure Washer',
    model: 'VK-1011',
    image: '/assets/vk-1011-source-01.jpg',
    headline: 'Commercial pressure washer for dealers and cleaning shops',
    description:
      'Panhiro VK-1011 is a commercial pressure washer designed for shop display, channel sales, vehicle cleaning, and buyers who need a professional washer platform.',
    specs: [
      ['Series', 'VK commercial series'],
      ['Positioning', 'Commercial and enthusiast pressure washer'],
      ['Application', 'Car wash shops, property cleaning, channel display'],
      ['Media support', 'Product images and video material available'],
      ['Customization', 'Packaging, plug, voltage, and configuration options'],
    ],
    keywords: ['commercial pressure washer', 'pressure washer manufacturer China', 'car wash equipment supplier'],
  },
  {
    slug: 'vk-1010-p4-high-pressure-cleaning-machine',
    name: 'VK-1010-P4 High Pressure Cleaning Machine',
    model: 'VK-1010-P4',
    image: '/assets/vk-1011-source-02.jpg',
    headline: 'High pressure cleaning machine for professional use',
    description:
      'Panhiro VK-1010-P4 is a VK series high pressure cleaning machine for frequent cleaning, dealer product lines, and commercial procurement programs.',
    specs: [
      ['Series', 'VK commercial series'],
      ['Target users', 'Commercial buyers, dealers, and advanced users'],
      ['Application', 'Vehicle washing, courtyard cleaning, shop use'],
      ['Support', 'OEM and bulk procurement communication'],
      ['Product line', 'Can be paired with VK-1011 and VK-Y1'],
    ],
    keywords: ['high pressure cleaning machine', 'commercial high pressure washer', 'pressure washer OEM'],
  },
  {
    slug: 'ph-0995-semi-commercial-pressure-washer',
    name: 'PH-0995 Semi Commercial Pressure Washer',
    model: 'PH-0995',
    image: '/assets/ph-0995-card.png',
    headline: 'Semi-commercial pressure washer for stronger home and shop use',
    description:
      'PH-0995 is the upgraded PH series pressure washer with higher output for advanced home cleaning, light commercial use, and small shop cleaning tasks.',
    specs: [
      ['Power', '2200W'],
      ['Pressure', '95 bar'],
      ['Flow rate', '8.5-9 L/min'],
      ['Pump head', '1408 pump head'],
      ['Use case', 'Advanced home and semi-commercial cleaning'],
    ],
    keywords: ['semi commercial pressure washer', 'home pressure washer supplier', 'PH-0995 pressure washer'],
  },
  {
    slug: 'ph-0885-home-pressure-washer',
    name: 'PH-0885 Home Pressure Washer',
    model: 'PH-0885',
    image: '/assets/ph-0995-02.png',
    headline: 'Advanced home pressure washer for regular cleaning',
    description:
      'PH-0885 is a Panhiro PH series home pressure washer for regular vehicle cleaning, courtyard washing, and light-duty store or property use.',
    specs: [
      ['Power', '1800W'],
      ['Pressure', '85 bar'],
      ['Flow rate', '8-8.5 L/min'],
      ['Pump head', '1407 pump head'],
      ['Use case', 'Advanced home and light semi-commercial cleaning'],
    ],
    keywords: ['home pressure washer', 'car washer manufacturer', 'PH-0885 pressure washer'],
  },
  {
    slug: 'p4-p5-handheld-pressure-washer',
    name: 'P4 P5 Handheld Pressure Washer',
    model: 'P4 / P5',
    image: '/assets/p5-01-transparent.png',
    headline: 'Handheld pressure washer for entry-level home cleaning',
    description:
      'Panhiro P4 and P5 are compact handheld pressure washers for home car washing, small yard cleaning, outdoor gear cleaning, and first-time buyers.',
    specs: [
      ['Series', 'P4 / P5'],
      ['Positioning', 'Entry-level handheld pressure washer'],
      ['Use case', 'Home car washing and light outdoor cleaning'],
      ['Advantage', 'Compact, easy to store, simple to operate'],
      ['Buyer type', 'First-time and household users'],
    ],
    keywords: ['handheld pressure washer', 'compact car washer', 'home car wash machine'],
  },
];

const org = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Panhiro Cleaning Equipment',
  alternateName: 'Taizhou Panhong Electromechanical Co., Ltd.',
  url: site,
  logo: `${site}/assets/panhiro-logo-hd.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+86-13197228342',
    contactType: 'sales',
    areaServed: 'Worldwide',
    availableLanguage: ['Chinese', 'English'],
  },
};

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[char]);
}

function jsonLd(data) {
  return JSON.stringify(data, null, 2).replace(/</g, '\\u003c');
}

function baseCss() {
  return `
    :root { color-scheme: light; --ink:#13211f; --muted:#5d6d68; --line:#dfe8e5; --brand:#0f8a67; --accent:#f0832e; --bg:#f7faf8; }
    * { box-sizing: border-box; }
    body { margin:0; font-family: Inter, Arial, Helvetica, sans-serif; color:var(--ink); background:var(--bg); line-height:1.6; }
    a { color:inherit; }
    .wrap { width:min(1120px, calc(100% - 40px)); margin:0 auto; }
    .nav { min-height:72px; display:flex; align-items:center; justify-content:space-between; gap:24px; border-bottom:1px solid var(--line); background:#fff; }
    .brand { display:flex; align-items:center; gap:12px; font-weight:800; text-decoration:none; }
    .brand img { width:42px; height:42px; object-fit:contain; }
    .nav-links { display:flex; gap:18px; flex-wrap:wrap; font-size:14px; color:var(--muted); }
    .hero { padding:70px 0 46px; }
    .eyebrow { color:var(--brand); font-weight:800; text-transform:uppercase; letter-spacing:.08em; font-size:13px; }
    h1 { margin:10px 0 18px; max-width:840px; font-size:clamp(36px, 6vw, 70px); line-height:1.02; letter-spacing:0; }
    .lead { max-width:760px; color:var(--muted); font-size:19px; }
    .hero-grid { display:grid; grid-template-columns:1.05fr .95fr; gap:48px; align-items:center; }
    .product-img { width:100%; max-height:520px; object-fit:contain; filter:drop-shadow(0 28px 42px rgba(21,48,44,.18)); }
    .actions { display:flex; gap:12px; flex-wrap:wrap; margin-top:28px; }
    .btn { display:inline-flex; align-items:center; justify-content:center; min-height:46px; padding:0 18px; border-radius:8px; text-decoration:none; font-weight:800; border:1px solid var(--line); background:#fff; }
    .btn.primary { background:var(--brand); color:#fff; border-color:var(--brand); }
    .section { padding:42px 0; }
    .specs { display:grid; grid-template-columns:repeat(5, 1fr); border:1px solid var(--line); background:#fff; border-radius:12px; overflow:hidden; }
    .spec { padding:18px; border-right:1px solid var(--line); }
    .spec:last-child { border-right:0; }
    .spec b { display:block; font-size:13px; color:var(--muted); }
    .spec span { display:block; margin-top:6px; font-weight:800; }
    .content-grid { display:grid; grid-template-columns:1fr 1fr; gap:26px; }
    .panel { padding:26px; background:#fff; border:1px solid var(--line); border-radius:12px; }
    .panel h2 { margin-top:0; font-size:28px; }
    .list { margin:0; padding-left:20px; color:var(--muted); }
    .footer { margin-top:40px; padding:30px 0; border-top:1px solid var(--line); color:var(--muted); font-size:14px; }
    @media (max-width: 820px) { .hero-grid, .content-grid { grid-template-columns:1fr; } .specs { grid-template-columns:1fr; } .spec { border-right:0; border-bottom:1px solid var(--line); } .spec:last-child { border-bottom:0; } }
  `;
}

function pageShell({ title, description, canonical, image, body, schema, lang = 'en' }) {
  const zhUrl = `${site}/`;
  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <link rel="canonical" href="${canonical}" />
    <link rel="alternate" hreflang="en" href="${canonical}" />
    <link rel="alternate" hreflang="zh-CN" href="${zhUrl}" />
    <link rel="alternate" hreflang="x-default" href="${site}/en/" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Panhiro Cleaning Equipment" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${site}${image}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${site}${image}" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <style>${baseCss()}</style>
    <script type="application/ld+json">${jsonLd(schema)}</script>
  </head>
  <body>
    ${body}
  </body>
</html>
`;
}

function nav() {
  return `<header class="nav wrap">
      <a class="brand" href="/en/"><img src="/assets/panhiro-logo-hd.png" alt="Panhiro logo" width="42" height="42" /><span>Panhiro</span></a>
      <nav class="nav-links" aria-label="Main navigation">
        <a href="/en/">Home</a>
        <a href="/en/#products">Products</a>
        <a href="/en/#contact">Contact</a>
        <a href="/">Chinese site</a>
      </nav>
    </header>`;
}

function productSchema(product, canonical) {
  return [
    org,
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      model: product.model,
      brand: { '@type': 'Brand', name: 'Panhiro' },
      manufacturer: { '@type': 'Organization', name: 'Taizhou Panhong Electromechanical Co., Ltd.' },
      image: `${site}${product.image}`,
      description: product.description,
      category: 'Pressure washer',
      additionalProperty: product.specs.map(([name, value]) => ({
        '@type': 'PropertyValue',
        name,
        value,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${site}/en/` },
        { '@type': 'ListItem', position: 2, name: 'Products', item: `${site}/en/#products` },
        { '@type': 'ListItem', position: 3, name: product.name, item: canonical },
      ],
    },
  ];
}

function productPage(product) {
  const canonical = `${site}/en/products/${product.slug}/`;
  const body = `${nav()}
    <main>
      <section class="hero wrap">
        <div class="hero-grid">
          <div>
            <p class="eyebrow">Panhiro pressure washer manufacturer</p>
            <h1>${esc(product.headline)}</h1>
            <p class="lead">${esc(product.description)}</p>
            <div class="actions">
              <a class="btn primary" href="/en/#contact">Request product details</a>
              <a class="btn" href="/en/#products">View all products</a>
            </div>
          </div>
          <img class="product-img" src="${product.image}" alt="${esc(product.name)}" loading="eager" decoding="async" />
        </div>
      </section>
      <section class="section wrap">
        <div class="specs">
          ${product.specs.map(([label, value]) => `<div class="spec"><b>${esc(label)}</b><span>${esc(value)}</span></div>`).join('')}
        </div>
      </section>
      <section class="section wrap content-grid">
        <article class="panel">
          <h2>Why buyers use this model</h2>
          <ul class="list">
            <li>Clear product positioning for dealers, distributors, and procurement teams.</li>
            <li>Suitable for car washing, outdoor cleaning, property maintenance, and channel sales.</li>
            <li>Supports packaging, plug, voltage, accessory, and bulk purchase communication.</li>
          </ul>
        </article>
        <article class="panel">
          <h2>Search terms covered</h2>
          <ul class="list">
            ${product.keywords.map((item) => `<li>${esc(item)}</li>`).join('')}
          </ul>
        </article>
      </section>
    </main>
    <footer class="footer wrap">Panhiro Cleaning Equipment · Pressure washers, car wash machines, OEM/ODM and channel cooperation</footer>`;

  return pageShell({
    title: `${product.name} | Panhiro Pressure Washer Manufacturer`,
    description: product.description,
    canonical,
    image: product.image,
    body,
    schema: productSchema(product, canonical),
  });
}

function englishHome() {
  const canonical = `${site}/en/`;
  const description =
    'Panhiro manufactures pressure washers for home, semi-commercial, commercial, and EV powered mobile cleaning use, including VK-Y1, VK-1011, PH-0995, PH-0885, P4 and P5.';
  const body = `${nav()}
    <main>
      <section class="hero wrap">
        <div class="hero-grid">
          <div>
            <p class="eyebrow">Pressure washer manufacturer in China</p>
            <h1>Permanent-magnet inverter pressure washers for mobile and commercial cleaning</h1>
            <p class="lead">${description}</p>
            <div class="actions">
              <a class="btn primary" href="#products">Compare product series</a>
              <a class="btn" href="#contact">Send inquiry</a>
            </div>
          </div>
          <img class="product-img" src="/assets/vk-y1-01.jpg" alt="Panhiro VK-Y1 EV powered pressure washer" loading="eager" decoding="async" />
        </div>
      </section>
      <section class="section wrap" id="products">
        <p class="eyebrow">Product SEO landing pages</p>
        <h2>Pressure washer product series</h2>
        <div class="content-grid">
          ${products.map((product) => `<a class="panel" href="/en/products/${product.slug}/"><h3>${esc(product.name)}</h3><p>${esc(product.description)}</p></a>`).join('')}
        </div>
      </section>
      <section class="section wrap content-grid" id="contact">
        <article class="panel">
          <h2>OEM, ODM and channel cooperation</h2>
          <p>Tell us your target market, quantity, voltage, plug type, product model, and packaging requirement. Panhiro can prepare product data and cooperation details for procurement review.</p>
        </article>
        <article class="panel">
          <h2>Contact</h2>
          <p>Phone: +86 131 9722 8342</p>
          <p>Company: Taizhou Panhong Electromechanical Co., Ltd.</p>
        </article>
      </section>
    </main>
    <footer class="footer wrap">Panhiro Cleaning Equipment · VK-Y1 · VK-1011 · VK-1010-P4 · PH-0995 · PH-0885 · P4/P5</footer>`;

  return pageShell({
    title: 'Panhiro Pressure Washer Manufacturer | EV Powered and Commercial Cleaning Machines',
    description,
    canonical,
    image: '/assets/vk-y1-01.jpg',
    body,
    schema: [
      org,
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Panhiro Cleaning Equipment',
        url: site,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Panhiro pressure washer products',
        itemListElement: products.map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${site}/en/products/${product.slug}/`,
          name: product.name,
        })),
      },
    ],
  });
}

function writePage(path, content) {
  const full = join(root, path);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content, 'utf8');
}

function sitemap() {
  const urls = [
    ['/', 'weekly', '1.0'],
    ['/en/', 'weekly', '0.95'],
    ...products.map((product) => [`/en/products/${product.slug}/`, 'monthly', '0.9']),
    ['/subpage?page=company-profile', 'monthly', '0.75'],
    ['/subpage?page=company-strength', 'monthly', '0.75'],
    ['/subpage?page=products', 'weekly', '0.7'],
    ['/subpage?page=contact', 'monthly', '0.7'],
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([url, changefreq, priority]) => `  <url>
    <loc>${site}${url}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>
`;
}

writePage('en/index.html', englishHome());
for (const product of products) {
  writePage(`en/products/${product.slug}/index.html`, productPage(product));
}
writePage('sitemap.xml', sitemap());

console.log(`Generated ${products.length + 1} English SEO pages and sitemap.xml`);
