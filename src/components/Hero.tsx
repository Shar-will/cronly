import type { CSSProperties } from 'react'
import { useDialKit } from 'dialkit'
import { GradientGrid } from '../GradientGrid'
import { HeroChrome, useHeroLayout } from './hero-shared'
import './Hero.css'

export function Hero() {
  const { setStage, p, illustration, illustrationBehind } = useHeroLayout()

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
        y: [127, 20, 180, 0.5],
        width: [141.5, 20, 220, 0.5],
        height: [163.5, 20, 260, 0.5],
        inner: [49, 0, 100, 1],
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
    { id: 'hero-mask-v2', persist: true },
  )

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

      <HeroChrome p={p} illustration={illustrationBehind ? null : illustration} />
    </section>
  )
}
