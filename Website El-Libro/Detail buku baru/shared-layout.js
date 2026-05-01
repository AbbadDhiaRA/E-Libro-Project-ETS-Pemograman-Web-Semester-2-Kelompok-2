(function () {
    const p = decodeURIComponent(location.pathname).replace(/\\/g, "/"),
        prefix =
            p.includes("/Homepage/") ||
                p.includes("/Detail Book/") ||
                p.includes("/Detail buku baru/")
                ? "../"
                : "";
    const bookIcon =
        '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="38" height="38" aria-hidden="true"><path d="M24 38 C24 38 10 33 7 15 L7 10 C7 10 17 13 24 22" stroke="#5D3023" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><line x1="24" y1="22" x2="35" y2="14" stroke="#C08552" stroke-width="1.8" stroke-linecap="round"/><line x1="24" y1="25" x2="36" y2="17" stroke="#C08552" stroke-width="1.8" stroke-linecap="round"/><line x1="24" y1="28" x2="37" y2="21" stroke="#C08552" stroke-width="1.8" stroke-linecap="round"/><rect x="38" y="10" width="3" height="3" rx=".5" fill="#895737" opacity=".8"/></svg>';
    const svg = {
        search:
            '<svg class="elibro-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>',
        users:
            '<svg class="elibro-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>',
        about:
            '<svg class="elibro-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="14" x="3" y="5" rx="2"></rect><path d="M7 9h4"></path><circle cx="16" cy="12" r="2"></circle></svg>',
        library:
            '<svg class="elibro-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m16 6 4 14"></path><path d="M12 6v14"></path><path d="M8 8v12"></path><path d="M4 4v16"></path></svg>',
        cart: '<svg class="elibro-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57L22 7H5.12"></path></svg>',
    };
    function l(x) {
        return prefix + x;
    }
    function active(x) {
        const s = p.toLowerCase();
        return (x === "explore" && s.endsWith("/explore.html")) ||
            (x === "library" && s.endsWith("/mylibrary.html")) ||
            (x === "cart" && s.includes("keranjang")) ||
            (x === "about" && s.includes("/about us/"))
            ? "active"
            : "";
    }
    function injectNavbar() {
        if (
            document.querySelector(".elibro-navbar") ||
            document.querySelector(".navbar")
        )
            return;
        const h = document.createElement("header");
        h.className = "elibro-navbar";
        h.innerHTML =
            '<div class="elibro-nav-container"><a href="' +
            l("Homepage/Homepage.html") +
            '" class="elibro-nav-logo"><div class="elibro-logo-icon">' +
            bookIcon +
            '</div><div class="elibro-logo-text"><span class="elibro-logo-name">E-Libro</span><span class="elibro-logo-sub">E-book store</span></div></a><nav class="elibro-nav-links"><a href="' +
            l("Explore.html") +
            '" class="elibro-nav-link ' +
            active("explore") +
            '">' +
            svg.search +
            ' Explore Books</a><a href="' +
            l("About Us/about.html") +
            '" class="elibro-nav-link ' +
            active("about") +
            '">' +
            svg.about +
            ' About Us</a><a href="' +
            l("mylibrary.html") +
            '" class="elibro-nav-link ' +
            active("library") +
            '">' +
            svg.library +
            ' My Library</a><a href="' +
            l("Keranjang E-Libro web.html") +
            '" class="elibro-nav-link ' +
            active("cart") +
            '">' +
            svg.cart +
            ' Keranjang</a></nav><div class="elibro-nav-account"><div id="elibroAuthGuest"><a href="' +
            l("Login Page/Login Page.html") +
            '" class="elibro-btn-login">Sign In</a></div><div id="elibroAuthUser" class="elibro-auth-user"><div class="elibro-user-avatar"><span id="elibroUserInitial">U</span></div><span id="elibroUserName" class="elibro-user-name">User</span></div></div><button class="elibro-hamburger" id="elibroHamburger" aria-label="Toggle menu"><span></span><span></span><span></span></button></div>';
        document.body.prepend(h);
        const m = document.createElement("div");
        m.className = "elibro-mobile-menu";
        m.id = "elibroMobileMenu";
        m.innerHTML =
            '<nav class="elibro-mobile-nav"><a href="' +
            l("Explore.html") +
            '" class="elibro-mobile-link">Explore Books</a><a href="' +
            l("About Us/about.html") +
            '" class="elibro-mobile-link">About Us</a><a href="' +
            l("mylibrary.html") +
            '" class="elibro-mobile-link">My Library</a><a href="' +
            l("Keranjang E-Libro web.html") +
            '" class="elibro-mobile-link">Keranjang</a></nav>';
        h.after(m);
    }
    function injectFooter() {
        if (
            document.querySelector(".elibro-footer") ||
            document.querySelector(".footer")
        )
            return;
        const f = document.createElement("footer");
        f.className = "elibro-footer";
        f.innerHTML =
            '<div class="elibro-footer-container"><div class="elibro-footer-ornament"><span class="elibro-ornament-line"></span>' +
            bookIcon +
            '<span class="elibro-ornament-line"></span></div><div class="elibro-footer-about"><div class="elibro-footer-logo-wrap"><span class="elibro-footer-logo-name">E-Libro</span><span class="elibro-footer-logo-sub">E-book store</span></div><p class="elibro-footer-about-text">E-Libro adalah platform literasi digital premium Indonesia yang hadir untuk mendekatkan pembaca dengan buku-buku terbaik dunia.</p><div class="elibro-footer-stats-row"><div class="elibro-f-stat"><span class="elibro-f-stat-num">10K+</span><span class="elibro-f-stat-label">Judul Buku</span></div><div class="elibro-f-stat-dot"></div><div class="elibro-f-stat"><span class="elibro-f-stat-num">50K+</span><span class="elibro-f-stat-label">Pembaca Aktif</span></div><div class="elibro-f-stat-dot"></div><div class="elibro-f-stat"><span class="elibro-f-stat-num">1.2K+</span><span class="elibro-f-stat-label">Penulis Indie</span></div></div></div><div class="elibro-footer-bottom"><p>Â© 2025 E-Libro. Semua hak dilindungi undang-undang.</p><div class="elibro-footer-bottom-links"><a href="' +
            l("Privasi, Ketentuan, About Us/Privasi.html") +
            '">Privasi</a><a href="' +
            l("Privasi, Ketentuan, About Us/Ketentuan.html") +
            '">Ketentuan</a><a href="' +
            l("About Us/about.html") +
            '">About Us</a></div></div></div>';
        document.body.appendChild(f);
    }
    function initNav() {
        const n =
            document.querySelector(".elibro-navbar") ||
            document.querySelector(".navbar");
        if (n)
            window.addEventListener(
                "scroll",
                () => n.classList.toggle("scrolled", scrollY > 20),
                { passive: true },
            );
        const b =
            document.getElementById("elibroHamburger") ||
            document.getElementById("hamburger"),
            m =
                document.getElementById("elibroMobileMenu") ||
                document.getElementById("mobileMenu");
        if (b && m && !b.dataset.elibroReady) {
            b.dataset.elibroReady = "true";
            b.addEventListener("click", () => {
                const o = m.classList.toggle("open");
                b.classList.toggle("open", o);
                document.body.style.overflow = o ? "hidden" : "";
            });
        }
    }
    function login() {
        const raw =
            sessionStorage.getItem("elibro_user") ||
            localStorage.getItem("elibro_user"),
            g =
                document.getElementById("elibroAuthGuest") ||
                document.getElementById("authGuest"),
            u =
                document.getElementById("elibroAuthUser") ||
                document.getElementById("authUser"),
            i =
                document.getElementById("elibroUserInitial") ||
                document.getElementById("userInitial"),
            nm =
                document.getElementById("elibroUserName") ||
                document.getElementById("userNameDisplay");
        if (!g || !u) return;
        if (raw) {
            let x = {};
            try {
                x = JSON.parse(raw);
            } catch (e) {
                x = { name: raw };
            }
            const name = x.name || (x.email || "User").split("@")[0] || "User";
            g.style.display = "none";
            u.style.display = "flex";
            if (i) i.textContent = name[0].toUpperCase();
            if (nm) nm.textContent = name;
        } else {
            g.style.display = "block";
            u.style.display = "none";
        }
    }
    window.elibroNormalizeBook = function (item) {
        const title = item.title || item.judul || item.name || "Buku E-Libro",
            author = item.author || item.penulis || "Penulis E-Libro",
            price =
                Number(
                    item.price ??
                    item.harga ??
                    item.discountPrice ??
                    item.hargaDiskon ??
                    0,
                ) || 0,
            discountPrice =
                Number(
                    item.discountPrice ??
                    item.hargaDiskon ??
                    item.price ??
                    item.harga ??
                    0,
                ) || 0,
            image =
                item.image ||
                item.gambar ||
                item.cover ||
                "https://placehold.co/180x240/5D3023/F2E9DC?text=Book";
        return {
            id: item.id || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            title,
            author,
            price,
            discountPrice,
            image,
            format: item.format || item.tipe || "E-Book",
            quantity: Number(item.quantity) || 1,
            progress: Number(item.progress) || 0,
            detailUrl: item.detailUrl || item.detail || "#",
        };
    };
    window.elibroAddToLibrary = function (items) {
        const incoming = (Array.isArray(items) ? items : [items]).map(
            window.elibroNormalizeBook,
        ),
            lib = JSON.parse(localStorage.getItem("elibroLibrary")) || [];
        incoming.forEach((book) => {
            const old = lib.find((x) => String(x.id) === String(book.id));
            old ? Object.assign(old, book) : lib.push(book);
        });
        localStorage.setItem("elibroLibrary", JSON.stringify(lib));
        return lib;
    };
    document.addEventListener("DOMContentLoaded", () => {
        injectNavbar();
        injectFooter();
        initNav();
        login();
    });
})();

