import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faMoon,
  faSun,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { navigation } from "../data/navigation";
import { languages } from "../i18n/translations";

export function Header({
  lang,
  setLang,
  t,
  l,
  theme,
  toggleTheme,
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const panelRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const sections = navigation.map((n) => document.getElementById(n.id));
      const scrollPos = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(navigation[i].id);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) panelRef.current?.querySelector("a")?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white dark:focus:bg-brand-600"
      >
        {t("accessibility.skipToContent")}
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/95"
            : "border-b border-transparent bg-white/80 backdrop-blur-sm dark:bg-slate-950/80"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <a
            href="#hero"
            className="group flex items-center gap-3.5 focus:outline-none"
            onClick={() => setOpen(false)}
            aria-label={t("navigation.brand")}
          >
            {/* Medical Serpent & Chalice Emblem */}
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-teal-700 text-white shadow-md shadow-brand-600/20 transition-transform duration-200 group-hover:scale-105">
              <svg
                className="h-6 w-6 fill-none stroke-current"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Chalice */}
                <path d="M7 4h10v3a5 5 0 0 1-5 5 5 5 0 0 1-5-5V4z" />
                <path d="M12 12v7" />
                <path d="M8 19h8" />
                {/* Asclepius Snake wrapping stem */}
                <path
                  d="M10 8c1-1 3-1 3.5 0s0 2.5-1.5 3c-1.5.5-2 1.5-1.5 2.5s2 1.5 2.5 2.5"
                  strokeWidth="1.8"
                />
              </svg>
            </div>
            <div className="leading-none">
              <span className="block text-base font-extrabold tracking-tight text-navy-900 transition dark:text-white sm:text-lg">
                {t("navigation.brand")}
              </span>
              <span className="mt-1 block text-xs font-semibold text-brand-600 dark:text-brand-400">
                {t("navigation.brandSub")}
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav
            className="hidden items-center gap-1 xl:gap-2 lg:flex"
            aria-label="Primary"
          >
            {navigation.map((item) => {
              const active = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative px-3.5 py-2 text-sm font-semibold transition-colors duration-150 ${
                    active
                      ? "text-brand-600 dark:text-brand-400"
                      : "text-slate-600 hover:text-navy-900 dark:text-slate-300 dark:hover:text-white"
                  }`}
                >
                  {l(item.label)}
                  {active && (
                    <span
                      className="absolute inset-x-3.5 -bottom-1 h-0.5 rounded-full bg-brand-600 dark:bg-brand-400"
                      aria-hidden="true"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Controls: Lang & Theme & Mobile Hamburger */}
          <div className="flex items-center gap-2.5">
            {/* Language Switcher Pill */}
            <div
              className="flex items-center rounded-full bg-slate-100 p-1 text-xs font-bold dark:bg-slate-900 dark:border dark:border-slate-800"
              role="group"
              aria-label={t("language.select")}
            >
              {Object.values(languages).map((meta) => {
                const isActive = lang === meta.code;
                return (
                  <button
                    key={meta.code}
                    type="button"
                    onClick={() => setLang(meta.code)}
                    aria-pressed={isActive}
                    className={`rounded-full px-3.5 py-1 transition duration-150 ${
                      isActive
                        ? "bg-white text-brand-700 shadow-sm dark:bg-slate-800 dark:text-brand-300"
                        : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                    }`}
                  >
                    {meta.nativeLabel}
                  </button>
                );
              })}
            </div>

            {/* Dark Mode Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="grid h-9 w-9 place-items-center rounded-full border border-slate-200/80 bg-white text-slate-600 transition hover:bg-slate-100 hover:text-navy-900 dark:border-slate-800 dark:bg-slate-900 dark:text-amber-300 dark:hover:bg-slate-800"
              aria-label={
                theme === "dark"
                  ? t("theme.switchToLight")
                  : t("theme.switchToDark")
              }
              title={
                theme === "dark"
                  ? t("theme.switchToLight")
                  : t("theme.switchToDark")
              }
            >
              <FontAwesomeIcon
                icon={theme === "dark" ? faSun : faMoon}
                className="text-xs transition-transform duration-200 hover:rotate-12"
                aria-hidden="true"
              />
            </button>

            {/* Mobile Hamburger */}
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={
                open ? t("navigation.closeMenu") : t("navigation.openMenu")
              }
              onClick={() => setOpen((v) => !v)}
            >
              <FontAwesomeIcon
                icon={open ? faXmark : faBars}
                className="text-base"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          id="mobile-menu"
          ref={panelRef}
          className={`overflow-hidden border-slate-200 bg-white transition-[max-height,border-width] duration-300 dark:border-slate-800 dark:bg-slate-950 lg:hidden ${
            open ? "max-h-[500px] border-t" : "max-h-0"
          }`}
          aria-hidden={!open}
        >
          <nav
            className="mx-auto grid max-w-7xl gap-1 px-4 py-4 sm:px-6"
            aria-label="Mobile"
          >
            {navigation.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  activeSection === item.id
                    ? "bg-brand-50 text-brand-700 dark:bg-slate-900 dark:text-brand-400"
                    : "text-slate-700 hover:bg-slate-50 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
                }`}
              >
                {l(item.label)}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {open && (
        <button
          type="button"
          aria-label={t("navigation.closeMenu")}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 cursor-default bg-navy-950/25 lg:hidden"
        />
      )}
    </>
  );
}

export function SectionHeading({ kicker, title, description, centered = false }) {
  return (
    <div className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      {kicker && (
        <p
          className={`inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400 ${
            centered ? "justify-center" : ""
          }`}
        >
          <span
            className="inline-block h-0.5 w-6 rounded-full bg-brand-600 dark:bg-brand-400"
            aria-hidden="true"
          />
          {kicker}
        </p>
      )}
      <h2 className="mt-2.5 font-serif text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl lg:text-[34px] lg:leading-tight dark:text-white">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-[15px] leading-relaxed text-slate-600 dark:text-slate-400">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ "--reveal-delay": `${delay}ms` }}
      className={`reveal ${visible ? "is-visible" : ""}`}
    >
      {children}
    </div>
  );
}
