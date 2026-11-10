import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faCheck,
  faCopy,
  faEnvelope,
  faLocationDot,
  faPaperPlane,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { doctor } from "../data/doctor";
import { Reveal, SectionHeading } from "./Header";

export function ContactConnectBanner({ t }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 py-16 text-white sm:py-20">
      {/* Background Subtle ECG / Pulse Wave SVG with real CSS animation */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-25"
        aria-hidden="true"
      >
        <svg
          className="h-44 w-full stroke-teal-400 fill-none"
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          <path
            className="ecg-animated-path"
            d="M0,75 L300,75 L330,75 L345,20 L360,135 L375,45 L390,95 L405,75 L700,75 L730,75 L745,15 L760,140 L775,40 L790,95 L805,75 L1200,75"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 text-center sm:px-6 md:flex-row md:text-start lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-brand-600/30 text-2xl text-teal-300 ring-1 ring-teal-400/30">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-300">
              {t("sections.contact")}
            </span>
            <h2 className="mt-1 font-serif text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
              {t("bannerSection.title")}
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-xl">
              {t("bannerSection.subtitle")}
            </p>
          </div>
        </div>

        <a
          href="#contact-form"
          className="inline-flex shrink-0 items-center gap-3 rounded-full bg-teal-500 px-8 py-4 text-sm font-bold text-navy-950 shadow-lg shadow-teal-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal-400 hover:shadow-teal-400/35 focus:outline-none"
        >
          {t("bannerSection.cta")}
          <span className="text-base rtl:rotate-180">→</span>
        </a>
      </div>
    </section>
  );
}

export function Contact({ t, l }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [copiedType, setCopiedType] = useState(null);

  const handleCopy = (text, type) => {
    navigator.clipboard?.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Website inquiry from ${name || "a visitor"}`
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:${doctor.contact.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 bg-slate-50/70 py-16 md:py-24 dark:bg-slate-900/40"
    >
      <div id="contact-form" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            kicker={t("sections.contact")}
            title={t("sections.contactTitle")}
            description={t("sections.contactIntro")}
          />
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Direct Info Cards with Quick Copy Buttons */}
          <div className="lg:col-span-5 space-y-4">
            <Reveal>
              <div className="group flex items-center justify-between rounded-3xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
                <a
                  href={`mailto:${doctor.contact.email}`}
                  className="flex items-center gap-4 min-w-0 flex-1"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-950/60 dark:text-brand-400">
                    <FontAwesomeIcon icon={faEnvelope} className="text-base" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                      {t("hero.email")}
                    </span>
                    <span className="mt-0.5 block break-all text-sm font-bold text-navy-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
                      {doctor.contact.email}
                    </span>
                  </span>
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy(doctor.contact.email, "email")}
                  className="ms-2 inline-flex shrink-0 items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
                  title={t("hero.copy")}
                >
                  <FontAwesomeIcon icon={copiedType === "email" ? faCheck : faCopy} />
                  <span>{copiedType === "email" ? t("hero.copied") : t("hero.copy")}</span>
                </button>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <div className="group flex items-center justify-between rounded-3xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
                <a
                  href={doctor.contact.phoneHref}
                  className="flex items-center gap-4 min-w-0 flex-1"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-950/60 dark:text-brand-400">
                    <FontAwesomeIcon icon={faPhone} className="text-base" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                      {t("hero.phone")}
                    </span>
                    <span
                      className="mt-0.5 block text-sm font-bold text-navy-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400"
                      dir="ltr"
                    >
                      {doctor.contact.phone}
                    </span>
                  </span>
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy(doctor.contact.phone, "phone")}
                  className="ms-2 inline-flex shrink-0 items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
                  title={t("hero.copy")}
                >
                  <FontAwesomeIcon icon={copiedType === "phone" ? faCheck : faCopy} />
                  <span>{copiedType === "phone" ? t("hero.copied") : t("hero.copy")}</span>
                </button>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="flex items-center gap-4 rounded-3xl border border-slate-200/90 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-400">
                  <FontAwesomeIcon icon={faLocationDot} className="text-base" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                    {t("hero.location")}
                  </span>
                  <span className="mt-0.5 block text-sm font-bold text-navy-900 dark:text-white">
                    {l(doctor.contact.location)}
                  </span>
                </span>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                    {t("contactForm.name")}
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      autoComplete="name"
                      placeholder={t("contactForm.namePlaceholder")}
                      className="rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3.5 text-sm font-medium text-navy-900 outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-brand-600 focus:bg-white focus:ring-4 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-brand-500 dark:focus:ring-brand-950"
                    />
                  </label>
                  <label className="grid gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                    {t("contactForm.email")}
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      dir="ltr"
                      placeholder="name@mail.com"
                      className="rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3.5 text-sm font-medium text-navy-900 outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-brand-600 focus:bg-white focus:ring-4 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-brand-500 dark:focus:ring-brand-950"
                    />
                  </label>
                </div>

                <label className="mt-5 grid gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                  {t("contactForm.message")}
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={4}
                    placeholder={t("contactForm.messagePlaceholder")}
                    className="resize-y rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3.5 text-sm font-medium text-navy-900 outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-brand-600 focus:bg-white focus:ring-4 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-brand-500 dark:focus:ring-brand-950"
                  />
                </label>

                <button
                  type="submit"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-4 text-sm font-bold text-white shadow-md shadow-brand-600/30 transition-all duration-200 hover:bg-brand-700 hover:shadow-brand-600/40 focus:outline-none dark:shadow-brand-900/40"
                >
                  <FontAwesomeIcon icon={faPaperPlane} className="text-xs" />
                  {t("contactForm.sendViaEmail")}
                </button>

                <p className="mt-3 text-center text-xs text-slate-400 dark:text-slate-500">
                  {t("contactForm.note")}
                </p>

                {sent && (
                  <p
                    role="status"
                    className="mt-3 rounded-2xl bg-brand-50 px-4 py-3 text-center text-xs font-bold text-brand-700 dark:bg-brand-950/60 dark:text-brand-300"
                  >
                    {t("contactForm.success")}
                  </p>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer({ t }) {
  return (
    <footer className="border-t border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-xs text-slate-500 sm:flex-row sm:px-6 lg:px-8 dark:text-slate-400">
        <p className="font-semibold">
          © {new Date().getFullYear()} {t("navigation.brand")} — {t("footer.rights")}
        </p>

        {/* Social / Direct Links */}
        <div className="flex items-center gap-4 text-sm">
          <a
            href={`mailto:${doctor.contact.email}`}
            className="text-slate-400 transition hover:text-brand-600 dark:hover:text-brand-400"
            aria-label="Email"
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
          <a
            href={doctor.contact.phoneHref}
            className="text-slate-400 transition hover:text-brand-600 dark:hover:text-brand-400"
            aria-label="Phone"
          >
            <FontAwesomeIcon icon={faPhone} />
          </a>
        </div>

        <a
          href="#hero"
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 font-bold text-slate-700 transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-white"
        >
          <FontAwesomeIcon
            icon={faArrowUp}
            className="text-[11px]"
            aria-hidden="true"
          />
          {t("footer.backToTop")}
        </a>
      </div>
    </footer>
  );
}
