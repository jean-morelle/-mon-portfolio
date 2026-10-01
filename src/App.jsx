import { useEffect, useState } from 'react'
import photo from './images/portrait.jpg'
import cv from './images/cv.pdf'
import gkasShot from './images/gkas-group.jpg'
import logo from './images/logo-mark.png'
import digitalAllianceShot from './images/digitalalliance.jpg'
import nunyFoodShot from './images/nunyfood.jpg'
import emargementShot from './images/emargement.jpg'
import './App.css'

const EMAIL = 'koudorojeanmorelle46@gmail.com'
const GITHUB = 'https://github.com/jean-morelle'
const LINKEDIN = 'https://www.linkedin.com/in/jean-morelle-koudoro-99b18041b/'
const WHATSAPP = `https://wa.me/22896190928?text=${encodeURIComponent(
  'Bonjour Jean-Morelle, j’ai vu votre portfolio et je souhaite échanger avec vous.',
)}`
const CV_NAME = 'CV-KOUDORO-Jean-morelle.pdf'

const links = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#apropos', label: 'À propos' },
  { href: '#competences', label: 'Compétences' },
  { href: '#projets', label: 'Projets' },
  { href: '#parcours', label: 'Parcours' },
  { href: '#contact', label: 'Contact' },
]

const skills = [
  { group: 'Langages', items: ['C#', 'PHP', 'TypeScript', 'JavaScript', 'SQL'] },
  {
    group: 'Back-end',
    items: ['ASP.NET Core Web API', 'EF Core', 'Laravel', 'MediatR', 'JWT', 'RBAC'],
  },
  { group: 'Architecture', items: ['Clean Architecture', 'Repository Pattern', 'REST', 'UML'] },
  { group: 'Données', items: ['PostgreSQL', 'MySQL', 'SQL Server'] },
  { group: 'Front-end', items: ['React', 'Blade'] },
  { group: 'Outils', items: ['Git', 'GitHub', 'Swagger', 'Visual Studio'] },
]

const repo = (name) => `${GITHUB}/${name}`

const featured = {
  name: 'GKAS-GROUP',
  type: 'Site client · En production',
  desc: 'Site vitrine de GKAS-GROUP, entreprise multiservice (électronique, informatique, BTP, électricité, mécanique). Conçu, développé et hébergé de bout en bout : présentation des services, références clients et demande de devis en ligne.',
  stack: ['Laravel', 'PHP 8', 'MySQL', 'Blade'],
  url: 'https://gkasgroup.com/',
}

const projects = [
  {
    name: 'DigitalAllianceTogo',
    type: 'Plateforme e-commerce',
    desc: 'Boutique en ligne de matériel informatique (grand public et professionnels) : catalogue, devis, commandes versionnées, livraisons, paiements, SAV, stock et journal d’audit.',
    stack: ['ASP.NET Core', 'EF Core', 'PostgreSQL', 'MediatR', 'JWT', 'Clean Architecture'],
    image: digitalAllianceShot,
    repo: repo('DigitalAllianceTogo'),
  },
  {
    name: 'NunyFood',
    type: 'Full-stack',
    desc: 'Plateforme pour commander des packs alimentaires livrés à sa famille au Togo depuis l’étranger : packs, paiements sécurisés, livreurs et suivi des commandes.',
    stack: ['ASP.NET Core', 'EF Core', 'PostgreSQL', 'React', 'JWT', 'RBAC'],
    image: nunyFoodShot,
    repo: repo('NunyFoodWebApi'),
  },
  {
    name: 'GKAS Émargement',
    type: 'Application RH',
    desc: 'Système de pointage des employés pour GKAS-GROUP : borne QR code, présences, retards, congés, horaires, corrections, rapports et journal d’audit.',
    stack: ['ASP.NET Core', 'EF Core', 'PostgreSQL', 'Clean Architecture'],
    image: emargementShot,
    repo: repo('GkasGroupEmargement'),
  },
]

const timeline = [
  { years: '2024 – 2025', title: 'Licence Architecture Logicielle', place: 'ESGIS Avédji' },
  { years: '2022 – 2023', title: 'Informatique, Réseaux et Télécoms', place: 'ESGIS' },
  { years: '2021 – 2022', title: '1re année IRT', place: 'ESGIS Kodjoviakopé' },
  { years: '2020 – 2021', title: 'Baccalauréat A4', place: 'Lycée Sainte Catherine' },
]

