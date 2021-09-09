import { fetch, FetchMethods, FetchResultTypes } from '@sapphire/fetch'
import c from './corona-fetch/constants'

export default async function Define(search: string): Promise<List> {
  if (!search) throw Error('A search is required')

  const { list }: { list: List[] } = await fetch(
    `https://api.urbandictionary.com/v0/define?term=${search}`,
    {
      method: FetchMethods.Get,
      headers: {
        'User-Agent': c.useragent
      }
    },
    FetchResultTypes.JSON
  )

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
