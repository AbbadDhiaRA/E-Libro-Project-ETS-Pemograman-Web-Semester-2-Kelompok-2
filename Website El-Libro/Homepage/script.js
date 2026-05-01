/**
 * E-LIBRO — Main JavaScript
 * Features: Login state, book data, interactivity, animations
 */

/* ================================================
   DUMMY DATA
   ================================================ */
const booksData = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    price: 120000,
    rating: 4.9,
    reviews: 4340,
    genre: "Self-Improvement",
    cover: "https://image.gramedia.net/rs:fit:0:0/plain/https://cdn.gramedia.com/uploads/items/9786020633176_.Atomic_Habit.jpg",
    badge: "Bestseller",
    type: "digital"
  },
  {
    id: 2,
    title: "The psychology of money",
    author: "Morgan Housel",
    price: 89000,
    rating: 4.8,
    reviews: 1870,
    genre: "Self-Improvement",
    cover: "https://cdn.gramedia.com/uploads/items/psychology_of_money.jfif.png",
    badge: "Best Seller",
    type: "digital"
  },
  {
    id: 3,
    title: "Seporsi Mie Ayam sebelum Mati",
    author: "Brian Khrisna",
    price: 95000,
    rating: 4.7,
    reviews: 3120,
    genre: "Fiksi",
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHaHBjn2BM2xZaWZnJOtBLhtrrDAYOLgtyUg&s",
    badge: "New",
    type: "digital"
  },
  {
    id: 4,
    title: "The Alpha Girl's Guide",
    author: "Henry Manampiring",
    price: 85000,
    rating: 4.8,
    reviews: 980,
    genre: "Self-Improvement",
    cover: "https://cdn.gramedia.com/uploads/items/THE_ALPHA_GIRLS_GUIDE.jpg",
    badge: null,
    type: "digital"
  },
  {
    id: 5,
    title: "Pulang",
    author: "Tere Liye",
    price: 95000,
    rating: 4.6,
    reviews: 5440,
    genre: "Fiksi",
    cover: "https://cdn.gramedia.com/uploads/items/pulang_tere_liye.jpeg",
    badge: "PROMO",
    type: "free"
  },
  {
    id: 6,
    title: "Tentang Kamu",
    author: "Tere Liye",
    price: 105000,
    rating: 4.7,
    reviews: 1982,
    genre: "Fiksi",
    cover: "https://www.gramedia.com/blog/content/images/2022/02/Tentang-Kamu.jpg",
    badge: null,
    type: "digital"
  },
  {
    id: 7,
    title: "Neuromancer",
    author: "William Gibson",
    price: 105000,
    rating: 4.3,
    reviews: 1640,
    genre: "Horror",
    cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1752514552i/6088007.jpg",
    badge: null,
    type: "digital"
  },
  {
    id: 8,
    title: "Dune",
    author: "William Gibson",
    price: 129000,
    rating: 4.2,
    reviews: 1325,
    genre: "Fiksi",
    cover: "https://cdn.gramedia.com/uploads/picture_meta/2023/3/26/ih86gbr4urzmibs3ah49hq.jpg",
    badge: null,
    type: "digital"
  },
  {
    id: 9,
    title: "Bumi",
    author: "Tere Liye",
    price: 102000,
    rating: 4.5,
    reviews: 1624,
    genre: "Fiksi",
    cover: "https://cdn.gramedia.com/uploads/items/9786020332956_Bumi-New-Cover.jpg",
    badge: null,
    type: "digital"
  },
  {
    id: 10,
    title: "Bulan",
    author: "Tere Liye",
    price: 98000,
    rating: 4.4,
    reviews: 1298,
    genre: "Fiksi",
    cover: "https://image.gramedia.net/rs:fit:0:0/plain/https://cdn.gramedia.com/uploads/items/img20220905_11324048.jpg",
    badge: null,
    type: "digital"
  },

  {
    id: 11,
    title: "Matahari",
    author: "Tere Liye",
    price: 98000,
    rating: 4.3,
    reviews: 1567,
    genre: "Fiksi",
    cover: "https://image.gramedia.net/rs:fit:0:0/plain/https://cdn.gramedia.com/uploads/items/img20220905_11433462.jpg",
    badge: null,
    type: "digital"
  },
  
  {
    id: 12,
    title: "Bintang",
    author: "Tere Liye",
    price: 98100,
    rating: 4.8,
    reviews: 1687,
    genre: "Fiksi",
    cover: "https://image.gramedia.net/rs:fit:0:0/plain/https://cdn.gramedia.com/uploads/picture_meta/2023/4/10/ccmq4kges6gstnsrrtxabw.jpg",
    badge: null,
    type: "digital"
  }


];



