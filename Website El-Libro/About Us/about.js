/**
 * E-LIBRO — About Us JavaScript (about.js)
 * ==========================================
 * Features:
 *  - Team member data (easy to edit)
 *  - Dynamic card rendering
 *  - Contribution bar animations
 *  - Profile modal
 *  - Scroll animations
 *  - Navbar state + hamburger
 *  - Login state detection
 * ==========================================
 */

/* ================================================
   TEAM DATA — Edit bagian ini untuk mengganti data tim
   ================================================ */
const teamData = [
  {
    id: 1,
    // --- GANTI DATA DI BAWAH INI ---
    name: "Abbad Dhia Radithya Aji",
    nim: "NRP: 2043251108",
    role: "Project Manager",
    roleShort: "PM",
    color: "#5D3023",         // warna kartu
    photo: "../img/Foto Abee.jpeg",              // isi dengan URL foto, contoh: "foto/anggota1.jpg"
    initials: "A1",           // inisial jika tidak ada foto
    desc: "Memimpin alur pengembangan proyek, mengkoordinasikan tim, dan memastikan setiap deliverable selesai tepat waktu. Bertanggung jawab atas arsitektur informasi dan strategi konten.",
    skills: ["Project Planning", "Team Lead", "Content Strategy", "UI Review"],
    contributions: [
      { label: "Project Planning",    pct: 90 },
      { label: "Content Strategy",    pct: 80 },
      { label: "UI Review & QA",      pct: 70 },
      { label: "Documentation",       pct: 85 },
    ],
    email: "Abbaddhiaradithyaaji@gmail.com",
    github: "https://github.com/AbbadDhiaRA",
    linkedin: "https://linkedin.com/in/placeholder",
  },
  {
    id: 2,
    name: "Farah Nisfia Ramadhani",
    nim: "NRP: 2043251026",
    role: "Frontend Developer",
    roleShort: "FE",
    color: "#895737",
    photo: "../img/Foto Farah.jpeg",
    initials: "A2",
    desc: "Membangun struktur HTML semantik dan mengimplementasikan semua halaman utama. Bertanggung jawab atas layout responsif, animasi scroll, dan integrasi antar halaman.",
    skills: ["HTML5", "CSS Grid", "Responsive Design", "Git"],
    contributions: [
      { label: "HTML Structure",      pct: 95 },
      { label: "Responsive Layout",   pct: 88 },
      { label: "Cross-page Integration", pct: 80 },
      { label: "Performance Opt.",    pct: 72 },
    ],
    email: "farahnisfia1001@gmail.com",
    github: "https://github.com/farahnisfia-ux",
    linkedin: "https://linkedin.com/in/placeholder",
  },
  {
    id: 3,
    name: "Saskia Triana Putri ",
    nim: "NRP: 2043251018",
    role: "UI/UX Design",
    roleShort: "Frontend",
    color: "#C08552",
    photo: "../img/Foto Saskia.jpeg",
    initials: "A3",
    desc: "Merancang visual identity, color palette, dan sistem desain E-Libro. Bertanggung jawab atas konsistensi estetika, tipografi, dan pengalaman pengguna yang premium di seluruh halaman.",
    skills: ["CSS3", "Design Systems", "Typography", "Figma"],
    contributions: [
      { label: "Visual Design",       pct: 95 },
      { label: "CSS Styling",         pct: 90 },
      { label: "Color & Typography",  pct: 92 },
      { label: "Hover Animations",    pct: 85 },
    ],
    email: "⁠saskiiatriiana@gmail.com",
    github: "https://github.com/saskiiatriiana",
  },
  {
    id: 4,
    name: "Nasywa Ananda Olivia",
    nim: "NRP: 2043251118",
    role: "Frontend Developer",
    roleShort: "JS",
    color: "#D9B49D",
    photo: "../img/Foto Nasywa.jpeg",
    initials: "A4",
    desc: "Mengimplementasikan seluruh logika interaktif platform — dari deteksi login, dynamic rendering kartu buku, search dengan debounce, hingga animasi scroll berbasis Intersection Observer.",
    skills: ["JavaScript ES6+", "localStorage", "DOM Manipulation", "API"],
    contributions: [
      { label: "JS Logic",            pct: 95 },
      { label: "localStorage Auth",   pct: 88 },
      { label: "Dynamic Rendering",   pct: 90 },
      { label: "Scroll Animations",   pct: 82 },
    ],
    email: "nasywaananda29@gmail.com",
    github: "https://github.com/nasywaananda29-wq",
  },
];

/* ================================================
   RENDER TEAM CARDS
   ================================================ */
