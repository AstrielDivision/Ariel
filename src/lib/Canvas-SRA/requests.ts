import { fetch, FetchMethods, FetchResultTypes } from '@sapphire/fetch'
import c from './constants'

type Endpoints = 'gay' | 'glass' | 'wasted' | 'passed' | 'jail' | 'comrade' | 'triggered'

export default async function request(endpoint: Endpoints, avatarURL: string): Promise<Buffer> {
  if (!endpoint) throw Error('No Endpoint given')
  if (!avatarURL) throw Error('No avatar provided')

  try {
    const res = await fetch(
      `${c.url}${endpoint}?avatar=${encodeURIComponent(avatarURL)}`,
      {
        method: FetchMethods.Get,
        headers: {
          'User-Agent': c.useragent
        }
      },
      FetchResultTypes.Buffer
    )
    return res
  } catch (err) {
    // @ts-ignore
    throw Error(err.message)
  }
}
