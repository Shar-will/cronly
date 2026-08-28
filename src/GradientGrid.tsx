import { useMemo } from 'react'
import { useDialKit } from 'dialkit'
import {
  Shader,
  MeshGradient,
  Grid,
  FlowField,
  FilmGrain,
} from 'shaders/react'
import type { BlendMode } from 'shaders/core'

const FILL = {
  width: '100%',
  height: '100%',
} as const

const BIAS = [0.05, 5, 0.01] as const

function weightedStops(entries: Array<{ color: string; bias: number }>) {
  const weights = entries.map((entry) => Math.max(entry.bias, 0.05))
  const total = weights.reduce((sum, weight) => sum + weight, 0)
  let acc = 0

  return entries.map((entry, index) => {
    if (index === 0) return { color: entry.color, position: 0 }
    acc += weights[index - 1]
    return {
      color: entry.color,
      position: index === entries.length - 1 ? 1 : acc / total,
    }
  })
}

export function GradientGrid() {
  const p = useDialKit(
    'Gradient Grid',
    {
      colors: {
        background: {
          color: '#000000',
          bias: [5, ...BIAS],
        },
        primary: {
          color: '#2a3ef4',
          bias: [1.00, ...BIAS],
        },
        secondary: {
          color: '#1384e7',
          bias: [0.3, ...BIAS],
        },
        tertiary: {
          color: '#e4e5f2',
          bias: [1.03, ...BIAS],
        },
        grid: '#FFFFFF',
      },
      animation: {
        speed: [0.54, 0, 10, 0.01],
        seed: [34, 0, 100, 1],
      },
      distortion: {
        strength: [1, 0, 1, 0.01],
        detail: [0.49, 0.2, 8, 0.01],
        flowSpeed: [0.62, 0, 8, 0.01],
      },
      mesh: {
        count: [3, 2, 8, 1],
        smoothness: [5, 0, 5, 0.01],
        variation: [0.06, 0, 1, 0.01],
        swirl: [0.03, -1, 1, 0.01],
        drift: [0.35, 0, 1, 0.01],
        wrapping: [0, 0, 1, 0.01],
      },
      grid: {
        visible: true,
        cells: [28, 2, 48, 1],
        thickness: [0.045, 0.005, 0.5, 0.005],
        softness: [0, 0, 1, 0.01],
        opacity: [0.47, 0, 1, 0.01],
        rotation: [0, 0, 45, 0.1],
        blend: {
          type: 'select',
          options: [
            { value: 'overlay', label: 'Overlay' },
            { value: 'softLight', label: 'Soft light' },
            { value: 'screen', label: 'Screen' },
            { value: 'normal', label: 'Normal' },
          ],
          default: 'screen',
        },
      },
      grain: {
        strength: [0.19, 0, 1, 0.01],
        bias: [1.6, 0, 10, 0.1],
        animated: false,
      },
    },
    { id: 'gradient-grid-smooth-v3', persist: true },
  )

  const stops = useMemo(
    () =>
      weightedStops([
        { color: p.colors.background.color, bias: p.colors.background.bias },
        { color: p.colors.primary.color, bias: p.colors.primary.bias },
        { color: p.colors.secondary.color, bias: p.colors.secondary.bias },
        { color: p.colors.tertiary.color, bias: p.colors.tertiary.bias },
      ]),
    [
      p.colors.background.color,
      p.colors.background.bias,
      p.colors.primary.color,
      p.colors.primary.bias,
      p.colors.secondary.color,
      p.colors.secondary.bias,
      p.colors.tertiary.color,
      p.colors.tertiary.bias,
    ],
  )

  return (
    <div className="stage" style={{ background: p.colors.background.color }}>
      <Shader style={FILL} disableTelemetry>
        <FilmGrain
          strength={p.grain.strength}
          bias={p.grain.bias}
          animated={p.grain.animated}
        >
          <FlowField
            strength={p.distortion.strength}
            detail={p.distortion.detail}
            speed={p.distortion.flowSpeed}
            seed={p.animation.seed}
            edges="mirror"
          >
            <MeshGradient
              colorA={p.colors.background.color}
              colorB={p.colors.secondary.color}
              stops={stops}
              colorSpace="oklab"
              count={p.mesh.count}
              smoothness={p.mesh.smoothness}
              variation={p.mesh.variation}
              swirl={p.mesh.swirl}
              drift={p.mesh.drift}
              wrapping={p.mesh.wrapping}
              speed={p.animation.speed}
              seed={p.animation.seed}
            />
          </FlowField>
        </FilmGrain>
        <Grid
          color={p.colors.grid}
          cells={p.grid.cells}
          thickness={p.grid.thickness}
          softness={p.grid.softness}
          rotation={p.grid.rotation}
          opacity={p.grid.opacity}
          visible={p.grid.visible}
          blendMode={p.grid.blend as BlendMode}
        />
      </Shader>
    </div>
  )
}
