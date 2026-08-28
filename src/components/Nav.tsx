import wordmark from '../assets/cronly-wordmark.png'
import github from '../assets/github.svg'
import { Button } from './Button'
import './Nav.css'

const LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#docs', label: 'Docs' },
] as const

export function Nav() {
  return (
    <nav className="cronly-nav" aria-label="Primary">
      <a href="#top" aria-label="Cronly">
        <img
          className="cronly-nav-wordmark"
          src={wordmark}
          width={115}
          height={39}
          alt="Cronly"
        />
      </a>
      <div className="cronly-nav-links">
        {LINKS.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
        <a
          className="cronly-nav-github"
          href="https://github.com"
          aria-label="GitHub"
          target="_blank"
          rel="noreferrer"
        >
          <img src={github} width={18} height={18} alt="" />
        </a>
      </div>
      <Button>Start free</Button>
    </nav>
  )
}
