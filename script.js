// ============================================
// AE9 LABS: PUBLIC DEMO SITE
// Paste the three links below once you have made them in Airtable.
// ============================================
const DEMO_LINKS = {
  form: 'https://airtable.com/embed/appKb6vuUasg2aMsi/shr6GPNP2MshHW1fb',        // Airtable form share link (embed version)
  view: 'https://airtable.com/appKb6vuUasg2aMsi/shrDr2U7GRxJ790rg',       // Shared grid view link, set to read-only
  copy: 'https://airtable.com/appeD0isd9BbEk6WP/shrKXAuEAv7QSRPb5'             // Base share link (the "Copy base" link)
};

function isPlaceholder(v) { return !v || v.indexOf('YOUR_') === 0; }

function escapeHTML(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}

// ---------- Booking form embed ----------
(function setupForm() {
  const iframe = document.getElementById('booking-form-embed');
  const fallback = document.getElementById('booking-fallback');
  if (!iframe) return;
  if (isPlaceholder(DEMO_LINKS.form)) {
    iframe.style.display = 'none';
    fallback.style.display = 'block';
  } else {
    iframe.src = DEMO_LINKS.form;
  }
})();

// ---------- Under-the-hood buttons ----------
(function setupLinks() {
  [['view-link', DEMO_LINKS.view], ['copy-link', DEMO_LINKS.copy]].forEach(([id, url]) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (isPlaceholder(url)) {
      el.setAttribute('aria-disabled', 'true');
      el.textContent += ' (coming soon)';
    } else {
      el.href = url;
    }
  });
})();

// ---------- Smooth scroll ----------
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const id = this.getAttribute('href');
    if (id.length > 1) {
      const t = document.querySelector(id);
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    }
  });
});

// ---------- Services and reviews ----------
// A snapshot of the demo Airtable base (Services and Testimonials tables).
// On a real AE9 site this comes from the Airtable sync, so you never edit code.
const DEMO_SERVICES = [
  {
    "Service Name": "House Cleaning",
    "Description": "Top to bottom clean of kitchens, bathrooms, floors and living spaces. Bring us the mess, keep your weekend.",
    "Icon Letter": "C",
    "Status": "Published"
  },
  {
    "Service Name": "Handyman Repairs",
    "Description": "Leaky faucets, squeaky doors, loose shelves and the to-do list that never ends. One visit, done right.",
    "Icon Letter": "H",
    "Status": "Published"
  },
  {
    "Service Name": "Lawn & Garden Care",
    "Description": "Mowing, trimming, weeding and seasonal cleanup so your yard looks cared for all year.",
    "Icon Letter": "L",
    "Status": "Published"
  },
  {
    "Service Name": "Pressure Washing",
    "Description": "Driveways, patios and siding washed back to bright. Great before a sale or a party.",
    "Icon Letter": "P",
    "Status": "Published"
  },
  {
    "Service Name": "Small Painting Jobs",
    "Description": "Touch-ups, a single room or a front door refresh. Clean lines and no drips.",
    "Icon Letter": "S",
    "Status": "Published"
  }
];
const DEMO_TESTIMONIALS = [
  {
    "Customer Name": "Jamie Q. (made-up)",
    "Quote": "They showed up on time, finished early and left the place cleaner than they found it. This is a sample review for the demo.",
    "Neighborhood": "Sample Heights",
    "Status": "Published"
  },
  {
    "Customer Name": "Riley T. (made-up)",
    "Quote": "Booking took about a minute and I got a reply the same day. Sample text so you can see how reviews look on your own site.",
    "Neighborhood": "Demo Hills",
    "Status": "Published"
  },
  {
    "Customer Name": "Morgan P. (made-up)",
    "Quote": "Fair price, friendly crew, no surprises. Fake testimonial for demonstration only.",
    "Neighborhood": "Example Park",
    "Status": "Published"
  }
];

function renderServices() {
  const grid = document.getElementById('services-grid');
  const rows = DEMO_SERVICES.filter(r => r.Status === 'Published');
  grid.innerHTML = rows.map(f => `<div class="service-card">
      <div class="service-icon">${escapeHTML((f['Icon Letter'] || '?').charAt(0))}</div>
      <h3>${escapeHTML(f['Service Name'])}</h3>
      <p>${escapeHTML(f['Description'])}</p>
    </div>`).join('');
}

function renderTestimonials() {
  const grid = document.getElementById('testimonial-grid');
  const rows = DEMO_TESTIMONIALS.filter(r => r.Status === 'Published');
  grid.innerHTML = rows.map(f => `<div class="testimonial-card">
      <p>"${escapeHTML(f['Quote'])}"</p>
      <div class="testimonial-name">${escapeHTML(f['Customer Name'])}</div>
      ${f['Neighborhood'] ? `<div class="testimonial-area">${escapeHTML(f['Neighborhood'])}</div>` : ''}
    </div>`).join('');
}

renderServices();
renderTestimonials();