const services = [
  {
    icon: '{ }',
    title: 'APIs .NET',
    text: 'Conception d’APIs REST sécurisées : validation, gestion d’erreurs et authentification JWT.',
  },
  {
    icon: '◇',
    title: 'Architecture',
    text: 'Structuration en Clean Architecture, Repository Pattern et modélisation de bases relationnelles.',
  },
  {
    icon: '⇄',
    title: 'Full-stack',
    text: 'Applications complètes avec React côté front, ASP.NET Core ou Laravel côté back.',
  },
]

function useActiveSection() {
  const [active, setActive] = useState('#accueil')

  useEffect(() => {
    const sections = links.map((l) => document.querySelector(l.href)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return active
}

const roles = ['Back-end .NET', 'APIs REST', 'Clean Architecture', 'Full-stack React']

function useTyping(words) {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index % words.length]
    let t
    if (!deleting && text === word) {
      t = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && text === '') {
      t = setTimeout(() => {
        setDeleting(false)
        setIndex((i) => i + 1)
      }, 300)
    } else {
      t = setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? 45 : 90,
      )
    }
    return () => clearTimeout(t)
  }, [text, deleting, index, words])

  return text
}

function Counter({ value, suffix = '' }) {
  const [n, setN] = useState(0)

  useEffect(() => {
    let frame
    const tick = (start) => (now) => {
      const p = Math.min(Math.max((now - start) / 1400, 0), 1)
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) frame = requestAnimationFrame(tick(start))
    }
    const t = setTimeout(() => {
      frame = requestAnimationFrame(tick(performance.now()))
    }, 600)
    return () => {
      clearTimeout(t)
      cancelAnimationFrame(frame)
    }
  }, [value])

  return (
    <>
      {n}
      {suffix}
    </>
  )
}

const techCount = skills.reduce((sum, s) => sum + s.items.length, 0)

const stats = [
  { value: 15, suffix: '', label: 'dépôts sur GitHub' },
  { value: techCount, suffix: '', label: 'technologies' },
  { value: 4, suffix: ' ans', label: 'de formation en informatique' },
]

function spotlight(e) {
  const card = e.target.closest?.('.card')
  if (!card) return
  const r = card.getBoundingClientRect()
  card.style.setProperty('--mx', `${e.clientX - r.left}px`)
  card.style.setProperty('--my', `${e.clientY - r.top}px`)
}

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll('.reveal')
    document.querySelectorAll('.block').forEach((block) => {
      block.querySelectorAll('.reveal').forEach((el, i) => {
        el.style.transitionDelay = `${i * 90}ms`
      })
    })
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

