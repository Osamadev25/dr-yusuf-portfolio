import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAward,
  faBookOpen,
  faBriefcaseMedical,
  faCertificate,
  faCircleCheck,
  faClock,
  faGraduationCap,
  faLaptop,
  faLanguage,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import { doctor } from "../data/doctor";
import { Reveal, SectionHeading } from "./Header";

export function Education({ t, l }) {
  return (
    <section id="education" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <Reveal>
          <SectionHeading
            kicker={t("sections.education")}
            title={t("sections.educationTitle")}
          />
        </Reveal>
        <div className="mt-8 grid gap-4">
          {doctor.education.map((item, idx) => (
            <Reveal key={idx} delay={idx * 80}>
              <article className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-[0_2px_12px_rgba(11,36,71,0.06)]">
                <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-start sm:p-7">
                  <span
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-900 text-lg text-white"
                    aria-hidden="true"
                  >
                    <FontAwesomeIcon icon={faGraduationCap} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-bold text-navy-900">
                      {l(item.degree)}
                    </h3>
                    <p className="mt-1 text-[15px] font-semibold text-brand-700">
                      {l(item.institution)}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[13px] font-medium text-navy-900/55">
                      {item.location ? <span>{l(item.location)}</span> : null}
                      {item.location && item.period ? (
                        <span aria-hidden="true" className="text-brand-300">
                          ·
                        </span>
                      ) : null}
                      {item.period ? (
                        <span className="inline-flex items-center gap-1.5">
                          <FontAwesomeIcon
                            icon={faClock}
                            className="text-xs"
                            aria-hidden="true"
                          />
                          {l(item.period)}
                        </span>
                      ) : null}
                    </div>
                    {item.details ? (
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-navy-900/65">
                        {l(item.details)}
                      </p>
                    ) : null}
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

export function Experience({ t, l }) {
  return (
    <section id="experience" className="scroll-mt-24 bg-brand-50/50">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <Reveal>
          <SectionHeading
            kicker={t("sections.experience")}
            title={t("sections.experienceTitle")}
          />
        </Reveal>
        <ol className="relative mt-10 space-y-4 border-s-2 border-brand-200 ps-6 sm:ps-8">
          {doctor.clinicalTraining.map((job, idx) => (
            <Reveal key={idx} delay={Math.min(idx, 4) * 60}>
              <li className="relative">
                <span
                  className="absolute top-5 -start-[33px] grid h-4 w-4 place-items-center rounded-full border-[3px] border-brand-600 bg-white sm:-start-[41px]"
                  aria-hidden="true"
                />
                <article className="rounded-2xl border border-brand-100 bg-white p-5 shadow-[0_2px_12px_rgba(11,36,71,0.05)] transition hover:shadow-[0_8px_24px_rgba(11,36,71,0.1)] sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold text-brand-700">
                      <FontAwesomeIcon
                        icon={faBriefcaseMedical}
                        aria-hidden="true"
                      />
                      {t("sections.internship")}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-900/55">
                      <FontAwesomeIcon icon={faClock} aria-hidden="true" />
                      {l(job.period)}
                    </span>
                  </div>
                  <h3 className="mt-3 text-[17px] font-bold text-navy-900">
                    {l(job.title)}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-navy-900/60">
                    {l(job.place)}
                  </p>
                </article>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Skills({ t, l }) {
  return (
    <section id="skills" className="scroll-mt-24 bg-navy-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <Reveal>
          <div className="max-w-2xl">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-200">
              <span
                className="inline-block h-px w-6 bg-brand-200"
                aria-hidden="true"
              />
              {t("sections.skills")}
            </p>
            <h2 className="mt-3 text-2xl font-bold sm:text-[28px] sm:leading-snug">
              {t("sections.skillsTitle")}
            </h2>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Reveal>
            <div className="h-full rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/10">
              <h3 className="flex items-center gap-2 text-sm font-bold text-brand-200">
                <FontAwesomeIcon icon={faCircleCheck} aria-hidden="true" />
                {t("sections.clinicalSkills")}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {doctor.professionalSkills.map((s, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm leading-6 text-slate-100"
                  >
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="mt-1 text-xs text-brand-200"
                      aria-hidden="true"
                    />
                    <span>{l(s)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="h-full rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/10">
              <h3 className="flex items-center gap-2 text-sm font-bold text-brand-200">
                <FontAwesomeIcon icon={faLaptop} aria-hidden="true" />
                {t("sections.digitalSkills")}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {doctor.digitalSkills.map((s, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm leading-6 text-slate-100"
                  >
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="mt-1 text-xs text-brand-200"
                      aria-hidden="true"
                    />
                    <span>{l(s)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="h-full rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/10">
              <h3 className="flex items-center gap-2 text-sm font-bold text-brand-200">
                <FontAwesomeIcon icon={faLanguage} aria-hidden="true" />
                {t("sections.languages")}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {doctor.languages.map((langItem, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm leading-6 text-slate-100"
                  >
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="mt-1 text-xs text-brand-200"
                      aria-hidden="true"
                    />
                    <span>{l(langItem.name)}</span>
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
    <ul className="divide-y divide-brand-100/80">
      {items.map((item, iIdx) => (
        <li key={iIdx} className="flex gap-3.5 py-4 first:pt-0 last:pb-0">
          <span
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-sm text-brand-700"
            aria-hidden="true"
          >
            <FontAwesomeIcon icon={icon} />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-bold leading-6 text-navy-900">
              {l(item.name ?? item.title)}
            </p>
            {(item.organizer ?? item.platform) ? (
              <p className="mt-0.5 text-[13px] text-navy-900/55">
                {l(item.organizer ?? item.platform)}
              </p>
            ) : null}
            {(item.year ?? item.duration) ? (
              <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-0.5 text-[11px] font-bold text-brand-700">
                <FontAwesomeIcon icon={faClock} aria-hidden="true" />
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
  const groups = [
    {
      title: t("sections.onsiteCourses"),
      items: doctor.courses,
      icon: faBookOpen,
    },
    {
      title: t("sections.onlineCourses"),
      items: doctor.onlineCourses,
      icon: faLaptop,
    },
    {
      title: t("sections.conferences"),
      items: doctor.scientificConferences,
      icon: faMicrophone,
    },
  ];
  return (
    <section id="courses" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <Reveal>
          <SectionHeading
            kicker={t("sections.courses")}
            title={t("sections.coursesTitle")}
          />
        </Reveal>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {groups.map((group, idx) => (
            <Reveal key={group.title} delay={idx * 80}>
              <article className="h-full rounded-2xl border border-brand-100 bg-white p-6 shadow-[0_2px_12px_rgba(11,36,71,0.05)]">
                <h3 className="border-b border-brand-100/80 pb-3 text-[15px] font-bold text-navy-900">
                  {group.title}
                  <span className="ms-2 rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-bold text-brand-700">
                    {group.items.length}
                  </span>
                </h3>
                <div className="mt-2">
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
  const hasPublications = doctor.researchPublications.length > 0;
  const hasAwards = doctor.awards.length > 0;
  const hasMemberships = doctor.professionalMemberships.length > 0;
  if (!hasPublications && !hasAwards && !hasMemberships) return null;
  return (
    <section id="research" className="scroll-mt-24 bg-brand-50/50">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <Reveal>
          <SectionHeading
            kicker={t("sections.research")}
            title={t("sections.researchTitle")}
          />
        </Reveal>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {hasPublications ? (
            <Reveal>
              <article className="h-full rounded-2xl border border-brand-100 bg-white p-6 shadow-[0_2px_12px_rgba(11,36,71,0.05)]">
                <h3 className="text-sm font-bold uppercase tracking-wider text-navy-900">
                  {t("sections.publications")}
                </h3>
                {doctor.researchPublications.map((p, idx) => (
                  <div key={idx} className="mt-4">
                    <p className="text-sm font-bold leading-6 text-navy-900">
                      {l(p.title)}
                    </p>
                    {(p.journal ?? p.year) ? (
                      <p className="mt-1.5 text-xs text-navy-900/55">
                        {p.journal ? l(p.journal) : null}
                        {p.journal && p.year ? " · " : null}
                        {p.year ?? null}
                      </p>
                    ) : null}
                  </div>
                ))}
              </article>
            </Reveal>
          ) : null}
          {hasAwards ? (
            <Reveal delay={80}>
              <article className="h-full rounded-2xl bg-navy-900 p-6 text-white shadow-[0_2px_12px_rgba(11,36,71,0.15)]">
                <h3 className="text-sm font-bold uppercase tracking-wider text-brand-200">
                  {t("sections.awards")}
                </h3>
                {doctor.awards.map((a, idx) => (
                  <div key={idx} className="mt-4">
                    <p className="text-sm font-bold leading-6">
                      <FontAwesomeIcon
                        icon={faAward}
                        className="me-1.5 text-brand-200"
                        aria-hidden="true"
                      />
                      {l(a.title)}
                    </p>
                    {(a.issuer ?? a.year) ? (
                      <p className="mt-1.5 text-xs text-slate-300">
                        {a.issuer ? l(a.issuer) : null}
                        {a.issuer && a.year ? " · " : null}
                        {a.year ?? null}
                      </p>
                    ) : null}
                  </div>
                ))}
              </article>
            </Reveal>
          ) : null}
          {hasMemberships ? (
            <Reveal delay={140}>
              <article className="h-full rounded-2xl border border-brand-100 bg-white p-6 shadow-[0_2px_12px_rgba(11,36,71,0.05)]">
                <h3 className="text-sm font-bold uppercase tracking-wider text-navy-900">
                  {t("sections.memberships")}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {doctor.professionalMemberships.map((m, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm font-semibold leading-6 text-navy-900/80"
                    >
                      <FontAwesomeIcon
                        icon={faCertificate}
                        className="mt-1 text-brand-600"
                        aria-hidden="true"
                      />
                      <span>{l(m)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function AdditionalQualifications({ t, l }) {
  if (doctor.additionalQualifications.length === 0) return null;
  return (
    <section id="qualifications" className="scroll-mt-24 bg-brand-50/50">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <Reveal>
          <SectionHeading
            kicker={t("sections.additionalQualifications")}
            title={t("sections.additionalQualificationsTitle")}
          />
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {doctor.additionalQualifications.map((q, idx) => (
            <Reveal key={idx} delay={idx * 80}>
              <article className="flex items-center gap-4 rounded-2xl border border-brand-100 bg-white p-6 shadow-[0_2px_12px_rgba(11,36,71,0.05)]">
                <span
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-600 text-lg text-white"
                  aria-hidden="true"
                >
                  <FontAwesomeIcon icon={faAward} />
                </span>
                <div>
                  <h3 className="text-[17px] font-bold text-navy-900">
                    {l(q.name)}
                  </h3>
                  {q.detail ? (
                    <p className="mt-1 inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
                      {l(q.detail)}
                    </p>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
