import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe, ArrowRight, ExternalLink, Mail, MapPin, Phone, Award, BookOpen, Terminal, ChevronDown } from 'lucide-react';
import { dict } from './i18n';

type Language = 'en' | 'zh';

export function App() {
  const [lang, setLang] = useState<Language>('en');
  const [isScrolled, setIsScrolled] = useState(false);
  const t = dict[lang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => {
    setLang(lang === 'en' ? 'zh' : 'en');
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-white/30 selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/70 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-semibold tracking-tight cursor-pointer hover:text-gray-300 transition-colors">
            {t.hero.name}
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
            <a href="#about" className="hover:text-white transition-colors">{t.nav.about}</a>
            <a href="#publications" className="hover:text-white transition-colors">{t.nav.publications}</a>
            <a href="#projects" className="hover:text-white transition-colors">{t.nav.projects}</a>
            <a href="#awards" className="hover:text-white transition-colors">{t.nav.awards}</a>
            <a href="#contact" className="hover:text-white transition-colors">{t.nav.contact}</a>
          </div>

          <button 
            onClick={toggleLang}
            className="flex items-center space-x-2 text-sm font-medium text-gray-300 hover:text-white transition-colors bg-white/5 px-3 py-1.5 rounded-full border border-white/10"
          >
            <Globe className="w-4 h-4" />
            <span>{lang === 'en' ? '中' : 'EN'}</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection t={t} lang={lang} />

      {/* About Section */}
      <AboutSection t={t} />

      {/* Publications Section */}
      <PublicationsSection t={t} />

      {/* Projects Section */}
      <ProjectsSection t={t} />

      {/* Awards Section */}
      <AwardsSection t={t} />

      {/* Contact & Footer */}
      <FooterSection t={t} />
    </div>
  );
}

function HeroSection({ t, lang }: { t: any, lang: string }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
      <motion.div 
        style={{ y, opacity }}
        className="text-center px-6 z-10 max-w-5xl mx-auto flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-sm md:text-base font-medium tracking-wide text-gray-300 mb-6 backdrop-blur-md">
            {t.hero.title}
          </div>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={`text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 mb-6 ${lang === 'zh' ? 'leading-tight' : ''}`}
        >
          {t.hero.name}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-3xl text-gray-400 max-w-2xl font-light tracking-tight mb-12"
        >
          {t.hero.subtitle}
        </motion.p>
        
        <motion.a 
          href="#about"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="group flex items-center space-x-2 bg-white text-black px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform duration-300"
        >
          <span>{t.hero.cta}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.a>
      </motion.div>
      
      {/* Abstract Background Effect */}
      <div className="absolute inset-0 z-0 opacity-30 mix-blend-screen pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-gray-800 to-gray-500 rounded-full blur-[120px] opacity-20 animate-pulse" style={{ animationDuration: '4s' }} />
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-gray-500"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}

function AboutSection({ t }: { t: any }) {
  return (
    <section id="about" className="py-32 bg-zinc-950 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">{t.about.title}</h2>
          
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light mb-16 border-l-2 border-white/20 pl-6 py-2">
            {t.about.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-8 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-gray-400" />
                {t.about.education}
              </h3>
              <div className="space-y-8">
                <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-white before:rounded-full before:ring-4 before:ring-white/10">
                  <h4 className="text-lg font-medium text-gray-100">{t.about.edu1_title}</h4>
                  <p className="text-gray-400 mt-1">{t.about.edu1_school}</p>
                  <p className="text-sm text-gray-500 mt-2 font-mono">{t.about.edu1_time}</p>
                </div>
                <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-white/40 before:rounded-full">
                  <h4 className="text-lg font-medium text-gray-300">{t.about.edu2_title}</h4>
                  <p className="text-gray-400 mt-1">{t.about.edu2_school}</p>
                  <p className="text-sm text-gray-500 mt-2 font-mono">{t.about.edu2_time}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-8">{t.about.interests_title}</h3>
              <div className="flex flex-wrap gap-3">
                {t.about.interests_list.map((interest: string, idx: number) => (
                  <span key={idx} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-colors cursor-default">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PublicationsSection({ t }: { t: any }) {
  const highlightAuthor = (authors: string) => {
    // Reconstruct with highlight. In our data, "Xingyu Lan" and "Xingyu Lan*" appear.
    if (authors.includes("Xingyu Lan*")) {
      const split = authors.split("Xingyu Lan*");
      return (
        <>
          {split[0]}<span className="text-white font-semibold">Xingyu Lan*</span>{split[1]}
        </>
      );
    } else if (authors.includes("Xingyu Lan")) {
       const split = authors.split("Xingyu Lan");
       return (
        <>
          {split[0]}<span className="text-white font-semibold">Xingyu Lan</span>{split[1]}
        </>
      );
    }
    return authors;
  };

  return (
    <section id="publications" className="py-32 px-6 bg-black">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            {t.publications.title}
          </h2>
          <a 
            href={t.publications.scholar_link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors group"
          >
            <span>{t.publications.scholar}</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>

        <div className="space-y-4">
          {t.publications.list.map((pub: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors"
            >
              <h3 className="text-lg md:text-xl font-medium text-gray-200 mb-2 leading-snug">
                {pub.title}
              </h3>
              <p className="text-gray-400 text-sm md:text-base mb-3">
                {highlightAuthor(pub.authors)}
              </p>
              <div className="flex items-center flex-wrap gap-3">
                {pub.journal && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-white/10 text-xs font-medium text-gray-300">
                    {pub.journal}
                  </span>
                )}
                {pub.status && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20">
                    {pub.status}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection({ t }: { t: any }) {
  return (
    <section id="projects" className="py-32 bg-zinc-950 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold tracking-tight mb-16 flex items-center gap-4"
        >
          <Terminal className="w-8 h-8 text-gray-400" />
          {t.projects.title}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.projects.list.map((proj: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/[0.05] flex flex-col h-full"
            >
              <h3 className="text-2xl font-bold mb-4 leading-tight">{proj.name}</h3>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium text-white px-3 py-1 bg-white/10 rounded-full">
                  {proj.role}
                </span>
                <span className="text-sm font-mono text-gray-500">
                  {proj.time}
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed font-light mt-auto">
                {proj.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AwardsSection({ t }: { t: any }) {
  return (
    <section id="awards" className="py-32 px-6 bg-black">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold tracking-tight mb-16 flex items-center gap-4"
        >
          <Award className="w-8 h-8 text-gray-400" />
          {t.awards.title}
        </motion.h2>

        <div className="space-y-4 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-px before:bg-white/10">
          {t.awards.list.map((award: string, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="relative pl-12 py-3"
            >
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-500 ring-4 ring-black" />
              <p className="text-lg md:text-xl text-gray-300 font-light">{award}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FooterSection({ t }: { t: any }) {
  return (
    <footer id="contact" className="py-24 px-6 border-t border-white/10 bg-zinc-950">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-tight mb-12">{t.footer.contact}</h2>
          
          <div className="space-y-6 mb-16 text-gray-300">
            <div className="flex items-center justify-center gap-3">
              <Mail className="w-5 h-5 text-gray-500" />
              <a href={`mailto:${t.footer.email}`} className="hover:text-white transition-colors text-lg">{t.footer.email}</a>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Phone className="w-5 h-5 text-gray-500" />
              <span className="text-lg">{t.footer.phone}</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <MapPin className="w-5 h-5 text-gray-500" />
              <span className="text-lg max-w-sm">{t.footer.address}</span>
            </div>
          </div>
        </motion.div>

        <p className="text-gray-600 text-sm font-medium">{t.footer.copyright}</p>
      </div>
    </footer>
  );
}
