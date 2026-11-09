import { Contact, Footer } from "./components/Contact";
import { Header } from "./components/Header";
import { About, Hero } from "./components/Hero";
import {
  AdditionalQualifications,
  Courses,
  Education,
  Experience,
  Research,
  Skills,
} from "./components/Sections";
import { doctor } from "./data/doctor";
import { useLanguage } from "./hooks/useLanguage";

export default function App() {
  const { lang, setLang, t, l } = useLanguage();
  const showResearch =
    doctor.researchPublications.length > 0 ||
    doctor.awards.length > 0 ||
    doctor.professionalMemberships.length > 0;

  return (
    <div className="min-h-screen bg-white text-navy-900 antialiased">
      <Header
        lang={lang}
        setLang={setLang}
        t={t}
        l={l}
        showResearch={showResearch}
      />
      <main id="main">
        <Hero t={t} l={l} />
        <About t={t} l={l} />
        <Education t={t} l={l} />
        <Experience t={t} l={l} />
        <Skills t={t} l={l} />
        <Courses t={t} l={l} />
        <AdditionalQualifications t={t} l={l} />
        <Research t={t} l={l} />
        <Contact t={t} l={l} />
      </main>
      <Footer t={t} />
    </div>
  );
}