/* ================================================
   FORMAT CURRENCY
   ================================================ */
function formatRupiah(price) {
  if (price === 0) return "Gratis";
  return "Rp " + price.toLocaleString("id-ID");
}

/* ================================================
   RENDER BOOK CARDS
   ================================================ */
function renderBooks() {
  const grid = document.getElementById("booksGrid");
  if (!grid) return;

  grid.innerHTML = booksData.map(book => `
    <div class="book-card" onclick="handleBookClick(${book.id})">
      <div class="book-cover">
        <img
          src="${book.cover}"
          alt="${book.title}"
          loading="lazy"
          onerror="this.src='https://placehold.co/180x220/${encodeURIComponent('5D3023')}/${encodeURIComponent('F2E9DC')}?text=${encodeURIComponent(book.title.split(' ')[0])}'"
        />
        <div class="book-cover-overlay">
          <button class="book-quick-add" onclick="event.stopPropagation(); addToLibrary(${book.id})">
            + Tambah ke Library
          </button>
        </div>
        ${book.badge ? `<div style="
          position:absolute;top:8px;left:8px;
          padding:3px 8px;
          border-radius:4px;
          font-size:0.62rem;
          font-weight:700;
          text-transform:uppercase;
          background:${book.badge === 'Gratis' ? '#2d8a3e' : book.badge === 'New' ? '#5D3023' : '#C08552'};
          color:white;
          letter-spacing:0.05em;
        ">${book.badge}</div>` : ''}
      </div>
      <div class="book-info">
        <span class="book-genre-tag">${book.genre}</span>
        <h3 class="book-title">${book.title}</h3>
        <p class="book-author">${book.author}</p>
        <div class="book-meta">
          <div class="book-rating">
            <svg width="13" height="13" viewBox="0 0 24 24" class="star-filled"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            ${book.rating} <span style="color:var(--blush);font-weight:400">(${book.reviews.toLocaleString()})</span>
          </div>
          <span class="book-price ${book.price === 0 ? 'free' : ''}">${formatRupiah(book.price)}</span>
        </div>
        <button class="book-cta" onclick="event.stopPropagation(); ${book.price === 0 ? `addToLibrary(${book.id})` : `buyBook(${book.id})`}">
          ${book.price === 0 ? "Baca Gratis" : "Beli Sekarang"}
        </button>
      </div>
    </div>
  `).join('');
}

/* ================================================
   RENDER TRENDING
   ================================================ */
function renderTrending() {
  const list = document.getElementById("trendingList");
  if (!list) return;

  list.innerHTML = trendingData.map(item => `
    <div class="trending-item">
      <span class="trending-rank">${String(item.rank).padStart(2, '0')}</span>
      <div class="trending-cover">
        <img
          src="${item.cover}"
          alt="${item.title}"
          loading="lazy"
          onerror="this.src='https://placehold.co/44x60/5D3023/F2E9DC?text=📚'"
        />
      </div>
      <div class="trending-info">
        <p class="trending-book-title">${item.title}</p>
        <p class="trending-book-author">${item.author}</p>
      </div>
    </div>
  `).join('');
}

/* ================================================
   INTERACTION HANDLERS
   ================================================ */
function handleBookClick(id) {
  const detailMap = {
    1: "../Detail buku baru/detail_produc_atomic_habits_web.html",
    2: "../Detail buku baru/detail_book_the_psychology_of_money_web.html",
    3: "../Detail buku baru/detail_book_seporsi_mie_ayam_sebelum_mati_web.html",
    4: "../Detail buku baru/detail_book_the_alpha_girl_s_guide_web.html",
    5: "../Detail buku baru/detail_book_pulang_web.html",
    6: "../Detail buku baru/detail_book_tentang_kamu_web.html",
    7: "../Detail buku baru/detail_book_neuromancer_web.html",
    8: "../Detail buku baru/detail_book_dune_web.html",
    9: "../Detail buku baru/detail_book_bumi_web.html",
    10: "../Detail buku baru/detail_book_bulan_web.html",
    11: "../Detail buku baru/detail_book_matahri_web.html",
    12: "../Detail buku baru/detail_book_bintang_web.html"
  };
  window.location.href = detailMap[id] || "../Explore.html";
}

function addToLibrary(id) {
  const book = booksData.find(b => b.id === id);
  if (!book) return;
  const library = JSON.parse(localStorage.getItem("elibroLibrary")) || [];
  const item = {
    id: book.id,
    title: book.title,
    author: book.author,
    price: book.price,
    discountPrice: book.price,
    image: book.cover,
    format: "E-Book",
    quantity: 1,
    detailUrl: "#"
  };
  if (!library.some(saved => String(saved.id) === String(item.id))) library.push(item);
  localStorage.setItem("elibroLibrary", JSON.stringify(library));
  showToast(`"${book.title}" berhasil ditambahkan ke My Library.`);
}

function buyBook(id) {
  const book = booksData.find(b => b.id === id);
  if (!book) return;
  localStorage.setItem("checkoutItems", JSON.stringify([{
    id: book.id,
    title: book.title,
    author: book.author,
    price: book.price,
    discountPrice: book.price,
    image: book.cover,
    format: "E-Book",
    quantity: 1,
    detailUrl: "#"
  }]));
  window.location.href = "../Checkout E-Librro web.html";
}

/* ================================================
   TOAST NOTIFICATION
   ================================================ */
function showToast(message, type = "success") {
  // Remove existing toast
  const old = document.getElementById("elibro-toast");
  if (old) old.remove();

  const toast = document.createElement("div");
  toast.id = "elibro-toast";
  toast.textContent = message;
  Object.assign(toast.style, {
    position: "fixed",
    bottom: "2rem",
    left: "50%",
    transform: "translateX(-50%) translateY(8px)",
    background: type === "warn" ? "#895737" : "#5D3023",
    color: "#F2E9DC",
    padding: "0.8rem 1.6rem",
    borderRadius: "100px",
    fontSize: "0.85rem",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "500",
    boxShadow: "0 8px 32px rgba(93,48,35,0.25)",
    zIndex: "9999",
    opacity: "0",
    transition: "all 0.3s ease",
    whiteSpace: "nowrap",
    maxWidth: "calc(100vw - 2rem)",
    textAlign: "center"
  });
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(8px)";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
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
   NAVBAR — Scroll effect & sticky shadow
   ================================================ */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
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
  const btn = document.getElementById("hamburger");
  const menu = document.getElementById("mobileMenu");
  menu?.classList.remove("open");
  btn?.classList.remove("open");
  document.body.style.overflow = "";
}

/* ================================================
   SMOOTH SCROLL for nav links
   ================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });
}

/* ================================================
   GENRE CHIPS — Filter (UI only)
   ================================================ */
function initGenreChips() {
  document.querySelectorAll(".genre-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".genre-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      const genre = chip.textContent.trim();
      filterBooks(genre);
    });
  });
}

function filterBooks(genre) {
  const grid = document.getElementById("booksGrid");
  if (!grid) return;

  const filtered = genre === "Semua"
    ? booksData
    : booksData.filter(b => b.genre.toLowerCase().includes(genre.toLowerCase()));

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--copper);">
        <p style="font-size:0.9rem;">Tidak ada buku untuk genre ini saat ini.</p>
      </div>
    `;
    return;
  }

  // Re-render with filtered data
  const tempData = filtered;
  grid.innerHTML = tempData.map(book => `
    <div class="book-card" onclick="handleBookClick(${book.id})">
      <div class="book-cover">
        <img
          src="${book.cover}"
          alt="${book.title}"
          loading="lazy"
          onerror="this.src='https://placehold.co/180x220/5D3023/F2E9DC?text=${encodeURIComponent(book.genre)}'"
        />
        <div class="book-cover-overlay">
          <button class="book-quick-add" onclick="event.stopPropagation(); addToLibrary(${book.id})">
            + Tambah ke Library
          </button>
        </div>
        ${book.badge ? `<div style="position:absolute;top:8px;left:8px;padding:3px 8px;border-radius:4px;font-size:0.62rem;font-weight:700;text-transform:uppercase;background:${book.badge === 'Gratis' ? '#2d8a3e' : book.badge === 'New' ? '#5D3023' : '#C08552'};color:white;">${book.badge}</div>` : ''}
      </div>
      <div class="book-info">
        <span class="book-genre-tag">${book.genre}</span>
        <h3 class="book-title">${book.title}</h3>
        <p class="book-author">${book.author}</p>
        <div class="book-meta">
          <div class="book-rating">
            <svg width="13" height="13" viewBox="0 0 24 24" style="fill:var(--terracotta);color:var(--terracotta)"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            ${book.rating}
          </div>
          <span class="book-price ${book.price === 0 ? 'free' : ''}">${formatRupiah(book.price)}</span>
        </div>
        <button class="book-cta" onclick="event.stopPropagation(); ${book.price === 0 ? `addToLibrary(${book.id})` : `buyBook(${book.id})`}">
          ${book.price === 0 ? "Baca Gratis" : "Beli Sekarang"}
        </button>
      </div>
    </div>
  `).join('');
}

