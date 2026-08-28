import { DialRoot } from 'dialkit'
import 'dialkit/styles.css'
import { GradientGrid } from '../GradientGrid'
import { LabShell } from '../lab/LabShell'

export function ShaderLab() {
  return (
    <div className="lab-stage">
      <LabShell title="Shader" />
      <GradientGrid />
      <DialRoot />
    </div>
  )
}
