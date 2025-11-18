'use client'

import { useContext } from 'react'
import { NonceContext } from './NonceProvider'

export function useNonce() {
  const nonce = useContext(NonceContext)
  return nonce || undefined
}
