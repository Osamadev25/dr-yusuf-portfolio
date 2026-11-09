import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faStethoscope,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { navigation } from "../data/navigation";
import { languages } from "../i18n/translations";

export function Header({ lang, setLang, t, l, showResearch = true }) {
  const visibleNavigation = showResearch
    ? navigation
    : navigation.filter((item) => item.id !== "research");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white"
      >
        {t("accessibility.skipToContent")}
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-brand-100 bg-white/95 shadow-[0_1px_12px_rgba(11,36,71,0.08)] backdrop-blur"
            : "border-transparent bg-white/80 backdrop-blur"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 md:h-[72px]">
          <a
            href="#about"
            className="flex items-center gap-3"
            onClick={() => setOpen(false)}
            aria-label={t("navigation.brand")}
          >
            <span
              className="grid h-10 w-10 place-items-center rounded-xl bg-navy-900 text-sm text-white"
              aria-hidden="true"
            >
              <FontAwesomeIcon icon={faStethoscope} />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold text-navy-900">
                {t("navigation.brand")}
              </span>
              <span className="block text-xs font-medium text-brand-700">
                {t("navigation.brandSub")}
              </span>
            </span>
          </a>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Primary"
          >
            {visibleNavigation.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="rounded-lg px-3 py-2 text-sm font-medium text-navy-900/70 transition hover:bg-brand-50 hover:text-brand-700"
              >
                {l(item.label)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div
              className="flex items-center rounded-full border border-brand-100 bg-brand-50/60 p-1"
              role="group"
              aria-label={t("language.select")}
            >
              {Object.values(languages).map((meta) => (
                <button
                  key={meta.code}
                  type="button"
                  onClick={() => setLang(meta.code)}
                  aria-pressed={lang === meta.code}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    lang === meta.code
                      ? "bg-navy-900 text-white shadow-sm"
                      : "text-navy-900/60 hover:text-brand-700"
                  }`}
                >
                  {meta.nativeLabel}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-xl border border-brand-100 text-navy-900 transition hover:bg-brand-50 lg:hidden"
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

        <div
          id="mobile-menu"
          ref={panelRef}
          className={`overflow-hidden border-brand-100 bg-white transition-[max-height,border-width] duration-300 lg:hidden ${
            open ? "max-h-[480px] border-t" : "max-h-0"
          }`}
          aria-hidden={!open}
        >
          <nav
            className="mx-auto grid max-w-6xl gap-1 px-4 py-4 sm:px-6"
            aria-label="Mobile"
          >
            {visibleNavigation.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-navy-900/80 transition hover:bg-brand-50 hover:text-brand-700"
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
          className="fixed inset-0 z-40 cursor-default bg-navy-950/20 lg:hidden"
        />
      )}
    </>
  );
}

export function SectionHeading({ kicker, title, description }) {
  return (
    <div className="max-w-2xl">
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
        <span
          className="inline-block h-px w-6 bg-brand-600"
          aria-hidden="true"
        />
        {kicker}
      </p>
      <h2 className="mt-3 text-2xl font-bold text-navy-900 sm:text-[28px] sm:leading-snug">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-xl text-[15px] leading-7 text-navy-900/65">
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
