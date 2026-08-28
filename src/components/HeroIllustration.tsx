import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react'

type HeroIllustrationProps = {
  x: number
  y: number
  width: number
  rotation: number
  opacity: number
  blend: string
  url: string
  guides: boolean
  stage: HTMLElement | null
  onMove: (x: number, y: number) => void
  onClear: number
  zIndex: number
}

export function HeroIllustration({
  x,
  y,
  width,
  rotation,
  opacity,
  blend,
  url,
  guides,
  stage,
  onMove,
  onClear,
  zIndex,
}: HeroIllustrationProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const fileUrl = useRef<string | null>(null)
  const drag = useRef<{ dx: number; dy: number } | null>(null)
  const moved = useRef(false)
  const [dropped, setDropped] = useState<string | null>(null)
  const [over, setOver] = useState(false)

  const src = dropped ?? (url.trim() || null)

  useEffect(() => {
    if (onClear === 0 || !fileUrl.current) return
    URL.revokeObjectURL(fileUrl.current)
    fileUrl.current = null
    setDropped(null)
  }, [onClear])

  useEffect(() => {
    return () => {
      if (fileUrl.current) URL.revokeObjectURL(fileUrl.current)
    }
  }, [])

  function takeFile(file: File | undefined) {
    if (!file || !file.type.startsWith('image/')) return
    if (fileUrl.current) URL.revokeObjectURL(fileUrl.current)
    const next = URL.createObjectURL(file)
    fileUrl.current = next
    setDropped(next)
  }

  function onPointerDown(event: ReactPointerEvent<HTMLButtonElement>) {
    if (!stage || event.button !== 0) return
    event.currentTarget.setPointerCapture(event.pointerId)
    moved.current = false
    const rect = stage.getBoundingClientRect()
    drag.current = {
      dx: event.clientX - (rect.left + (x / 100) * rect.width),
      dy: event.clientY - (rect.top + (y / 100) * rect.height),
    }
  }

  function onPointerMove(event: ReactPointerEvent<HTMLButtonElement>) {
    if (!stage || !drag.current) return
    moved.current = true
    const rect = stage.getBoundingClientRect()
    onMove(
      ((event.clientX - drag.current.dx - rect.left) / rect.width) * 100,
      ((event.clientY - drag.current.dy - rect.top) / rect.height) * 100,
    )
  }

  return (
    <button
      type="button"
      className={[
        'hero-illustration',
        src ? '' : 'is-empty',
        guides ? 'is-guided' : '',
        over ? 'is-over' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${width}%`,
        opacity,
        zIndex,
        mixBlendMode: blend as CSSProperties['mixBlendMode'],
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={() => {
        drag.current = null
      }}
      onDragOver={(event) => {
        event.preventDefault()
        setOver(true)
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(event) => {
        event.preventDefault()
        setOver(false)
        takeFile(event.dataTransfer.files[0])
      }}
      onClick={(event) => {
        if (moved.current) {
          event.preventDefault()
          return
        }
        if (!src) inputRef.current?.click()
      }}
      aria-label={src ? 'Move illustration' : 'Add illustration'}
    >
      {src ? (
        <img className="hero-illustration-img" src={src} alt="" draggable={false} />
      ) : (
        <span className="hero-illustration-hint">Drop an illustration here, or click to upload</span>
      )}
      <input
        ref={inputRef}
        className="hero-file"
        type="file"
        accept="image/*"
        onChange={(event) => {
          takeFile(event.target.files?.[0])
          event.target.value = ''
        }}
      />
    </button>
  )
}
