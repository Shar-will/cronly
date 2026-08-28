import { useState } from 'react'
import type { CSSProperties } from 'react'
import { useDialKit, useDialKitController } from 'dialkit'
import { GradientGrid } from '../GradientGrid'
import { Nav } from './Nav'
import { HeroIllustration } from './HeroIllustration'
import './Hero.css'

export function Hero() {
  const [stage, setStage] = useState<HTMLElement | null>(null)
  const [clearToken, setClearToken] = useState(0)

  const mask = useDialKit(
    'Mask',
    {
      dim: {
        visible: true,
        color: '#000000',
        opacity: [0.4, 0, 1, 0.01],
      },
      blob: {
        visible: true,
        color: '#000000',
        x: [50, -20, 120, 0.5],
        y: [137, 20, 180, 0.5],
        width: [112, 20, 220, 0.5],
        height: [172, 20, 260, 0.5],
        inner: [42, 0, 100, 1],
        outer: [100, 20, 100, 1],
        opacity: [1, 0, 1, 0.01],
        blend: {
          type: 'select',
          options: [
            { value: 'normal', label: 'Normal' },
            { value: 'multiply', label: 'Multiply' },
            { value: 'darken', label: 'Darken' },
            { value: 'plus-darker', label: 'Plus darker' },
          ],
          default: 'normal',
        },
      },
    },
    { id: 'hero-mask', persist: true },
  )

  const layout = useDialKitController(
    'Layout',
    {
      nav: true,
      guides: false,
      headline: {
        visible: true,
        y: [23.6, 8, 70, 0.1],
        width: [61, 32, 92, 0.5],
        size: [64, 28, 96, 1],
        line1: 'Cron monitoring',
        line2: 'that fits in one terminal window',
      },
      illustration: {
        visible: true,
        layer: {
          type: 'select',
          options: [
            { value: 'front', label: 'In front of mask' },
            { value: 'back', label: 'Behind mask' },
          ],
          default: 'front',
        },
        x: [50, 0, 100, 0.1],
        y: [78, 20, 110, 0.1],
        width: [42, 8, 90, 0.5],
        rotation: [0, -30, 30, 0.5],
        opacity: [1, 0, 1, 0.01],
        url: { type: 'text', default: '', placeholder: 'https://…' },
        blend: {
          type: 'select',
          options: [
            { value: 'normal', label: 'Normal' },
            { value: 'screen', label: 'Screen' },
            { value: 'lighten', label: 'Lighten' },
            { value: 'multiply', label: 'Multiply' },
            { value: 'overlay', label: 'Overlay' },
          ],
          default: 'normal',
        },
        clear: { type: 'action', label: 'Clear illustration' },
      },
    },
    {
      id: 'hero-layout',
      persist: true,
      onAction: (path) => {
        if (path === 'illustration.clear') setClearToken((n) => n + 1)
      },
    },
  )

  const p = layout.values
  const illustrationBehind = p.illustration.layer === 'back'

  const illustration = p.illustration.visible ? (
    <HeroIllustration
      x={p.illustration.x}
      y={p.illustration.y}
      width={p.illustration.width}
      rotation={p.illustration.rotation}
      opacity={p.illustration.opacity}
      blend={p.illustration.blend}
      url={p.illustration.url}
      guides={p.guides}
      stage={stage}
      onClear={clearToken}
      zIndex={illustrationBehind ? 2 : 4}
      onMove={(nextX, nextY) => {
        layout.setValues({
          illustration: {
            x: Math.min(100, Math.max(0, nextX)),
            y: Math.min(110, Math.max(20, nextY)),
          },
        })
      }}
    />
  ) : null

  return (
    <section ref={setStage} className="hero" id="top">
      <div className="hero-bg">
        <GradientGrid />
      </div>

      {mask.dim.visible ? (
        <div
          className="hero-dim"
          style={{
            background: mask.dim.color,
            opacity: mask.dim.opacity,
          }}
        />
      ) : null}

      {illustrationBehind ? illustration : null}

      {mask.blob.visible ? (
        <div
          className="hero-blob"
          style={{
            left: `${mask.blob.x}%`,
            top: `${mask.blob.y}%`,
            width: `${mask.blob.width}%`,
            height: `${mask.blob.height}%`,
            opacity: mask.blob.opacity,
            mixBlendMode: mask.blob.blend as CSSProperties['mixBlendMode'],
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(ellipse at center, ${mask.blob.color} ${mask.blob.inner}%, transparent ${mask.blob.outer}%)`,
          }}
        />
      ) : null}

      {illustrationBehind ? null : illustration}

      {p.headline.visible ? (
        <h1
          className="hero-copy"
          style={{
            top: `${p.headline.y}%`,
            width: `${p.headline.width}%`,
            fontSize: `clamp(1.75rem, 4.2vw, ${p.headline.size}px)`,
          }}
        >
          <span>{p.headline.line1}</span>
          <span>{p.headline.line2}</span>
        </h1>
      ) : null}

      {p.nav ? (
        <div className="hero-nav">
          <Nav />
        </div>
      ) : null}
    </section>
  )
}
