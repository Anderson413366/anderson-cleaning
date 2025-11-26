'use client'

import { type LucideIcon } from 'lucide-react'
import { clsx } from 'clsx'

/**
 * GlassIcon Component - Apple-inspired glass-morphism icon system
 *
 * Design Specifications (Item 81 & 82):
 * - Container: Circle with gradient fill (#0077D9 to #002A86 at 15% opacity)
 * - Background: backdrop-filter: blur(10px)
 * - Border: 1px solid rgba(255,255,255,0.2)
 * - Shadow: 0 4px 12px rgba(0,42,134,0.15)
 * - Icon: White icon centered, 2px stroke weight
 *
 * Sizes:
 * - sm (32px container, 16px icon) - for inline use
 * - md (48px container, 24px icon) - for cards
 * - lg (64px container, 32px icon) - for heroes
 */

export type GlassIconSize = 'sm' | 'md' | 'lg'
export type GlassIconVariant = 'default' | 'light' | 'solid'

interface GlassIconProps {
  icon: LucideIcon
  size?: GlassIconSize
  variant?: GlassIconVariant
  className?: string
  label?: string
}

const sizeConfig = {
  sm: {
    container: 'h-8 w-8',      // 32px
    icon: 'h-4 w-4',          // 16px
  },
  md: {
    container: 'h-12 w-12',    // 48px
    icon: 'h-6 w-6',          // 24px
  },
  lg: {
    container: 'h-16 w-16',    // 64px
    icon: 'h-8 w-8',          // 32px
  },
}

const variantConfig = {
  // Default: Glass effect with gradient background
  default: {
    container: 'bg-gradient-to-br from-brand-bright-blue/15 to-brand-deep-blue/15 backdrop-blur-[10px] border border-white/20 shadow-[0_4px_12px_rgba(0,42,134,0.15)]',
    icon: 'text-white',
  },
  // Light: For use on dark backgrounds (inverted)
  light: {
    container: 'bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-[10px] border border-white/30 shadow-[0_4px_12px_rgba(0,0,0,0.15)]',
    icon: 'text-white',
  },
  // Solid: Filled gradient background for emphasis
  solid: {
    container: 'bg-gradient-to-br from-brand-bright-blue to-brand-deep-blue shadow-[0_4px_12px_rgba(0,42,134,0.25)]',
    icon: 'text-white',
  },
}

export function GlassIcon({
  icon: Icon,
  size = 'md',
  variant = 'default',
  className,
  label,
}: GlassIconProps) {
  const { container: containerSize, icon: iconSize } = sizeConfig[size]
  const { container: containerStyle, icon: iconStyle } = variantConfig[variant]

  return (
    <div
      className={clsx(
        'relative inline-flex items-center justify-center rounded-full',
        containerSize,
        containerStyle,
        className
      )}
      role={label ? 'img' : undefined}
      aria-label={label}
    >
      <Icon
        className={clsx(iconSize, iconStyle)}
        strokeWidth={2}
        aria-hidden="true"
      />
    </div>
  )
}

/**
 * GlassIconWithBadge - Glass icon with optional badge (e.g., step numbers)
 */
interface GlassIconWithBadgeProps extends GlassIconProps {
  badge?: string | number
  badgeColor?: 'red' | 'blue' | 'green'
}

const badgeColorConfig = {
  red: 'bg-brand-red',
  blue: 'bg-brand-bright-blue',
  green: 'bg-green-500',
}

export function GlassIconWithBadge({
  badge,
  badgeColor = 'red',
  ...props
}: GlassIconWithBadgeProps) {
  return (
    <div className="relative inline-flex">
      <GlassIcon {...props} />
      {badge !== undefined && (
        <div
          className={clsx(
            'absolute -top-1 -right-1 flex items-center justify-center rounded-full text-white text-xs font-bold',
            badgeColorConfig[badgeColor],
            props.size === 'lg' ? 'h-6 w-6' : props.size === 'sm' ? 'h-4 w-4 text-[10px]' : 'h-5 w-5'
          )}
        >
          {badge}
        </div>
      )}
    </div>
  )
}

export default GlassIcon
