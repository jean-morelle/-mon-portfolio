import { useEffect, useRef, useState } from 'react'
import photo from './images/portrait.jpg'
import cv from './images/cv.pdf'
import gkasShot from './images/gkas-group.jpg'
import logo from './images/logo-mark.png'
import digitalAllianceShot from './images/DigitalAlliance.png'
import collectPlusShot from './images/collectplus.png'
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
  { group: 'Back-end', items: ['ASP.NET Core Web API', 'Laravel'] },
  { group: 'Architecture', items: ['Repository Pattern'] },
  { group: 'Données', items: ['PostgreSQL', 'MySQL', 'SQL Server'] },
  { group: 'Front-end', items: ['React', 'Blade'] },
  { group: 'Outils', items: ['Git', 'GitHub', 'Swagger', 'Visual Studio', 'UML'] },
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
  {
    name: 'CollectPlus Togo',
    type: 'Gestion des déchets',
    desc: 'Service de gestion des déchets à Lomé : signalement de dépôts sauvages avec photo, jours de passage par quartier et suivi des demandes jusqu’à leur résolution.',
    stack: ['Laravel', 'PHP', 'Blade', 'JavaScript'],
    image: collectPlusShot,
    repo: repo('Gestion-Dechets'),
  },
]

const timeline = [
  { years: '2024 – 2025', title: 'Licence Architecture Logicielle', place: 'ESGIS Avédji' },
  { years: '2022 – 2023', title: 'Informatique, Réseaux et Télécoms', place: 'ESGIS' },
  { years: '2021 – 2022', title: '1re année IRT', place: 'ESGIS Kodjoviakopé' },
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

function useCarousel() {
  const trackRef = useRef(null)
  const pausedRef = useRef(false)

  const scroll = (dir) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('.project')
    const step = card ? card.offsetWidth + 22 : track.clientWidth
    const atStart = track.scrollLeft <= 4
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4
    if (dir > 0 && atEnd) track.scrollTo({ left: 0, behavior: 'smooth' })
    else if (dir < 0 && atStart) track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' })
    else track.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      if (!pausedRef.current) scroll(1)
    }, 4500)
    return () => clearInterval(id)
  }, [])

  const pause = {
    onMouseEnter: () => (pausedRef.current = true),
    onMouseLeave: () => (pausedRef.current = false),
    onFocus: () => (pausedRef.current = true),
    onBlur: () => (pausedRef.current = false),
    onTouchStart: () => (pausedRef.current = true),
  }

  return { trackRef, scroll, pause }
}

const roles = ['Back-end .NET', 'APIs REST', 'Clean Architecture', 'Full-stack React']

// Logos officiels (tracés Simple Icons), affichés aux couleurs de chaque marque
const brandIcons = {
  gmail: {
    color: '#EA4335',
    d: 'M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z',
  },
  phone: {
    color: 'var(--accent-ink)',
    d: 'M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z',
  },
  whatsapp: {
    color: '#25D366',
    d: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z',
  },
  github: {
    color: 'currentColor',
    d: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  },
  linkedin: {
    color: '#0A66C2',
    d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
}

const WA_SIZE = 54
const WA_MARGIN = 22

// Bulle WhatsApp déplaçable : on la glisse, elle se colle au bord le plus proche
function WhatsAppBubble() {
  const [pos, setPos] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('wa-pos'))
      if (saved && ['left', 'right'].includes(saved.side) && saved.ratio >= 0 && saved.ratio <= 1) {
        return saved
      }
    } catch {
      // stockage indisponible : position par défaut
    }
    return { side: 'left', ratio: 1 }
  })
  const [drag, setDrag] = useState(null)
  const [hint, setHint] = useState(false)
  const [, setViewport] = useState(0)
  const start = useRef(null)
  const moved = useRef(false)

  useEffect(() => {
    const onResize = () => setViewport((n) => n + 1)
    window.addEventListener('resize', onResize)
    const show = setTimeout(() => setHint(true), 3000)
    const hide = setTimeout(() => setHint(false), 8000)
    return () => {
      window.removeEventListener('resize', onResize)
      clearTimeout(show)
      clearTimeout(hide)
    }
  }, [])

  // À droite, on laisse de la place au bouton « remonter en haut »
  const maxY = (side) =>
    window.innerHeight - WA_SIZE - WA_MARGIN - (side === 'right' ? 56 : 0)
  const rest = {
    x: pos.side === 'left' ? WA_MARGIN : window.innerWidth - WA_SIZE - WA_MARGIN,
    y: WA_MARGIN + pos.ratio * Math.max(0, maxY(pos.side) - WA_MARGIN),
  }
  const current = drag || rest
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max)

  const onPointerDown = (e) => {
    if (e.button !== 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    start.current = { px: e.clientX, py: e.clientY, x: current.x, y: current.y }
    moved.current = false
  }

  const onPointerMove = (e) => {
    const s = start.current
    if (!s) return
    const dx = e.clientX - s.px
    const dy = e.clientY - s.py
    if (!moved.current && Math.hypot(dx, dy) < 6) return
    moved.current = true
    setHint(false)
    setDrag({
      x: clamp(s.x + dx, 0, window.innerWidth - WA_SIZE),
      y: clamp(s.y + dy, 0, window.innerHeight - WA_SIZE),
    })
  }

  const onPointerUp = () => {
    start.current = null
    if (!drag) return
    const side = drag.x + WA_SIZE / 2 < window.innerWidth / 2 ? 'left' : 'right'
    const range = Math.max(1, maxY(side) - WA_MARGIN)
    const next = { side, ratio: clamp((drag.y - WA_MARGIN) / range, 0, 1) }
    setPos(next)
    setDrag(null)
    try {
      localStorage.setItem('wa-pos', JSON.stringify(next))
    } catch {
      // stockage indisponible : la position reste valable pour la session
    }
  }

  return (
    <a
      className={`wa-float wa-${pos.side} ${drag ? 'dragging' : ''} ${hint ? 'hint' : ''}`}
      style={{ left: current.x, top: current.y }}
      href={WHATSAPP}
      target="_blank"
      rel="noreferrer"
      aria-label="Me contacter sur WhatsApp"
      draggable={false}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClick={(e) => {
        // un glisser-déposer ne doit pas ouvrir WhatsApp
        if (moved.current) {
          e.preventDefault()
          moved.current = false
        }
      }}
    >
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.2.6 4.4 1.7 6.3L3 29l7.3-1.9c1.8 1 3.8 1.5 5.8 1.5 7 0 12.7-5.6 12.7-12.6S23 3 16 3Zm0 23.1c-1.9 0-3.7-.5-5.3-1.4l-.4-.2-4.3 1.1 1.2-4.2-.3-.4a10.4 10.4 0 0 1-1.6-5.5C5.3 9.8 10.1 5.1 16 5.1s10.7 4.7 10.7 10.5S21.9 26.1 16 26.1Zm5.9-7.8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.4c.2.2 2.4 3.6 5.8 5 .8.4 1.4.6 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4Z"
        />
      </svg>
      <span className="wa-tip" aria-hidden="true">
        Discutons sur WhatsApp
      </span>
    </a>
  )
}

