import { DialRoot } from 'dialkit'
import 'dialkit/styles.css'
import { Hero } from '../components/Hero'
import { LabShell } from '../lab/LabShell'

export function HeroLab() {
  return (
    <div className="lab-stage">
      <LabShell title="Hero" />
      <Hero />
      <DialRoot />
    </div>
  )
}
