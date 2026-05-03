export interface Partner {
  name: string
  owner: string
  repo: string
  description: string
  status: 'complete' | 'in-progress' | 'planned'
  docPath: string
}