function renderTeamCards() {
  const grid = document.getElementById("teamGrid");
  if (!grid) return;

  grid.innerHTML = teamData.map((m, i) => `
    <div
      class="team-card"
      style="animation-delay: ${i * 0.1}s"
      onclick="openModal(${m.id})"
      data-animate
    >
      <div class="tc-header" style="background: ${m.color};">
        <div class="tc-avatar">
          ${m.photo
            ? `<img src="${m.photo}" alt="${m.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/><div class="avatar-initials" style="display:none;">${m.initials}</div>`
            : `<div class="avatar-initials">${m.initials}</div>`
          }
        </div>
        <div class="tc-role-badge">${m.role}</div>
      </div>

      <div class="tc-body">
        <h3 class="tc-name">${m.name}</h3>
        <p class="tc-nim">${m.nim}</p>
        <p class="tc-desc">${m.desc}</p>
        <div class="tc-skills">
          ${m.skills.slice(0, 3).map(s => `<span class="tc-skill">${s}</span>`).join('')}
          ${m.skills.length > 3 ? `<span class="tc-skill">+${m.skills.length - 3}</span>` : ''}
        </div>
      </div>

      <div class="tc-footer">
        <div class="tc-socials">
          <a href="mailto:${m.email}" class="tc-social-btn" onclick="event.stopPropagation()" title="Email">
            <i data-lucide="mail"></i>
          </a>
          <a href="${m.github}" target="_blank" class="tc-social-btn" onclick="event.stopPropagation()" title="GitHub">
            <i data-lucide="github"></i>
          </a>
        </div>
        <button class="tc-detail-btn">
          Detail <i data-lucide="arrow-right"></i>
        </button>
      </div>
    </div>
  `).join('');

  // Re-init icons after dynamic render
  if (typeof lucide !== 'undefined') lucide.createIcons();
  // Re-observe new elements
  observeAnimations();
}

/* ================================================
   RENDER CONTRIBUTION BARS
   ================================================ */
function renderContributions() {
  const layout = document.getElementById("contribLayout");
  if (!layout) return;

  layout.innerHTML = teamData.map(m => `
    <div class="contrib-row" data-animate>
      <div class="cr-person">
        <div class="cr-avatar" style="background:${m.color}; color:${m.color === '#D9B49D' ? '#5D3023' : 'white'};">
          ${m.initials}
        </div>
        <div>
          <p class="cr-name">${m.name}</p>
          <p class="cr-role">${m.role}</p>
        </div>
      </div>
      <div class="cr-bars">
        ${m.contributions.map(c => `
          <div class="cr-bar-item">
            <span class="cr-bar-label">${c.label}</span>
            <div class="cr-bar-track">
              <div
                class="cr-bar-fill"
                data-pct="${c.pct}"
                style="background: linear-gradient(90deg, ${m.color}, ${lightenHex(m.color, 30)});"
              ></div>
            </div>
            <span class="cr-bar-pct">${c.pct}%</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  observeAnimations();
  observeContribBars();
}

/* Lighten a hex color for gradient effect */
function lightenHex(hex, amount) {
  const num = parseInt(hex.replace('#',''), 16);
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0x00FF) + amount);
  const b = Math.min(255, (num & 0x0000FF) + amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6,'0')}`;
}

/* Animate bars when they enter viewport */
function observeContribBars() {
  const bars = document.querySelectorAll('.cr-bar-fill');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const pct = e.target.getAttribute('data-pct');
        e.target.style.width = pct + '%';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => obs.observe(b));
}

/* ================================================
   RENDER FOOTER CREDITS
   ================================================ */
function renderFooterCredits() {
  const el = document.getElementById("footerCredits");
  if (!el) return;

  el.innerHTML = teamData.map(m => `
    <div class="credit-item">
      <div class="credit-dot" style="background:${m.color}; color:${m.color === '#D9B49D' ? '#5D3023' : 'white'};">
        ${m.initials}
      </div>
      <div class="credit-info">
        <span class="credit-name">${m.name}</span>
        <span class="credit-role">${m.role}</span>
      </div>
    </div>
  `).join('');
}

/* ================================================
   PROFILE MODAL
   ================================================ */
function openModal(id) {
  const m = teamData.find(t => t.id === id);
  if (!m) return;

  const content = document.getElementById("modalContent");
  content.innerHTML = `
    <div class="m-header">
      <div class="m-avatar" style="background:${m.color}; color:${m.color === '#D9B49D' ? '#5D3023' : 'white'};">
        ${m.photo
          ? `<img src="${m.photo}" alt="${m.name}" onerror="this.style.display='none'"/>`
          : m.initials
        }
      </div>
      <div>
        <p class="m-nim">${m.nim}</p>
        <h2 class="m-name">${m.name}</h2>
        <span class="m-role">${m.role}</span>
      </div>
    </div>

    <div class="m-divider"></div>

    <p class="m-section-label">Tentang</p>
    <p class="m-desc">${m.desc}</p>

    <p class="m-section-label">Keahlian</p>
    <div class="m-skills">
      ${m.skills.map(s => `<span class="m-skill">${s}</span>`).join('')}
    </div>

    <div class="m-divider"></div>

    <p class="m-section-label">Kontak</p>
    <div class="m-contacts">
      <a href="mailto:${m.email}" class="m-contact">
        <i data-lucide="mail"></i> ${m.email}
      </a>
      <a href="${m.github}" target="_blank" class="m-contact">
        <i data-lucide="github"></i> GitHub
      </a>
      <a href="${m.linkedin}" target="_blank" class="m-contact">
        <i data-lucide="linkedin"></i> LinkedIn
      </a>
    </div>
  `;

  document.getElementById("modalOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

// Close modal with Escape key
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

/* ================================================
   SCROLL ANIMATIONS — Intersection Observer
   ================================================ */
function observeAnimations() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        const delay = parseFloat(e.target.getAttribute('data-delay') || '0');
        setTimeout(() => {
          e.target.classList.add('visible');
        }, delay * 1000);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-animate]:not(.visible)').forEach(el => obs.observe(el));
}

/* ================================================
   NAVBAR — Scroll shadow & active state
   ================================================ */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  }, { passive: true });
}

