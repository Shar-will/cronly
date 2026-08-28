import { Link } from 'react-router-dom'
import { labs } from './registry'

export function LabHome() {
  return (
    <main className="lab-home">
      <header className="lab-home-header">
        <p className="lab-home-eyebrow">Cronly Lab</p>
        <h1>Component playground</h1>
        <p className="lab-home-lede">
          Open a component to experiment. Add the next one in{' '}
          <code>src/lab/registry.ts</code>.
        </p>
      </header>
      <ol className="lab-list">
        {labs.map((lab, index) => (
          <li key={lab.id}>
            <Link className="lab-row" to={lab.path}>
              <span className="lab-row-index">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="lab-row-title">{lab.title}</span>
              <span className="lab-row-desc">{lab.description}</span>
              <span className="lab-row-go" aria-hidden>
                →
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  )
}
