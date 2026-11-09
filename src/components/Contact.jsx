import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { doctor } from "../data/doctor";
import { Reveal, SectionHeading } from "./Header";

export function Contact({ t, l }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Website inquiry from ${name || "a visitor"}`,
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:${doctor.contact.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <Reveal>
          <SectionHeading
            kicker={t("sections.contact")}
            title={t("sections.contactTitle")}
            description={t("sections.contactIntro")}
          />
        </Reveal>
        <div className="mt-8 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="grid h-full content-start gap-3">
              <a
                href={`mailto:${doctor.contact.email}`}
                className="group flex items-center gap-4 rounded-2xl border border-brand-100 bg-white p-5 shadow-[0_2px_12px_rgba(11,36,71,0.05)] transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_8px_24px_rgba(11,36,71,0.1)]"
              >
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy-900 text-base text-white"
                  aria-hidden="true"
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-bold uppercase tracking-wider text-navy-900/45">
                    {t("hero.email")}
                  </span>
                  <span className="mt-1 block break-all text-[15px] font-bold text-navy-900 group-hover:text-brand-700">
                    {doctor.contact.email}
                  </span>
                </span>
              </a>
              <a
                href={doctor.contact.phoneHref}
                className="group flex items-center gap-4 rounded-2xl border border-brand-100 bg-white p-5 shadow-[0_2px_12px_rgba(11,36,71,0.05)] transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_8px_24px_rgba(11,36,71,0.1)]"
              >
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-600 text-base text-white"
                  aria-hidden="true"
                >
                  <FontAwesomeIcon icon={faPhone} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-bold uppercase tracking-wider text-navy-900/45">
                    {t("hero.phone")}
                  </span>
                  <span
                    className="mt-1 block text-[15px] font-bold text-navy-900 group-hover:text-brand-700"
                    dir="ltr"
                  >
                    {doctor.contact.phone}
                  </span>
                </span>
              </a>
              <div className="rounded-2xl bg-brand-50/70 p-5 text-sm leading-7 text-navy-900/65">
                {l(doctor.contact.location)}
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-brand-100 bg-white p-6 shadow-[0_2px_12px_rgba(11,36,71,0.05)] sm:p-7"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-xs font-bold text-navy-900/70">
                  {t("contactForm.name")}
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                    placeholder={t("contactForm.namePlaceholder")}
                    className="rounded-xl border border-brand-100 bg-brand-50/40 px-4 py-3 text-sm font-medium text-navy-900 outline-none transition placeholder:font-normal placeholder:text-navy-900/40 focus:border-brand-600 focus:bg-white focus:ring-4 focus:ring-brand-100"
                  />
                </label>
                <label className="grid gap-2 text-xs font-bold text-navy-900/70">
                  {t("contactForm.email")}
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    dir="ltr"
                    placeholder="name@mail.com"
                    className="rounded-xl border border-brand-100 bg-brand-50/40 px-4 py-3 text-sm font-medium text-navy-900 outline-none transition placeholder:font-normal placeholder:text-navy-900/40 focus:border-brand-600 focus:bg-white focus:ring-4 focus:ring-brand-100"
                  />
                </label>
              </div>
              <label className="mt-4 grid gap-2 text-xs font-bold text-navy-900/70">
                {t("contactForm.message")}
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  placeholder={t("contactForm.messagePlaceholder")}
                  className="resize-y rounded-xl border border-brand-100 bg-brand-50/40 px-4 py-3 text-sm font-medium text-navy-900 outline-none transition placeholder:font-normal placeholder:text-navy-900/40 focus:border-brand-600 focus:bg-white focus:ring-4 focus:ring-brand-100"
                />
              </label>
              <button
                type="submit"
                className="mt-5 w-full rounded-xl bg-navy-900 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(11,36,71,0.25)] transition hover:bg-navy-800"
              >
                {t("contactForm.sendViaEmail")}
              </button>
              <p className="mt-3 text-center text-xs leading-5 text-navy-900/50">
                {t("contactForm.note")}
              </p>
              {sent && (
                <p
                  role="status"
                  className="mt-3 rounded-xl bg-brand-50 px-4 py-3 text-center text-xs font-bold text-brand-700"
                >
                  {t("contactForm.success")}
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer({ t }) {
  return (
    <footer className="border-t border-brand-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-navy-900/55 sm:flex-row sm:px-6">
        <p className="font-semibold">
          © {new Date().getFullYear()} {t("navigation.brand")} —{" "}
          {t("footer.rights")}
        </p>
        <a
          href="#about"
          className="inline-flex items-center gap-1.5 rounded-full border border-brand-100 px-4 py-2 font-bold text-navy-900/70 transition hover:border-brand-200 hover:text-brand-700"
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
