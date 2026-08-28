import { Button } from '../components/Button'
import { LabShell } from '../lab/LabShell'

export function ButtonLab() {
  return (
    <div className="lab-stage">
      <LabShell title="Button" />
      <div className="lab-canvas">
        <Button>Start free</Button>
      </div>
    </div>
  )
}
