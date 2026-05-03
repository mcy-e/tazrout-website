import 'server-only'

const dictionaries = {
  ar: () => import('../../messages/ar.json').then((module) => module.default),
  en: () => import('../../messages/en.json').then((module) => module.default),
  fr: () => import('../../messages/fr.json').then((module) => module.default),
}

export const getDictionary = async (locale: 'ar' | 'en' | 'fr') => {
  return dictionaries[locale]?.() ?? dictionaries.ar()
}
