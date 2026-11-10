import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAward,
  faCalendarCheck,
  faCheck,
  faCopy,
  faGraduationCap,
  faUser,
  faUserDoctor,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { doctor, doctorPortrait } from "../data/doctor";
import { Reveal } from "./Header";

function AnimatedNumber({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const numeric = parseInt(target, 10);
    if (Number.isNaN(numeric)) {
      return;
    }

    const duration = 1400;
    const steps = 30;
    const stepTime = duration / steps;
    const stepVal = numeric / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepVal;
      if (current >= numeric) {
        setCount(numeric);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [started, target]);

  const isNumeric = !Number.isNaN(parseInt(target, 10));
  const displayedValue = isNumeric && started ? count : target;

  return (
    <span ref={elementRef} className="tabular-nums">
      {displayedValue}
      {isNumeric && suffix}
    </span>
  );
}

export function Hero({ t, l }) {
  const whatsappUrl = `https://wa.me/${
    doctor.contact.whatsappNumber
  }?text=${encodeURIComponent(t("whatsapp.greeting"))}`;

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-white to-white pt-24 pb-16 md:pt-32 md:pb-24 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950"
    >
      {/* Background Soft Glow */}
      <div
        className="pointer-events-none absolute -top-24 end-0 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-900/15"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 -start-20 h-80 w-80 rounded-full bg-teal-100/40 blur-3xl dark:bg-teal-950/20"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left Column: Hero Texts & CTA */}
          <Reveal>
            <div className="flex items-center gap-3">
              <span
                className="h-0.5 w-7 rounded-full bg-brand-600 dark:bg-brand-400"
                aria-hidden="true"
              />
              <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-700 dark:text-brand-300">
                {t("hero.kicker")}
              </span>
            </div>

            <h1 className="mt-4 font-serif text-4xl font-extrabold tracking-tight text-navy-900 sm:text-5xl lg:text-6xl dark:text-white">
              {t("hero.name")}
            </h1>

            <p className="mt-3 text-lg font-bold text-brand-600 sm:text-xl dark:text-brand-400">
              {t("hero.taglineSub")}
            </p>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
              {t("hero.tagline")}
            </p>

            {/* CTAs: Primary + Direct Consultation CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#about"
                className="inline-flex items-center gap-2.5 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-600/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-brand-600/40 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:shadow-brand-900/40"
              >
                <FontAwesomeIcon icon={faUser} className="text-xs" />
                {t("hero.ctaAbout")}
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-50/80 px-6 py-3.5 text-sm font-bold text-emerald-800 shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-600 hover:text-white hover:shadow-emerald-600/30 focus:outline-none dark:border-emerald-500/40 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-600 dark:hover:text-white"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500 text-xs text-white">
                  <FontAwesomeIcon icon={faCalendarCheck} />
                </span>
                {t("hero.ctaIntro")}
              </a>
            </div>
          </Reveal>

          {/* Right Column: Doctor Portrait with Curved Sweep Graphic */}
          <Reveal delay={150}>
            <div className="relative mx-auto flex w-full max-w-[440px] items-center justify-center">
              {/* Teal Curved Sweep Decorative Shape */}
              <div
                className="absolute -inset-2 -rotate-3 rounded-[3rem] bg-gradient-to-tr from-brand-600 via-teal-500 to-emerald-400 opacity-90 shadow-2xl shadow-brand-600/25 transition-transform duration-500 group-hover:rotate-0 dark:from-brand-700 dark:via-teal-600 dark:to-emerald-600"
                aria-hidden="true"
              />

              {/* Light offset curve behind */}
              <div
                className="absolute inset-0 rotate-3 rounded-[3rem] bg-brand-100 dark:bg-slate-800/80"
                aria-hidden="true"
              />

              {/* Doctor Image Container */}
              <div className="relative overflow-hidden rounded-[2.8rem] border-4 border-white bg-slate-100 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                <img
                  src={doctorPortrait}
                  alt={l(doctor.personal.displayName)}
                  className="aspect-[4/5] w-full object-cover object-top transition duration-500 hover:scale-105"
                  loading="eager"
                  fetchPriority="high"
                />

                {/* Floating Badge on Doctor's Photo */}
                <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/60 bg-white/95 p-4 shadow-lg backdrop-blur-md dark:border-slate-700/60 dark:bg-slate-900/90">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-400">
                      <FontAwesomeIcon
                        icon={faUserDoctor}
                        className="text-lg"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-navy-900 dark:text-white">
                        {t("hero.name")}
                      </p>
                      <p className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                        {t("hero.title")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Floating Stats Bar with Animated Counter */}
        <Reveal delay={250}>
          <div className="mt-16 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/50 md:mt-20 md:p-8 dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-none">
            <div className="grid grid-cols-2 gap-6 divide-y divide-slate-100 sm:grid-cols-4 sm:divide-y-0 sm:divide-x sm:divide-slate-100 rtl:sm:divide-x-reverse dark:divide-slate-800">
              {doctor.stats.map((item, idx) => {
                const icons = [faUserDoctor, faUsers, faGraduationCap, faAward];
                const icon = icons[idx % icons.length];
                const localizedValue = l(item.value);
                const hasPlus = localizedValue.endsWith("+");
                const cleanValue = hasPlus
                  ? localizedValue.replace("+", "")
                  : localizedValue;

                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center pt-4 text-center sm:pt-0 sm:px-4"
                  >
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600 shadow-inner dark:bg-brand-950/50 dark:text-brand-400">
                      <FontAwesomeIcon icon={icon} className="text-lg" />
                    </div>
                    <span className="mt-3.5 font-serif text-2xl font-extrabold text-navy-900 sm:text-3xl dark:text-white">
                      <AnimatedNumber
                        target={cleanValue}
                        suffix={hasPlus ? "+" : ""}
                      />
                    </span>
                    <span className="mt-1 text-xs font-bold text-slate-500 uppercase tracking-wide dark:text-slate-400">
                      {l(item.label)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function AboutMeSection({ t, l, lang }) {
  const [copiedType, setCopiedType] = useState(null);

  const handleCopy = (text, type) => {
    navigator.clipboard?.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <section
      id="about"
      className="relative scroll-mt-20 bg-white py-16 md:py-24 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Column 1: Clinic / Stethoscope Photo with Curved teal shape */}
          <div className="lg:col-span-4">
            <Reveal>
              <div className="relative mx-auto max-w-sm">
                <div
                  className="absolute -inset-2 -rotate-3 rounded-[2.5rem] bg-gradient-to-tr from-brand-600 to-teal-400 opacity-80 blur-sm dark:opacity-60"
                  aria-hidden="true"
                />
                <div className="relative overflow-hidden rounded-[2.2rem] border-4 border-white bg-slate-100 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                  <img
                    src={`${import.meta.env.BASE_URL}images/hero.webp`}
                    alt="Medical Stethoscope and Consultation Desk"
                    className="aspect-[4/5] w-full object-cover"
                    loading="lazy"
                  />
                  {/* Subtle inner overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 inset-x-4 rounded-xl bg-white/90 p-3 text-center backdrop-blur dark:bg-slate-900/90">
                    <p className="text-xs font-bold text-brand-700 dark:text-brand-300">
                      General Practice & Primary Care
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Column 2: Editorial & Biography */}
          <div className="lg:col-span-5">
            <Reveal delay={100}>
              <div className="flex items-center gap-2">
                <span className="h-0.5 w-6 rounded-full bg-brand-600" />
                <span className="text-xs font-black uppercase tracking-[0.2em] text-brand-700 dark:text-brand-400">
                  {t("aboutSection.kicker")}
                </span>
              </div>
              <h2 className="mt-3 font-serif text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl lg:text-4xl lg:leading-snug dark:text-white">
                {t("aboutSection.headline")}
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                {t("aboutSection.bio1")}
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                {t("aboutSection.bio2")}
              </p>
              <div className="mt-6">
                <a
                  href="#experience"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-brand-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-brand-600/35 dark:shadow-brand-900/30"
                >
                  {t("aboutSection.learnMore")}
                  <span className="text-base transition-transform group-hover:translate-x-1 rtl:rotate-180">
                    →
                  </span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Column 3: Signature & Personal Info Card */}
          <div className="lg:col-span-3">
            <Reveal delay={200}>
              <div className="rounded-3xl border border-slate-200/90 bg-slate-50/70 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
                {/* Handwritten Cursive Signature */}
                <div className="border-b border-slate-200/80 pb-5 text-center dark:border-slate-800">
                  <p className="font-signature text-3xl text-brand-700 dark:text-brand-300">
                    {t("aboutSection.signature")}
                  </p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {t("hero.title")}
                  </p>
                </div>

                {/* Personal Details List */}
                <ul className="mt-5 space-y-4 text-xs">
                  <li>
                    <span className="block font-bold text-slate-400 uppercase tracking-wider dark:text-slate-500">
                      {t("aboutSection.degreeLabel")}
                    </span>
                    <span className="mt-1 block text-[13px] font-semibold text-navy-900 dark:text-white">
                      {t("aboutSection.degreeValue")}
                    </span>
                  </li>
                  <li>
                    <span className="block font-bold text-slate-400 uppercase tracking-wider dark:text-slate-500">
                      {t("aboutSection.locationLabel")}
                    </span>
                    <span className="mt-1 block text-[13px] font-semibold text-navy-900 dark:text-white">
                      {t("aboutSection.locationValue")}
                    </span>
                  </li>
                  <li>
                    <div className="flex items-center justify-between">
                      <span className="block font-bold text-slate-400 uppercase tracking-wider dark:text-slate-500">
                        {t("hero.email")}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(doctor.contact.email, "email")
                        }
                        className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-bold text-brand-600 hover:bg-brand-50 dark:text-brand-400 dark:hover:bg-slate-800"
                        title={t("hero.copy")}
                      >
                        <FontAwesomeIcon
                          icon={copiedType === "email" ? faCheck : faCopy}
                        />
                        {copiedType === "email"
                          ? t("hero.copied")
                          : t("hero.copy")}
                      </button>
                    </div>
                    <a
                      href={`mailto:${doctor.contact.email}`}
                      className="mt-1 block break-all text-[13px] font-semibold text-brand-700 hover:underline dark:text-brand-400"
                    >
                      {doctor.contact.email}
                    </a>
                  </li>
                  <li>
                    <div className="flex items-center justify-between">
                      <span className="block font-bold text-slate-400 uppercase tracking-wider dark:text-slate-500">
                        {t("hero.phone")}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(doctor.contact.phone, "phone")
                        }
                        className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-bold text-brand-600 hover:bg-brand-50 dark:text-brand-400 dark:hover:bg-slate-800"
                        title={t("hero.copy")}
                      >
                        <FontAwesomeIcon
                          icon={copiedType === "phone" ? faCheck : faCopy}
                        />
                        {copiedType === "phone"
                          ? t("hero.copied")
                          : t("hero.copy")}
                      </button>
                    </div>
                    <a
                      href={doctor.contact.phoneHref}
                      dir="ltr"
                      style={{ textAlign: lang === "ar" ? "right" : "left" }}
                      className="mt-1 block text-[13px] font-semibold text-navy-900 hover:text-brand-600 dark:text-white dark:hover:text-brand-400"
                    >
                      {doctor.contact.phone}
                    </a>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
