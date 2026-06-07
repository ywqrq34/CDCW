(function () {
  "use strict";

  function initHeaderScroll() {
    var header = document.getElementById("siteHeader");
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          if (window.scrollY > 50) {
            header.classList.add("scrolled");
          } else {
            header.classList.remove("scrolled");
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  function applySiteConfig() {
    var cfg = window.SITE_CONFIG;
    if (!cfg) return;

    if (cfg.KAKAO_URL && cfg.KAKAO_URL !== "#") {
      document.querySelectorAll("[data-kakao]").forEach(function (a) {
        a.href = cfg.KAKAO_URL;
        a.target = "_blank";
        a.rel = "noopener";
      });
    }

    if (cfg.PHONE) {
      var telHref = "tel:" + cfg.PHONE.replace(/[^0-9+]/g, "");
      document.querySelectorAll("a[data-phone]").forEach(function (a) {
        a.href = telHref;
      });
      document.querySelectorAll("[data-phone-text]").forEach(function (el) {
        el.textContent = cfg.PHONE;
      });
    }
  }

  function initMobileMenu() {
    var btn = document.getElementById("hamburgerBtn");
    var menu = document.getElementById("mobileMenu");
    var closeBtn = document.getElementById("mobileMenuClose");
    var backdrop = document.getElementById("mobileMenuBackdrop");

    if (!btn || !menu) return;

    btn.addEventListener("click", function () {
      menu.classList.add("open");
      if (backdrop) backdrop.classList.add("open");
      document.body.style.overflow = "hidden";
    });

    function closeMenu() {
      menu.classList.remove("open");
      if (backdrop) backdrop.classList.remove("open");
      document.body.style.overflow = "";
    }

    closeBtn.addEventListener("click", closeMenu);
    if (backdrop) backdrop.addEventListener("click", closeMenu);

    menu.querySelectorAll(".mobile-nav-link").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  function initScrollIndicator() {
    var indicator = document.getElementById("scrollDown");
    if (!indicator) return;
    indicator.addEventListener("click", function () {
      var target = document.getElementById("partners");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  function initScrollAnimations() {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".fade-in-up").forEach(function (el) {
      observer.observe(el);
    });
  }

  function initAccordion() {
    document.querySelectorAll(".h-accordion-tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        var item = this.closest(".h-accordion-item");
        var isOpen = item.classList.contains("open");
        document.querySelectorAll(".h-accordion-item").forEach(function (el) {
          el.classList.remove("open");
        });
        if (!isOpen) {
          item.classList.add("open");
        }
      });
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        var href = this.getAttribute("href");
        if (href === "#") return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var headerH = document.getElementById("siteHeader").offsetHeight;
          var top = target.getBoundingClientRect().top + window.pageYOffset - headerH;
          window.scrollTo({ top: top, behavior: "smooth" });
        }
      });
    });
  }

  function init() {
    applySiteConfig();
    initHeaderScroll();
    initMobileMenu();
    initScrollIndicator();
    initScrollAnimations();
    initSmoothScroll();
    initAccordion();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
