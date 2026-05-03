import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type Props = {
  content: string
}

/**
 * Plain Markdown renderer (not MDX). Curly braces in topics like `{zoneId}` must not be interpreted as JS.
 */
export default function DocMarkdownBody({ content }: Props) {
  return (
    <div className="doc-markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  )
}