/* ================================================
   SEARCH FUNCTIONALITY
   ================================================ */
function initSearch() {
  const input = document.getElementById("heroSearch");
  if (!input) return;

  let debounceTimer;
  input.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const q = input.value.trim().toLowerCase();
      if (q.length < 2) {
        renderBooks();
        return;
      }
      const results = booksData.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.genre.toLowerCase().includes(q)
      );
      const grid = document.getElementById("booksGrid");
      if (!grid) return;

      // Scroll to explore section
      const exploreSection = document.getElementById("explore");
      if (exploreSection) {
        const top = exploreSection.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }

      if (results.length === 0) {
        grid.innerHTML = `
          <div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--copper);">
            <p style="font-family:'Playfair Display',serif;font-size:1rem;color:var(--chocolate);margin-bottom:0.5rem;">Buku tidak ditemukan</p>
            <p style="font-size:0.85rem;">Coba kata kunci yang berbeda.</p>
          </div>
        `;
      } else {
        filterBooks(q); // reuse filter renderer
        renderBooks();  // then re-render (simplified — show all matching)
        grid.innerHTML = results.map(book => `
          <div class="book-card" onclick="handleBookClick(${book.id})">
            <div class="book-cover">
              <img src="${book.cover}" alt="${book.title}" loading="lazy" onerror="this.src='https://placehold.co/180x220/5D3023/F2E9DC?text=Book'"/>
              <div class="book-cover-overlay">
                <button class="book-quick-add" onclick="event.stopPropagation(); addToLibrary(${book.id})">+ Tambah ke Library</button>
              </div>
            </div>
            <div class="book-info">
              <span class="book-genre-tag">${book.genre}</span>
              <h3 class="book-title">${book.title}</h3>
              <p class="book-author">${book.author}</p>
              <div class="book-meta">
                <div class="book-rating">⭐ ${book.rating}</div>
                <span class="book-price ${book.price === 0 ? 'free' : ''}">${formatRupiah(book.price)}</span>
              </div>
              <button class="book-cta" onclick="event.stopPropagation(); ${book.price === 0 ? `addToLibrary(${book.id})` : `buyBook(${book.id})`}">
                ${book.price === 0 ? "Baca Gratis" : "Beli Sekarang"}
              </button>
            </div>
          </div>
        `).join('');
      }
    }, 300);
  });
}

/* ================================================
   SCROLL ANIMATIONS — Intersection Observer
   ================================================ */
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll("[data-animate]").forEach(el => observer.observe(el));

  // Add animate attribute to sections for staggered entry
  const animateSections = document.querySelectorAll(
    ".section-header, .books-grid, .genre-card, .trending-item, .review-card, .community-hero-card, .promo-inner, .upload-card"
  );
  animateSections.forEach((el, i) => {
    el.setAttribute("data-animate", "fade-up");
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    observer.observe(el);
  });
}

/* ================================================
   LUCIDE ICONS INIT
   ================================================ */
function initIcons() {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

/* ================================================
   INIT
   ================================================ */
document.addEventListener("DOMContentLoaded", () => {
  initIcons();
  checkLoginState();
  renderBooks();
  renderTrending();
  initNavbar();
  initHamburger();
  initSmoothScroll();
  initGenreChips();
  initSearch();
  initAnimations();
});
