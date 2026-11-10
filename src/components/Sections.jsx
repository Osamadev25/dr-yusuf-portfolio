import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAward,
  faBookOpen,
  faBriefcaseMedical,
  faBuildingUser,
  faCertificate,
  faCircleCheck,
  faClock,
  faCompass,
  faDownload,
  faFlaskVial,
  faGraduationCap,
  faHeartPulse,
  faHospital,
  faLaptop,
  faLanguage,
  faMicrophone,
  faNotesMedical,
  faShieldHalved,
  faStethoscope,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { doctor } from "../data/doctor";
import { Reveal, SectionHeading } from "./Header";

const serviceIcons = {
  faStethoscope: faStethoscope,
  faShieldHalved: faShieldHalved,
  faHeartPulse: faHeartPulse,
  faUserDoctor: faUserDoctor,
  faHospital: faHospital,
  faNotesMedical: faNotesMedical,
};

export function ServicesSection({ t, l }) {
  return (
    <section
      id="services"
      className="relative scroll-mt-20 bg-slate-50/70 py-16 md:py-24 dark:bg-slate-900/40"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Heading, intro & action */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <Reveal>
              <SectionHeading
                kicker={t("servicesSection.kicker")}
                title={t("servicesSection.title")}
                description={t("servicesSection.description")}
              />
              <div className="mt-8">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-brand-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-brand-600/35 focus:outline-none dark:shadow-brand-900/30"
                >
                  {t("servicesSection.viewAll")}
                  <span className="text-base transition-transform group-hover:translate-x-1 rtl:rotate-180">
                    →
                  </span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Column: 6 Medical Focus Cards (Grid 2x3) */}
          <div className="lg:col-span-8">
            <div className="grid gap-5 sm:grid-cols-2">
              {doctor.services.map((srv, idx) => {
                const icon = serviceIcons[srv.icon] || faStethoscope;
                return (
                  <Reveal key={srv.id} delay={idx * 60}>
                    <div className="group h-full rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-600/5 sm:p-7 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
                      {/* Teal Icon Circle */}
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition-colors duration-200 group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-950/60 dark:text-brand-400 dark:group-hover:bg-brand-600 dark:group-hover:text-white">
                        <FontAwesomeIcon icon={icon} className="text-lg" />
                      </div>

                      <h3 className="mt-5 text-lg font-bold text-navy-900 transition-colors group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-400">
                        {l(srv.title)}
                      </h3>

                      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        {l(srv.description)}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ExperienceTimelineSection({ t, l }) {
  return (
    <section
      id="experience"
      className="relative scroll-mt-20 bg-white py-16 md:py-24 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            kicker={t("experienceSection.kicker")}
            title={t("experienceSection.title")}
            description={t("experienceSection.description")}
          />
        </Reveal>

        <div className="mt-12 grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Full Career Positions (Current Inpatient Role + Rotations) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Current Position Feature Card */}
            <Reveal>
              <article className="relative overflow-hidden rounded-3xl border-2 border-brand-500 bg-gradient-to-br from-brand-50/50 via-white to-white p-6 shadow-md transition sm:p-7 dark:border-brand-600 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3.5 py-1 text-xs font-bold text-white shadow-sm">
                    <FontAwesomeIcon icon={faBriefcaseMedical} />
                    {t("experienceSection.currentRoleBadge")}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 dark:text-brand-300">
                    <FontAwesomeIcon icon={faClock} />
                    {l(doctor.currentPosition.period)}
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-extrabold text-navy-900 sm:text-2xl dark:text-white">
                  {l(doctor.currentPosition.title)}
                </h3>
                <p className="mt-1 text-sm font-semibold text-brand-700 dark:text-brand-400">
                  {l(doctor.currentPosition.workplace)} — {l(doctor.currentPosition.location)}
                </p>

                <div className="mt-4 border-t border-brand-100 pt-4 dark:border-slate-800">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {t("experienceSection.keyResponsibilities")}
                  </p>
                  <ul className="mt-2.5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    {doctor.currentPosition.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2.5">
                        <FontAwesomeIcon
                          icon={faCircleCheck}
                          className="mt-1 text-xs text-brand-600 dark:text-brand-400 shrink-0"
                        />
                        <span>{l(resp)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>

            {/* Rotational Timeline */}
            <div className="relative mt-8 border-s-2 border-brand-200 ps-6 sm:ps-8 dark:border-slate-800">
              {doctor.clinicalTraining.slice(1).map((job, idx) => (
                <Reveal key={idx} delay={Math.min(idx, 4) * 60}>
                  <div className="relative mb-6 last:mb-0">
                    <span
                      className="absolute top-4 -start-[31px] grid h-4 w-4 place-items-center rounded-full border-4 border-brand-600 bg-white sm:-start-[39px] dark:bg-slate-950"
                      aria-hidden="true"
                    />

                    <article className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-5 shadow-sm transition hover:border-brand-200 hover:bg-white hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60 dark:hover:bg-slate-900">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100/70 px-3 py-1 text-xs font-bold text-brand-800 dark:bg-brand-950/70 dark:text-brand-300">
                          <FontAwesomeIcon icon={faHospital} />
                          {t("experienceSection.internshipBadge")}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                          <FontAwesomeIcon icon={faClock} />
                          {l(job.period)}
                        </span>
                      </div>

                      <h4 className="mt-2.5 text-base font-bold text-navy-900 dark:text-white">
                        {l(job.title)}
                      </h4>
                      <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-400">
                        {l(job.place)}
                      </p>
                    </article>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right Column: Inspirational Quote Card & Active Download CV Button */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <Reveal delay={150}>
              <div className="relative overflow-hidden rounded-3xl border border-brand-200/80 bg-gradient-to-br from-brand-50/70 via-white to-brand-50/30 p-8 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
                {/* Large Decorative Quotation Mark */}
                <div
                  className="font-serif text-7xl font-bold leading-none text-brand-600/20 select-none dark:text-brand-400/20"
                  aria-hidden="true"
                >
                  “
                </div>

                <blockquote className="-mt-8 text-lg font-medium leading-relaxed text-navy-900 dark:text-slate-100 sm:text-xl">
                  {t("experienceSection.quote")}
                </blockquote>

                <p className="mt-5 text-sm font-bold tracking-wide text-brand-700 dark:text-brand-400">
                  — {t("experienceSection.quoteAuthor")}
                </p>

                <div className="mt-8 border-t border-brand-200/60 pt-6 dark:border-slate-800">
                  <a
                    href={doctor.cvUrl}
                    download="Dr-Yusuf-Almasawa-CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-full border-2 border-brand-600 bg-white px-6 py-3 text-sm font-bold text-brand-700 shadow-sm transition hover:bg-brand-600 hover:text-white dark:border-brand-500 dark:bg-slate-900 dark:text-brand-300 dark:hover:bg-brand-600 dark:hover:text-white"
                  >
                    <FontAwesomeIcon icon={faDownload} className="text-xs" />
                    <span>{t("experienceSection.viewCv")}</span>
                    <span className="text-base rtl:rotate-180">→</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Education({ t, l }) {
  return (
    <section
      id="education"
      className="scroll-mt-20 bg-slate-50/70 py-16 md:py-20 dark:bg-slate-900/40"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            kicker={t("sections.education")}
            title={t("sections.educationTitle")}
          />
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {doctor.education.map((item, idx) => (
            <Reveal key={idx} delay={idx * 80}>
              <article className="h-full rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-start gap-4">
                  <span
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-400"
                    aria-hidden="true"
                  >
                    <FontAwesomeIcon
                      icon={faGraduationCap}
                      className="text-lg"
                    />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-navy-900 dark:text-white">
                      {l(item.degree)}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-brand-600 dark:text-brand-400">
                      {l(item.institution)}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                      {item.location ? <span>{l(item.location)}</span> : null}
                      {item.location && item.period ? <span>·</span> : null}
                      {item.period ? (
                        <span className="inline-flex items-center gap-1 font-bold text-brand-700 dark:text-brand-300">
                          <FontAwesomeIcon icon={faClock} />
                          {l(item.period)}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}

          {doctor.additionalQualifications.map((q, idx) => (
            <Reveal key={idx} delay={idx * 80 + 100}>
              <article className="h-full rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-start gap-4">
                  <span
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-400"
                    aria-hidden="true"
                  >
                    <FontAwesomeIcon icon={faAward} className="text-lg" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-navy-900 dark:text-white">
                      {l(q.name)}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-brand-600 dark:text-brand-400">
                      {l(q.detail)}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Skills({ t, l }) {
  return (
    <section
      id="skills"
      className="scroll-mt-20 bg-white py-16 md:py-20 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            kicker={t("sections.skills")}
            title={t("sections.skillsTitle")}
          />
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-4">
          <Reveal>
            <div className="h-full rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="flex items-center gap-2 text-sm font-bold text-brand-700 dark:text-brand-300">
                <FontAwesomeIcon icon={faCircleCheck} />
                {t("sections.clinicalSkills")}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {doctor.professionalSkills.map((s, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200"
                  >
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="mt-0.5 text-xs text-brand-600 dark:text-brand-400 shrink-0"
                    />
                    <span>{l(s)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div className="h-full rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="flex items-center gap-2 text-sm font-bold text-brand-700 dark:text-brand-300">
                <FontAwesomeIcon icon={faLaptop} />
                {t("sections.digitalSkills")}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {doctor.digitalSkills.map((s, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200"
                  >
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="mt-0.5 text-xs text-brand-600 dark:text-brand-400 shrink-0"
                    />
                    <span>{l(s)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="h-full rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="flex items-center gap-2 text-sm font-bold text-brand-700 dark:text-brand-300">
                <FontAwesomeIcon icon={faLanguage} />
                {t("sections.languages")}
              </h3>
              <ul className="mt-4 space-y-3">
                {doctor.languages.map((langItem, idx) => (
                  <li
                    key={idx}
                    className="rounded-2xl border border-slate-200/60 bg-white p-3 dark:border-slate-800 dark:bg-slate-950"
                  >
                    <p className="text-sm font-bold text-navy-900 dark:text-white">
                      {l(langItem.name)}
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-brand-600 dark:text-brand-400">
                      {l(langItem.level)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="h-full rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="flex items-center gap-2 text-sm font-bold text-brand-700 dark:text-brand-300">
                <FontAwesomeIcon icon={faCompass} />
                {t("sections.interests")}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {doctor.interests.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200"
                  >
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-600 dark:bg-brand-400 shrink-0" />
                    <span>{l(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CourseList({ items, l, icon }) {
  return (
    <ul className="divide-y divide-slate-100 dark:divide-slate-800">
      {items.map((item, iIdx) => (
        <li key={iIdx} className="flex gap-3 py-3.5 first:pt-0 last:pb-0">
          <span
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-xs text-brand-600 dark:bg-slate-800 dark:text-brand-400"
            aria-hidden="true"
          >
            <FontAwesomeIcon icon={icon} />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-bold text-navy-900 dark:text-white">
              {l(item.name ?? item.title)}
            </p>
            {item.organizer ?? item.platform ? (
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                {l(item.organizer ?? item.platform)}
              </p>
            ) : null}
            {item.year ?? item.duration ? (
              <p className="mt-1 inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-0.5 text-[11px] font-bold text-brand-700 dark:bg-brand-950/60 dark:text-brand-300">
                <FontAwesomeIcon icon={faClock} />
                {item.year ?? l(item.duration)}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

export function Courses({ t, l }) {
  const [activeTab, setActiveTab] = useState("all");

  const groups = [
    {
      id: "onsite",
      title: t("coursesFilter.onsite"),
      items: doctor.courses,
      icon: faBookOpen,
    },
    {
      id: "stanford",
      title: t("coursesFilter.stanford"),
      items: doctor.onlineCourses,
      icon: faLaptop,
    },
    {
      id: "conferences",
      title: t("coursesFilter.conferences"),
      items: doctor.scientificConferences,
      icon: faMicrophone,
    },
  ];

  const visibleGroups =
    activeTab === "all" ? groups : groups.filter((g) => g.id === activeTab);

  return (
    <section
      id="courses"
      className="scroll-mt-20 bg-slate-50/70 py-16 md:py-20 dark:bg-slate-900/40"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              kicker={t("sections.courses")}
              title={t("sections.coursesTitle")}
            />

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-white p-1.5 shadow-sm dark:bg-slate-900 dark:border dark:border-slate-800">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                  activeTab === "all"
                    ? "bg-brand-600 text-white shadow"
                    : "text-slate-600 hover:text-navy-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {t("coursesFilter.all")}
              </button>
              {groups.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setActiveTab(g.id)}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                    activeTab === g.id
                      ? "bg-brand-600 text-white shadow"
                      : "text-slate-600 hover:text-navy-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  {g.title}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div
          className={`mt-8 grid gap-5 ${
            visibleGroups.length === 1
              ? "max-w-2xl mx-auto grid-cols-1"
              : "lg:grid-cols-3"
          }`}
        >
          {visibleGroups.map((group, idx) => (
            <Reveal key={group.title} delay={idx * 80}>
              <article className="h-full rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h3 className="border-b border-slate-100 pb-3 text-sm font-bold text-navy-900 dark:border-slate-800 dark:text-white">
                  {group.title}
                  <span className="ms-2 rounded-full bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-700 dark:bg-brand-950/60 dark:text-brand-300">
                    {group.items.length}
                  </span>
                </h3>
                <div className="mt-3">
                  <CourseList items={group.items} l={l} icon={group.icon} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Research({ t, l }) {
  if (doctor.researchPublications.length === 0) return null;
  return (
    <section
      id="research"
      className="scroll-mt-20 bg-white py-16 md:py-24 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            kicker={t("sections.research")}
            title={t("sections.researchTitle")}
          />
        </Reveal>

        <div className="mt-10">
          {doctor.researchPublications.map((p, idx) => (
            <Reveal key={idx}>
              <article className="relative overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50/40 via-white to-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:from-slate-900/60 dark:via-slate-900 dark:to-slate-950">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-brand-100/80 px-3.5 py-1 text-xs font-bold text-brand-800 dark:bg-brand-950 dark:text-brand-300">
                    <FontAwesomeIcon icon={faFlaskVial} />
                    {l(p.role)}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {p.year}
                  </span>
                </div>

                <h3 className="mt-4 font-serif text-xl font-bold leading-snug text-navy-900 sm:text-2xl dark:text-white">
                  {l(p.title)}
                </h3>

                <div className="mt-4 rounded-2xl bg-white/80 p-4 border border-brand-100 dark:border-slate-800 dark:bg-slate-900/60">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-400">
                    Scope & Contribution:
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                    {l(p.contribution)}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