function BrandIcon({ name }) {
  const { color, d } = brandIcons[name]
  return (
    <svg className="brand-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path fill={color} d={d} />
    </svg>
  )
}

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
  { value: timeline.length, suffix: ' ans', label: 'de formation en informatique' },
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
  const [formStatus, setFormStatus] = useState({ state: 'idle', text: '' })

  const sendMessage = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const fields = Object.fromEntries(new FormData(form))
    setFormStatus({ state: 'sending', text: '' })

    // Sans API joignable (site statique en ligne), on retombe sur la messagerie du visiteur
    const openMailClient = () => {
      const subject = encodeURIComponent(`Contact portfolio — ${fields.name}`)
      const body = encodeURIComponent(`${fields.message}\n\n${fields.name}\n${fields.email}`)
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
      setFormStatus({ state: 'idle', text: '' })
    }

    let res
    try {
      res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
    } catch {
      return openMailClient()
    }

    if (res.ok) {
      form.reset()
      return setFormStatus({ state: 'ok', text: 'Merci ! Votre message a bien été envoyé.' })
    }
    if (res.status === 400) {
      const data = await res.json().catch(() => ({}))
      return setFormStatus({ state: 'error', text: data.error || 'Formulaire invalide.' })
    }
    openMailClient()
  }
  const active = useActiveSection()
  const typed = useTyping(roles)
  const carousel = useCarousel()
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

          <div className="carousel" {...carousel.pause}>
            <button
              className="carousel-btn prev"
              type="button"
              aria-label="Projet précédent"
              onClick={() => carousel.scroll(-1)}
            >
              ‹
            </button>
            <div className="projects-grid" ref={carousel.trackRef}>
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
            <button
              className="carousel-btn next"
              type="button"
              aria-label="Projet suivant"
              onClick={() => carousel.scroll(1)}
            >
              ›
            </button>
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
                <a className="contact-item" href={`mailto:${EMAIL}`}>
                  <BrandIcon name="gmail" />
                  {EMAIL}
                </a>
                <button className="copy-btn" type="button" onClick={copyEmail}>
                  {copied ? 'Copié ✓' : 'Copier'}
                </button>
              </div>
              <a className="contact-item" href="tel:+22890570424">
                <BrandIcon name="phone" />
                +228 90 57 04 24
              </a>
              <a
                className="contact-item whatsapp"
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
              >
                <BrandIcon name="whatsapp" />
                WhatsApp : +228 96 19 09 28
              </a>
              <a className="contact-item" href={GITHUB} target="_blank" rel="noreferrer">
                <BrandIcon name="github" />
                GitHub — jean-morelle
              </a>
              <a className="contact-item" href={LINKEDIN} target="_blank" rel="noreferrer">
                <BrandIcon name="linkedin" />
                LinkedIn — Jean-Morelle KOUDORO
              </a>
              <a className="btn btn-primary" href={cv} download={CV_NAME}>
                Télécharger le CV
              </a>
            </div>
            <form className="card reveal" onSubmit={sendMessage}>
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
              <button
                className="btn btn-primary"
                type="submit"
                disabled={formStatus.state === 'sending'}
              >
                {formStatus.state === 'sending' ? 'Envoi…' : 'Envoyer'}
              </button>
              {formStatus.text && (
                <p className={`form-status ${formStatus.state}`} role="status">
                  {formStatus.text}
                </p>
              )}
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

      <WhatsAppBubble />

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
