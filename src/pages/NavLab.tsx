import { Nav } from '../components/Nav'
import { LabShell } from '../lab/LabShell'

export function NavLab() {
  return (
    <div className="lab-stage">
      <LabShell title="Nav" />
      <div className="lab-canvas">
        <Nav />
      </div>
    </div>
  )
}
