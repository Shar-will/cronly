import { useState } from 'react'
import copyPlus from '../assets/copy-plus.svg'

const COMMAND = 'npx cronly init'

export function CopyCommand() {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(COMMAND)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1400)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      className="hero-copy-cmd"
      onClick={copy}
      aria-label={copied ? 'Copied command' : `Copy ${COMMAND}`}
    >
      <span className="hero-copy-cmd-text">{COMMAND}</span>
      <img src={copyPlus} width={14} height={14} alt="" />
      <span className="hero-copy-cmd-status" aria-live="polite">
        {copied ? 'Copied' : ''}
      </span>
    </button>
  )
}
