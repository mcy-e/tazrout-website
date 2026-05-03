import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { getDocEntry } from './doc-registry'

const BASE = path.join(process.cwd(), 'content', 'technical-docs')

export type LoadedDoc = {
  /** Markdown/MDX body after optional frontmatter strip */
  content: string
}

export async function loadDocMarkdown(slug: string): Promise<LoadedDoc | null> {
  const entry = getDocEntry(slug)
  if (!entry) return null

  const fullPath = path.join(BASE, entry.file)
  try {
    const raw = await fs.readFile(fullPath, 'utf-8')
    const { content } = matter(raw)
    return { content }
  } catch {
    return null
  }
}
