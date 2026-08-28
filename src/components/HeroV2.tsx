import { useDialKit } from 'dialkit'
import { GradientGrid } from '../GradientGrid'
import { HeroChrome, useHeroLayout } from './hero-shared'
import './Hero.css'

export function HeroV2() {
  const { setStage, p, illustration } = useHeroLayout()

  const circle = useDialKit(
    'Circle',
    {
      x: [50, -20, 120, 0.5],
      y: [127, 20, 180, 0.5],
      width: [141.5, 20, 220, 0.5],
      height: [163.5, 20, 260, 0.5],
      inner: [49, 0, 100, 1],
      outer: [100, 20, 100, 1],
    },
    { id: 'hero-v2-circle', persist: true },
  )

  const maskImage = `radial-gradient(ellipse ${circle.width / 2}% ${circle.height / 2}% at ${circle.x}% ${circle.y}%, #000 ${circle.inner}%, transparent ${circle.outer}%)`

  return (
    <section ref={setStage} className="hero" id="top">
      <div
        className="hero-v2-bg"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      >
        <GradientGrid />
      </div>

      {p.guides ? (
        <div
          className="hero-v2-guide"
          style={{
            left: `${circle.x}%`,
            top: `${circle.y}%`,
            width: `${circle.width}%`,
            height: `${circle.height}%`,
          }}
        />
      ) : null}

      <HeroChrome p={p} illustration={illustration} />
    </section>
  )
}
