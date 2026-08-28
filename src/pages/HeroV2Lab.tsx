import { DialRoot } from 'dialkit'
import 'dialkit/styles.css'
import { HeroV2 } from '../components/HeroV2'
import { LabShell } from '../lab/LabShell'

export function HeroV2Lab() {
  return (
    <div className="lab-stage">
      <LabShell title="Hero v2" />
      <HeroV2 />
      <DialRoot />
    </div>
  )
}
