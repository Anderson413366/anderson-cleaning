'use client'

import { useEffect } from 'react'

export default function CustomElementsGuard() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.customElements === 'undefined') {
      return
    }

    const registry = window.customElements as CustomElementRegistry & {
      __patched?: boolean
    }

    if (registry.__patched) {
      return
    }

    const originalDefine = registry.define.bind(registry)

    registry.define = (name, constructor, options) => {
      if (registry.get(name)) {
        return
      }
      originalDefine(name, constructor, options)
    }

    registry.__patched = true
  }, [])

  return null
}