/* ================================================
   HAMBURGER MENU
   ================================================ */
function initHamburger() {
  const btn = document.getElementById("hamburger");
  const menu = document.getElementById("mobileMenu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    const isOpen = menu.classList.contains("open");
    if (isOpen) {
      closeMobile();
    } else {
      menu.classList.add("open");
      btn.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  });
}

function closeMobile() {
  document.getElementById("hamburger")?.classList.remove("open");
  document.getElementById("mobileMenu")?.classList.remove("open");
  document.body.style.overflow = "";
}

/* ================================================
   SMOOTH SCROLL
   ================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: "smooth" });
        closeMobile();
      }
    });
  });
}

/* ================================================
   LOGIN STATE
   ================================================ */
function checkLoginState() {
  const user = sessionStorage.getItem("elibro_user") || localStorage.getItem("elibro_user");
  const guestEl  = document.getElementById("authGuest");
  const userEl   = document.getElementById("authUser");
  const initialEl = document.getElementById("userInitial");
  const nameEl   = document.getElementById("userName");

  if (user) {
    const parsed = JSON.parse(user);
    if (guestEl) guestEl.style.display = "none";
    if (userEl)  userEl.style.display = "flex";
    if (initialEl) initialEl.textContent = (parsed.name || parsed.email || "U")[0].toUpperCase();
    if (nameEl) nameEl.textContent = parsed.name || parsed.email?.split("@")[0] || "User";
  }
}


/* ================================================
   LOGIN STATE — localStorage / sessionStorage
   ================================================ */
function checkLoginState() {
  // Read from both login page outputs
  const user = sessionStorage.getItem("elibro_user") || localStorage.getItem("elibro_user");

  const authGuest = document.getElementById("authGuest");
  const authUser = document.getElementById("authUser");
  const userInitial = document.getElementById("userInitial");
  const userNameDisplay = document.getElementById("userNameDisplay");

  if (user) {
    const parsed = JSON.parse(user);
    if (authGuest) authGuest.style.display = "none";
    if (authUser) authUser.style.display = "flex";
    if (userInitial) userInitial.textContent = (parsed.name || parsed.email || "U")[0].toUpperCase();
    if (userNameDisplay) userNameDisplay.textContent = parsed.name || parsed.email?.split("@")[0] || "User";
  } else {
    if (authGuest) authGuest.style.display = "flex";
    if (authUser) authUser.style.display = "none";
  }
}




/* ================================================
   INIT — Run everything on DOM ready
   ================================================ */
document.addEventListener("DOMContentLoaded", () => {
  // Init Lucide icons
  if (typeof lucide !== "undefined") lucide.createIcons();

  // Core setup
  checkLoginState();
  initNavbar();
  initHamburger();
  initSmoothScroll();

  // Render dynamic content
  renderTeamCards();
  renderContributions();
  renderFooterCredits();

  // Observe all static animated elements
  observeAnimations();
  observeContribBars();
});
