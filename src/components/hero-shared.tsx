import { useState } from 'react'
import type { ReactNode } from 'react'
import { useDialKitController } from 'dialkit'
import { Button } from './Button'
import { CopyCommand } from './CopyCommand'
import { Nav } from './Nav'
import { HeroIllustration } from './HeroIllustration'

export function useHeroLayout() {
  const [stage, setStage] = useState<HTMLElement | null>(null)
  const [clearToken, setClearToken] = useState(0)

  const layout = useDialKitController(
    'Layout',
    {
      nav: true,
      guides: false,
      headline: {
        visible: true,
        y: [22.7, 8, 70, 0.1],
        width: [61, 32, 92, 0.5],
        size: [48, 28, 96, 1],
        line1: 'One curl command.',
        line2: 'Every silent failure, caught.',
      },
      subhead: {
        visible: true,
        size: [24, 14, 36, 1],
        text: 'Cronly pings your endpoint, you get alerted the moment it stops. That’s the whole product — no dashboard tour required.',
      },
      cta: true,
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
      id: 'hero-layout-v2',
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

  return { stage, setStage, p, illustration, illustrationBehind }
}

export function HeroChrome({
  p,
  illustration,
}: {
  p: ReturnType<typeof useHeroLayout>['p']
  illustration: ReactNode
}) {
  return (
    <>
      {illustration}
      {p.headline.visible ? (
        <div
          className="hero-text"
          style={{
            top: `${p.headline.y}%`,
            width: `${p.headline.width}%`,
          }}
        >
          <h1
            className="hero-headline"
            style={{
              fontSize: `clamp(1.75rem, 4.2vw, ${p.headline.size}px)`,
            }}
          >
            <span>{p.headline.line1}</span>
            <span>{p.headline.line2}</span>
          </h1>
          {p.subhead.visible ? (
            <p
              className="hero-subhead"
              style={{
                fontSize: `clamp(1rem, 2vw, ${p.subhead.size}px)`,
              }}
            >
              {p.subhead.text}
            </p>
          ) : null}
          {p.cta ? (
            <div className="hero-cta">
              <Button>Start free</Button>
              <CopyCommand />
            </div>
          ) : null}
        </div>
      ) : null}
      {p.nav ? (
        <div className="hero-nav">
          <Nav />
        </div>
      ) : null}
    </>
  )
}
