import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { doctor, doctorPortrait } from "../data/doctor";
import { Reveal } from "./Header";

export function Hero({ t, l }) {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white pt-16 md:pt-[72px]"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-brand-50 via-brand-50/40 to-transparent"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 md:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-20">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">
            <FontAwesomeIcon
              icon={faPhone}
              className="text-[11px]"
              aria-hidden="true"
            />
            {t("hero.badge")}
          </p>
          <h1 className="mt-5 text-[32px] font-bold leading-[1.2] tracking-tight text-navy-900 sm:text-5xl sm:leading-[1.15]">
            {t("hero.name")}
          </h1>
          <p className="mt-3 text-base font-semibold text-brand-700 sm:text-lg">
            {t("hero.title")}
            <span
              className="mx-2 font-normal text-navy-900/30"
              aria-hidden="true"
            >
              ·
            </span>
            <span className="font-medium text-navy-900/70">
              {t("hero.location")}
            </span>
          </p>
          <p className="mt-1.5 text-[13px] font-medium text-navy-900/50">
            {t("hero.fullName")}
          </p>
          <p className="mt-5 max-w-xl text-[15px] leading-8 text-navy-900/70 sm:text-base">
            {t("hero.tagline")}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-navy-900 px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(11,36,71,0.25)] transition hover:-translate-y-0.5 hover:bg-navy-800"
            >
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-xs"
                aria-hidden="true"
              />
              {t("hero.ctaContact")}
            </a>
            <a
              href="#experience"
              className="inline-flex items-center rounded-xl border border-brand-200 bg-white px-6 py-3 text-sm font-semibold text-navy-900 transition hover:-translate-y-0.5 hover:border-brand-600 hover:text-brand-700"
            >
              {t("hero.ctaExperience")}
            </a>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <a
              href={`mailto:${doctor.contact.email}`}
              className="font-semibold text-brand-700 underline-offset-4 transition hover:text-brand-800 hover:underline"
            >
              {doctor.contact.email}
            </a>
            <span
              className="hidden h-4 w-px bg-brand-200 sm:block"
              aria-hidden="true"
            />
            <a
              href={doctor.contact.phoneHref}
              dir="ltr"
              className="font-semibold text-navy-900/80 transition hover:text-brand-700"
            >
              {doctor.contact.phone}
            </a>
          </div>
          <dl className="mt-8 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
            {[t("hero.factQualification"), t("hero.factLanguages")].map(
              (fact) => (
                <div
                  key={fact}
                  className="rounded-2xl border border-brand-100 bg-brand-50/50 px-4 py-3.5 text-[13px] font-semibold leading-6 text-navy-900"
                >
                  {fact}
                </div>
              ),
            )}
          </dl>
        </Reveal>

        <Reveal delay={140}>
          <div className="relative mx-auto w-full max-w-[400px]">
            <div
              className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-brand-100 via-brand-50 to-white"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[2rem] border-4 border-white bg-brand-50 shadow-[0_24px_60px_-20px_rgba(11,36,71,0.35)]">
              <img
                src={doctorPortrait}
                alt={l(doctor.personal.displayName)}
                className="aspect-[4/5] w-full object-cover object-top"
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/60 bg-white/95 px-5 py-4 shadow-lg backdrop-blur">
                <p className="text-[15px] font-bold text-navy-900">
                  {t("hero.name")}
                </p>
                <p className="mt-0.5 text-[13px] font-semibold text-brand-700">
                  {t("hero.title")}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function About({ t, l }) {
  const stats = [
    {
      value: `${doctor.clinicalTraining.length}`,
      label: t("sections.experience"),
    },
    {
      value: `${doctor.courses.length + doctor.onlineCourses.length}`,
      label: t("sections.courses"),
    },
    {
      value: `${doctor.scientificConferences.length}`,
      label: t("sections.conferences"),
    },
    {
      value: t("sections.toefl"),
      label: t("sections.additionalQualifications"),
    },
  ];
  return (
    <section className="border-y border-brand-100/70 bg-brand-50/50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12 lg:py-16">
        <Reveal>
          <div>
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
              <span
                className="inline-block h-px w-6 bg-brand-600"
                aria-hidden="true"
              />
              {t("sections.about")}
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-snug text-navy-900 sm:text-[28px]">
              {t("sections.aboutTitle")}
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-8 text-navy-900/70">
              {l(doctor.personal.tagline)}
            </p>
            <p className="mt-3 text-sm font-medium text-navy-900/55">
              {l(doctor.contact.location)}
            </p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <dl className="grid grid-cols-2 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-brand-100 bg-white px-4 py-5 text-center shadow-[0_2px_10px_rgba(11,36,71,0.05)]"
              >
                <dt className="order-2 mt-1.5 block text-xs font-semibold leading-5 text-navy-900/55">
                  {s.label}
                </dt>
                <dd className="order-1 text-[22px] font-bold text-navy-900">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
