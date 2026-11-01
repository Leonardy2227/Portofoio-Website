"use client";

import { useEffect, useState } from "react";
import "./navbar.css";

type Theme = "dark" | "light";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  // Inisialisasi tema dan deteksi scroll.
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const initialTheme: Theme =
      savedTheme === "light" ? "light" : "dark";

    document.documentElement.dataset.theme = initialTheme;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Jalankan pemeriksaan awal setelah browser siap.
    const frame = window.requestAnimationFrame(() => {
      setTheme(initialTheme);
      setMounted(true);
      handleScroll();
    });

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Mengunci scroll halaman saat menu terbuka.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Mengganti tema dan menyimpannya.
  function changeTheme(newTheme: Theme) {
    setTheme(newTheme);
    setMounted(true);

    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem("theme", newTheme);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <a href="#home" className="logo" onClick={closeMenu}>
          Portofolio <span>Leo.</span>
        </a>

        <button
          type="button"
          className={`menu-toggle ${isOpen ? "active" : ""}`}
          onClick={() => setIsOpen((current) => !current)}
          aria-label={
            isOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={isOpen}
          aria-controls="navigation-panel"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div
        className={`menu-backdrop ${isOpen ? "visible" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <aside
        id="navigation-panel"
        className={`menu-panel ${isOpen ? "open" : ""}`}
        aria-label="Navigation menu"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="menu-panel-header">
          <span className="menu-eyebrow">
            MENU / NAVIGATION
          </span>

          <button
            type="button"
            className="menu-close"
            onClick={closeMenu}
            aria-label="Close navigation menu"
          >
            ×
          </button>
        </div>

        <div className="menu-navigation">
          {navItems.map((item, index) => (
            <a
              href={item.href}
              className="menu-link"
              key={item.href}
              onClick={closeMenu}
              style={
                { "--item-index": index } as React.CSSProperties
              }
            >
              <span className="menu-link-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="menu-link-label">
                {item.label}
              </span>

              <span className="menu-link-arrow">↗</span>
            </a>
          ))}
        </div>

        <div className="menu-bottom">
          <span className="menu-eyebrow">
            APPEARANCE / TEMA
          </span>

          <div className="theme-switch">
            <button
              type="button"
              className={`theme-option ${
                mounted && theme === "light" ? "selected" : ""
              }`}
              onClick={() => changeTheme("light")}
              aria-pressed={mounted && theme === "light"}
            >
              <span className="theme-icon">☀</span>
              <span>Light</span>
            </button>

            <button
              type="button"
              className={`theme-option ${
                mounted && theme === "dark" ? "selected" : ""
              }`}
              onClick={() => changeTheme("dark")}
              aria-pressed={mounted && theme === "dark"}
            >
              <span className="theme-icon">☾</span>
              <span>Dark</span>
            </button>
          </div>

          <p className="menu-footer-text">
            Designed &amp; built by Leonnzz.
          </p>
        </div>
      </aside>
    </>
  );
}