import { Contact, ContactConnectBanner, Footer } from "./components/Contact";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { Header } from "./components/Header";
import { AboutMeSection, Hero } from "./components/Hero";
import {
  Courses,
  Education,
  ExperienceTimelineSection,
  Research,
  ServicesSection,
  Skills,
} from "./components/Sections";
import { doctor } from "./data/doctor";
import { useLanguage } from "./hooks/useLanguage";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const { lang, setLang, t, l } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const showResearch =
    doctor.researchPublications.length > 0 ||
    doctor.awards.length > 0 ||
    doctor.professionalMemberships.length > 0;

  return (
    <div className="min-h-screen bg-white text-navy-900 antialiased transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
      <Header
        lang={lang}
        setLang={setLang}
        t={t}
        l={l}
        theme={theme}
        toggleTheme={toggleTheme}
        showResearch={showResearch}
      />
      <main id="main">
        {/* 1. Hero with Curved Graphic & Doctor Portrait + Floating Stats Bar */}
        <Hero t={t} l={l} />

        {/* 2. About Me 3-column section: visual desk, bio narrative & signature info card */}
        <AboutMeSection t={t} l={l} lang={lang} />

        {/* 3. Areas of Professional Focus (6 grid cards with teal icons) */}
        <ServicesSection t={t} l={l} />

        {/* 4. Experience Timeline & Quote box */}
        <ExperienceTimelineSection t={t} l={l} />

        {/* 5. Education */}
        <Education t={t} l={l} />

        {/* 6. Skills */}
        <Skills t={t} l={l} />

        {/* 7. Courses & Conferences with Interactive Tabs */}
        <Courses t={t} l={l} />

        {/* 8. Research (if applicable) */}
        {showResearch && <Research t={t} l={l} />}

        {/* 9. ECG Heartbeat Connect Banner */}
        <ContactConnectBanner t={t} />

        {/* 10. Contact Form & Details with Quick Copy */}
        <Contact t={t} l={l} />
      </main>
      <Footer t={t} />

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp t={t} />
    </div>
  );
}
