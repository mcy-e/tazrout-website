'use client'

import React, { createContext, useContext } from 'react'

const LocaleContext = createContext<'ar' | 'en' | 'fr'>('ar')

export function LocaleProvider({ children, locale }: { children: React.ReactNode, locale: 'ar' | 'en' | 'fr' }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  return useContext(LocaleContext)
}
