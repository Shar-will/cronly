import { Link } from 'react-router-dom'

type LabShellProps = {
  title: string
}

export function LabShell({ title }: LabShellProps) {
  return (
    <div className="lab-shell">
      <Link className="lab-shell-back" to="/">
        Lab
      </Link>
      <span className="lab-shell-title">{title}</span>
    </div>
  )
}
