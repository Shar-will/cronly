import type { ButtonHTMLAttributes, ReactNode } from 'react'
import arrow from '../assets/arrow.svg'
import './Button.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode
}

export function Button({
  children = 'Start free',
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={['cronly-btn', className].filter(Boolean).join(' ')}
      {...props}
    >
      <span className="cronly-btn-glow" aria-hidden />
      <span className="cronly-btn-frame">
        <span className="cronly-btn-face">
          <span className="cronly-btn-label">{children}</span>
          <img className="cronly-btn-arrow" src={arrow} width={15} height={14} alt="" />
        </span>
      </span>
    </button>
  )
}
