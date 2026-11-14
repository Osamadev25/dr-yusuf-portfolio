import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faMoon,
  faSun,
  faUserDoctor,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { doctor } from "../data/doctor";
import { navigation } from "../data/navigation";
import { languages } from "../i18n/translations";

const desktopNavigationIds = [
  "hero",
  "about",
  "services",
  "experience",
  "education",
  "research",
  "contact",
];
const desktopNavigation = navigation.filter((item) =>
  desktopNavigationIds.includes(item.id),
);
const mobileNavigation = navigation;

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
  const menuButtonRef = useRef(null);
  const wasOpenRef = useRef(false);
  const brandName = l(doctor.personal.displayName);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const sections = mobileNavigation.map((n) =>
        document.getElementById(n.id),
      );
      const scrollPos = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(mobileNavigation[i].id);
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
    if (!open && wasOpenRef.current) menuButtonRef.current?.focus();
    wasOpenRef.current = open;
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
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white dark:focus:bg-brand-700"
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
        <div className="mx-auto flex h-20 max-w-screen-2xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <a
            href="#hero"
            className="group flex min-w-0 items-center gap-2.5 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 sm:gap-3.5"
            onClick={() => setOpen(false)}
          >
            {/* Medical doctor emblem */}
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-teal-700 text-white shadow-md shadow-brand-600/20 transition-transform duration-200 group-hover:scale-105">
              <FontAwesomeIcon
                icon={faUserDoctor}
                className="h-5 w-5"
                aria-hidden="true"
              />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="block truncate text-base font-extrabold tracking-tight text-navy-900 transition dark:text-white sm:hidden">
                {t("navigation.brand")}
              </span>
              <span className="hidden truncate text-base font-extrabold tracking-tight text-navy-900 transition dark:text-white sm:block sm:text-lg">
                {brandName}
              </span>
              <span className="mt-1 hidden truncate text-[9px] font-bold uppercase tracking-[0.08em] text-brand-700 dark:text-brand-300 sm:block sm:text-[10px]">
                {t("navigation.brandSub")}
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav
            className="hidden items-center gap-1 xl:flex 2xl:gap-2"
            aria-label={t("navigation.primaryLabel")}
          >
            {desktopNavigation.map((item) => {
              const active = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={active ? "location" : undefined}
                  className={`relative px-2.5 py-1.5 text-xs font-semibold transition-colors duration-150 xl:text-xs 2xl:px-3.5 2xl:py-2 2xl:text-sm ${
                    active
                      ? "text-brand-700 dark:text-brand-400"
                      : "text-slate-600 hover:text-navy-900 dark:text-slate-300 dark:hover:text-white"
                  }`}
                >
                  {l(item.label)}
                  {active && (
                    <span
                      className="absolute inset-x-2.5 -bottom-1 h-0.5 rounded-full bg-brand-600 dark:bg-brand-400 2xl:inset-x-3.5"
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
                        : "text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
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
              ref={menuButtonRef}
              className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900 xl:hidden"
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
          className={`overflow-hidden border-slate-200 bg-white transition-[max-height,border-width] duration-300 dark:border-slate-800 dark:bg-slate-950 xl:hidden ${
            open ? "max-h-[80vh] overflow-y-auto border-t" : "max-h-0"
          }`}
          aria-hidden={!open}
        >
          <nav
            className="mx-auto grid max-w-7xl gap-1 px-4 py-4 sm:px-6"
            aria-label={t("navigation.mobileLabel")}
          >
            {mobileNavigation.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={activeSection === item.id ? "location" : undefined}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  activeSection === item.id
                    ? "bg-brand-50 text-brand-700 dark:bg-slate-900 dark:text-brand-400"
                    : "text-slate-700 hover:bg-slate-50 hover:text-brand-700 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
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
          className="fixed inset-0 z-40 cursor-default bg-navy-950/25 2xl:hidden"
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
          className={`inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-brand-700 dark:text-brand-400 ${
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

export function Reveal({ children, delay = 0, immediate = false }) {
  const elementRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(immediate);

  useLayoutEffect(() => {
    if (immediate) {
      setVisible(true);
      return undefined;
    }

    const element = elementRef.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      return undefined;
    }

    const reducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (reducedMotion || element.getBoundingClientRect().top <= window.innerHeight) {
      setVisible(true);
      return undefined;
    }

    setReady(true);
    try {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          setVisible(true);
          observer.unobserve(element);
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
      );

      observer.observe(element);
      return () => observer.disconnect();
    } catch {
      setReady(false);
      return undefined;
    }
  }, [immediate]);

  return (
    <div
      ref={elementRef}
      className={`reveal min-w-0${ready ? " reveal-ready" : ""}${visible ? " is-visible" : ""}`}
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}
