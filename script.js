(function () {
    "use strict";

    var root = document.documentElement;
    var themeToggle = document.getElementById("themeToggle");

    function applyThemeIcon() {
        if (!themeToggle) return;
        var isDark = root.getAttribute("data-theme") === "dark";
        var icon = themeToggle.querySelector(".theme-icon");
        if (icon) icon.innerHTML = isDark ? "&#9728;" : "&#9790;";
        themeToggle.setAttribute("aria-pressed", String(isDark));
    }

    if (themeToggle) {
        applyThemeIcon();
        themeToggle.addEventListener("click", function () {
            var isDark = root.getAttribute("data-theme") === "dark";
            if (isDark) {
                root.removeAttribute("data-theme");
                try { localStorage.setItem("theme", "light"); } catch (e) {}
            } else {
                root.setAttribute("data-theme", "dark");
                try { localStorage.setItem("theme", "dark"); } catch (e) {}
            }
            applyThemeIcon();
        });
    }

    var navToggle = document.getElementById("navToggle");
    var navLinks = document.getElementById("navLinks");

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", function () {
            var isOpen = navLinks.classList.toggle("is-open");
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("is-open");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    var currentPage = window.location.pathname.split("/").pop() || "homepage.html";
    document.querySelectorAll(".nav-links a").forEach(function (link) {
        var href = link.getAttribute("href");
        if (href === currentPage) {
            link.classList.add("active");
        }
    });

    var revealTargets = document.querySelectorAll(".reveal");
    if (revealTargets.length) {
        if ("IntersectionObserver" in window) {
            var observer = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("is-visible");
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.12 }
            );
            revealTargets.forEach(function (el) { observer.observe(el); });
        } else {
            revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
        }
    }

    var backToTop = document.getElementById("backToTop");
    if (backToTop) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 400) {
                backToTop.classList.add("is-visible");
            } else {
                backToTop.classList.remove("is-visible");
            }
        });
        backToTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
})();
