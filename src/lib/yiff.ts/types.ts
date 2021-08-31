export type Sites = 'e621' | 'floofy'
export interface Config {
  site: Sites
  tags?: string
  limit?: number
}
