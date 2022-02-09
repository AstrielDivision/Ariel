import { request as fetch } from '@artiefuzzz/lynx'
import { userAgent } from './constants'

export default async function Define(search: string): Promise<List> {
  if (!search) throw Error('A search is required')

  const {
    json: { list }
  } = await fetch<{ list: List[] }>(`https://api.urbandictionary.com/v0/define?term=${search}`)
    .headers({
      'User-Agent': userAgent
    })
    .send()

  return list[0]
}

interface List {
  definition: string
  permalink: string
  thumbs_up: number
  sound_urls: []
  author: string
  word: string
  defid: number
  current_vote: string
  written_on: string
  example: string
  thumbs_down: number
}
