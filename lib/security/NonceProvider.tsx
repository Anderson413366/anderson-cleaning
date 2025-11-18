'use client'

import React, { createContext } from 'react'

export const NonceContext = createContext<string | null>(null)

interface NonceProviderProps {
  nonce: string | null
  children: React.ReactNode
}

export function NonceProvider({ nonce, children }: NonceProviderProps) {
  return <NonceContext.Provider value={nonce}>{children}</NonceContext.Provider>
}
