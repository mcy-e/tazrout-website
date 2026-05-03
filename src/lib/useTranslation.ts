import ar from '../../messages/ar.json'
import en from '../../messages/en.json'
import fr from '../../messages/fr.json'
import { useLocale } from '@/components/LocaleProvider'

export type Dictionary = typeof ar

const dictionaries: Record<string, Dictionary> = {
  ar,
  en: en as unknown as Dictionary,
  fr: fr as unknown as Dictionary,
}

export function useTranslation() {
  const locale = useLocale()
  return dictionaries[locale] || dictionaries.ar
}

export { useLocale }