function App() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'light'
    } catch {
      return 'light'
    }
  })
  const [copied, setCopied] = useState(false)
  const active = useActiveSection()
  const typed = useTyping(roles)
  useReveal()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'light' ? '#f3f4f6' : '#070b14')
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // stockage indisponible (navigation privée) : le thème reste valable pour la session
    }
  }, [theme])

  // le contenu est rendu par React : on applique l'ancre de l'URL (ex. #projets) après le montage
  useEffect(() => {
    if (window.location.hash) {
      document.querySelector(window.location.hash)?.scrollIntoView()
    }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(window.scrollY > 400)
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <div className="site" onMouseMove={spotlight}>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <div className="orbs" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <a className="skip-link" href="#main">
        Aller au contenu
      </a>

      <header className="nav">
        <a className="logo" href="#accueil" aria-label="Retour à l’accueil">
          <img className="logo-mark" src={logo} alt="" width="44" height="44" />
          <span className="logo-text">
            <strong>
              Jean-Morelle<span>.</span>
            </strong>
            <small>Développeur Full Stack</small>
          </span>
        </a>
        <nav aria-label="Navigation principale">
          <ul id="nav-links" className={`nav-links ${open ? 'open' : ''}`}>
            {links.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={active === item.href ? 'active' : ''}
                  aria-current={active === item.href ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav-tools">
          <button
            className="theme-btn"
            type="button"
            aria-label={theme === 'light' ? 'Passer en thème sombre' : 'Passer en thème clair'}
            title={theme === 'light' ? 'Thème sombre' : 'Thème clair'}
            onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button
            className="menu-btn"
            type="button"
            aria-expanded={open}
            aria-controls="nav-links"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`burger ${open ? 'open' : ''}`} aria-hidden="true" />
          </button>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="accueil">
          <div className="hero-copy">
            <p className="status">
              <span className="dot" aria-hidden="true" />
              Disponible pour un poste ou un stage
            </p>
            <h1>
              Hello, je suis <em>Jean‑Morelle</em> KOUDORO
            </h1>
            <p className="role">
              Développeur{' '}
              <span className="typed" aria-label={roles.join(', ')}>
                {typed}
              </span>
            </p>
            <p className="lead">
              Je conçois des API REST modernes, sécurisées et maintenables avec C# et
              ASP.NET Core, et je livre aussi des sites en production avec Laravel. Un
              projet ou un besoin technique ? Parlons-en.
            </p>
            <div className="actions">
              <a className="btn btn-primary" href="#contact">
                Me contacter
              </a>
              <a className="btn btn-ghost" href={cv} download={CV_NAME}>
                Télécharger le CV
              </a>
              <a className="btn btn-link" href={LINKEDIN} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
            </div>
            <dl className="stats">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>
                    <Counter value={s.value} suffix={s.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="hero-photo">
            <div className="photo-frame">
              <img
                src={photo}
                alt="Portrait de Jean-Morelle KOUDORO"
                width="380"
                height="460"
                fetchPriority="high"
              />
            </div>
            <div className="photo-badge">
              <strong>.NET</strong>
              <span>Back-end</span>
            </div>
            <ul className="floating-tags" aria-hidden="true">
              <li>C#</li>
              <li>ASP.NET Core</li>
              <li>PostgreSQL</li>
            </ul>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map((k) => (
              <span key={k}>
                {skills
                  .flatMap((s) => s.items)
                  .map((t) => (
                    <b key={t}>{t}</b>
                  ))}
              </span>
            ))}
          </div>
        </div>

        <section className="block" id="apropos">
          <p className="kicker">À propos</p>
          <h2>Un profil junior, déjà orienté production</h2>
          <div className="about-grid">
            <article className="card reveal">
              <p>
                Jeune diplômé d’une Licence en Architecture Logicielle à l’ESGIS Avédji,
                je me spécialise dans le développement back-end avec C#, ASP.NET Core et
                les bases de données relationnelles. J’ai également conçu et mis en ligne
                le site de l’entreprise GKAS-GROUP avec Laravel et MySQL.
              </p>
              <p>
                J’applique la Clean Architecture, le Repository Pattern et les bonnes
                pratiques pour livrer des APIs claires et maintenables. Curieux,
                rigoureux et motivé, je cherche à rejoindre une équipe pour contribuer à
                des projets concrets.
              </p>
            </article>
            <aside className="card meta reveal">
              <div>
                <span className="meta-label">Localisation</span>
                Attiégou, Togo
              </div>
              <div>
                <span className="meta-label">Formation</span>
                Licence Architecture Logicielle — ESGIS
              </div>
              <div>
                <span className="meta-label">Langues</span>
                Français (professionnel) · Anglais (intermédiaire)
              </div>
            </aside>
          </div>
        </section>

        <section className="block" id="competences">
          <p className="kicker">Compétences</p>
          <h2>Ma boîte à outils</h2>
          <div className="skills-grid">
            {skills.map((s) => (
              <article className="card reveal" key={s.group}>
                <h3>{s.group}</h3>
                <ul className="chips">
                  {s.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="block" id="projets">
          <p className="kicker">Projets</p>
          <h2>Ce que j’ai construit</h2>

          <article className="card featured reveal">
            <a
              className="featured-shot"
              href={featured.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Voir le site ${featured.name}`}
            >
              <span className="browser-bar" aria-hidden="true">
                <i />
                <i />
                <i />
                <span>{featured.url.replace('https://', '').replace(/\/$/, '')}</span>
              </span>
              <img
                src={gkasShot}
                alt={`Page d’accueil du site ${featured.name}`}
                width="960"
                height="600"
                loading="lazy"
              />
            </a>
            <div className="featured-body">
              <span className="live">
                <span className="dot" aria-hidden="true" />
                {featured.type}
              </span>
              <h3>{featured.name}</h3>
              <p>{featured.desc}</p>
              <ul className="chips small">
                {featured.stack.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <a className="btn btn-primary" href={featured.url} target="_blank" rel="noreferrer">
                Voir le site en ligne ↗
              </a>
            </div>
          </article>

          <div className="projects-grid">
            {projects.map((p) => (
              <article className="card project reveal" key={p.name}>
                <a
                  className="project-shot"
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Voir le code de ${p.name}`}
                >
                  <span className="browser-bar" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <img
                    src={p.image}
                    alt={`Capture d’écran de ${p.name}`}
                    width="900"
                    height="425"
                    loading="lazy"
                  />
                </a>
                <div className="project-head">
                  <h3>{p.name}</h3>
                  <span className="project-type">{p.type}</span>
                </div>
                <p>{p.desc}</p>
                <ul className="chips small">
                  {p.stack.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <a className="project-link" href={p.repo} target="_blank" rel="noreferrer">
                  Voir le code ↗
                </a>
              </article>
            ))}
          </div>
          <div className="projects-more">
            <a className="btn btn-ghost" href={GITHUB} target="_blank" rel="noreferrer">
              Voir tous mes projets sur GitHub ↗
            </a>
          </div>
        </section>

        <section className="block" id="parcours">
          <p className="kicker">Parcours</p>
          <h2>Formation</h2>
          <ol className="timeline">
            {timeline.map((t) => (
              <li className="reveal" key={t.years}>
                <span className="years">{t.years}</span>
                <h3>{t.title}</h3>
                <p>{t.place}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="block" id="services">
          <p className="kicker">Services</p>
          <h2>Ce que je peux apporter</h2>
          <div className="services">
            {services.map((s) => (
              <article className="card service reveal" key={s.title}>
                <span className="service-icon" aria-hidden="true">
                  {s.icon}
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="block" id="contact">
          <p className="kicker">Contact</p>
          <h2>Travaillons ensemble</h2>
          <div className="contact-grid">
            <div className="card contact-links reveal">
              <p>
                Une opportunité, une question ou un projet ? Je réponds généralement
                sous 24 h.
              </p>
              <div className="contact-row">
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                <button className="copy-btn" type="button" onClick={copyEmail}>
                  {copied ? 'Copié ✓' : 'Copier'}
                </button>
              </div>
              <a href="tel:+22890570424">+228 90 57 04 24</a>
              <a className="whatsapp" href={WHATSAPP} target="_blank" rel="noreferrer">
                WhatsApp : +228 96 19 09 28
              </a>
              <a href={GITHUB} target="_blank" rel="noreferrer">
                GitHub — jean-morelle
              </a>
              <a href={LINKEDIN} target="_blank" rel="noreferrer">
                LinkedIn — Jean-Morelle KOUDORO
              </a>
              <a className="btn btn-primary" href={cv} download={CV_NAME}>
                Télécharger le CV
              </a>
            </div>
            <form
              className="card reveal"
              onSubmit={(e) => {
                e.preventDefault()
                const data = new FormData(e.currentTarget)
                const subject = encodeURIComponent(`Contact portfolio — ${data.get('name')}`)
                const body = encodeURIComponent(
                  `${data.get('message')}\n\n${data.get('name')}\n${data.get('email')}`,
                )
                window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
              }}
            >
              <label>
                Nom
                <input name="name" autoComplete="name" required />
              </label>
              <label>
                Email
                <input name="email" type="email" autoComplete="email" required />
              </label>
              <label>
                Message
                <textarea name="message" required />
              </label>
              <button className="btn btn-primary" type="submit">
                Envoyer
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>
          © {new Date().getFullYear()} <strong>Jean-Morelle KOUDORO</strong>
        </span>
        <span className="footer-links">
          <a href={WHATSAPP} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={GITHUB} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </span>
      </footer>

      <a
        className="wa-float"
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        aria-label="Me contacter sur WhatsApp"
      >
        <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
          <path
            fill="currentColor"
            d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.2.6 4.4 1.7 6.3L3 29l7.3-1.9c1.8 1 3.8 1.5 5.8 1.5 7 0 12.7-5.6 12.7-12.6S23 3 16 3Zm0 23.1c-1.9 0-3.7-.5-5.3-1.4l-.4-.2-4.3 1.1 1.2-4.2-.3-.4a10.4 10.4 0 0 1-1.6-5.5C5.3 9.8 10.1 5.1 16 5.1s10.7 4.7 10.7 10.5S21.9 26.1 16 26.1Zm5.9-7.8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.4c.2.2 2.4 3.6 5.8 5 .8.4 1.4.6 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4Z"
          />
        </svg>
      </a>

      <a
        className={`to-top ${scrolled ? 'show' : ''}`}
        href="#accueil"
        aria-label="Remonter en haut"
      >
        ↑
      </a>
    </div>
  )
}

export default App
