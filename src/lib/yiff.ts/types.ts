export type Sites = 'e621' | 'floofy'
export interface Config {
  site: Sites
  tags?: string
  limit?: number
}

export interface FloofyResponse {
  height: number
  width: number
  url: string
}

export interface Post {
  id: number
  created_at: string
  updated_at: string
  file: File
  preview: Preview
  sample: Sample
  score: Score
  tags: Tags
  locked_tags: any[]
  change_seq: number
  flags: Flags
  rating: string
  fav_count: number
  sources: string[]
  pools: number[]
  relationships: Relationships
  approver_id: number
  uploader_id: number
  description: string
  comment_count: number
  is_favorited: boolean
  has_notes: boolean
  duration: null
}

interface File {
  width: number
  height: number
  ext: string
  size: number
  md5: string
  url: string
}

interface Flags {
  pending: boolean
  flagged: boolean
  note_locked: boolean
  status_locked: boolean
  rating_locked: boolean
  deleted: boolean
}

interface Preview {
  width: number
  height: number
  url: string
}

interface Relationships {
  parent_id: null
  has_children: boolean
  has_active_children: boolean
  children: number[]
}

interface Sample {
  has: boolean
  height: number
  width: number
  url: string
  alternates: Alternates
}

interface Alternates {}

interface Score {
  up: number
  down: number
  total: number
}

interface Tags {
  general: string[]
  species: string[]
  character: any[]
  copyright: string[]
  artist: string[]
  invalid: any[]
  lore: any[]
  meta: string[]
}
