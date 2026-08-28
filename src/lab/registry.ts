import type { ComponentType } from 'react'
import { ButtonLab } from '../pages/ButtonLab'
import { HeroLab } from '../pages/HeroLab'
import { HeroV2Lab } from '../pages/HeroV2Lab'
import { NavLab } from '../pages/NavLab'
import { ShaderLab } from '../pages/ShaderLab'

export type Lab = {
  id: string
  title: string
  description: string
  path: `/${string}`
  Component: ComponentType
}

/**
 * Add a lab: create a page in `src/pages`, then append an entry here.
 * It will appear on the home page and get a route automatically.
 */
export const labs: Lab[] = [
  {
    id: 'hero',
    title: 'Hero',
    description: 'Landing frame: shader, mask, type, illustration',
    path: '/hero',
    Component: HeroLab,
  },
  {
    id: 'hero-v2',
    title: 'Hero v2',
    description: 'Shader clipped to the bottom circle',
    path: '/hero-v2',
    Component: HeroV2Lab,
  },
  {
    id: 'nav',
    title: 'Nav',
    description: 'Floating pill navigation',
    path: '/nav',
    Component: NavLab,
  },
  {
    id: 'button',
    title: 'Button',
    description: 'Primary CTA',
    path: '/button',
    Component: ButtonLab,
  },
  {
    id: 'shader',
    title: 'Shader',
    description: 'Gradient grid background',
    path: '/shader',
    Component: ShaderLab,
  },
]
