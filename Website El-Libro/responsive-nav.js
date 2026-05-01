(function () {
  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  ready(function () {
    const nav = document.querySelector(".elibro-navbar, .navbar");
    const button = document.getElementById("elibroHamburger") || document.getElementById("hamburger") || document.querySelector(".elibro-hamburger, .hamburger");
    const menu = document.getElementById("elibroMobileMenu") || document.getElementById("mobileMenu") || document.querySelector(".elibro-mobile-menu, .mobile-menu");

    if (nav && !nav.dataset.responsiveReady) {
      nav.dataset.responsiveReady = "true";
      const syncScroll = function () {
        nav.classList.toggle("scrolled", window.scrollY > 20);
      };
      syncScroll();
      window.addEventListener("scroll", syncScroll, { passive: true });
    }

    
    function removeBlockedMobileLinks() {
      const blocked = /^(community|sign\s*in|my\s*account)$/i;
      document.querySelectorAll(".mobile-menu a, .elibro-mobile-menu a, .mobile-nav a, .elibro-mobile-nav a").forEach(function (link) {
        if (blocked.test((link.textContent || "").trim()) || link.classList.contains("mobile-signin") || link.classList.contains("elibro-mobile-signin")) {
          link.remove();
        }
      });
    }

    removeBlockedMobileLinks();
    if (!button || !menu || button.dataset.responsiveReady) return;

    button.dataset.responsiveReady = "true";
    if (!menu.id) menu.id = "elibroMobileMenu";
    button.setAttribute("aria-controls", menu.id);
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Toggle menu");
    menu.setAttribute("aria-hidden", "true");

    function setMenu(open) {
      menu.classList.toggle("open", open);
      button.classList.toggle("open", open);
      button.setAttribute("aria-expanded", String(open));
      button.setAttribute("aria-label", open ? "Close menu" : "Toggle menu");
      menu.setAttribute("aria-hidden", String(!open));
      document.body.classList.toggle("menu-open", open);
      document.body.classList.toggle("elibro-menu-open", open);
      document.body.style.overflow = open ? "hidden" : "";
    }

    button.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      setMenu(!menu.classList.contains("open"));
    }, true);

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });

    menu.addEventListener("click", function (event) {
      if (event.target === menu) setMenu(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menu.classList.contains("open")) {
        setMenu(false);
        button.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900 && menu.classList.contains("open")) setMenu(false);
    }, { passive: true });
  });
})();



