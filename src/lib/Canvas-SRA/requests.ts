import { request as fetch } from '@artiefuzzz/lynx'
import c from './constants'

type Endpoints = 'gay' | 'glass' | 'wasted' | 'passed' | 'jail' | 'comrade' | 'triggered'

export default async function request(endpoint: Endpoints, avatarURL: string): Promise<Buffer> {
  if (!endpoint) throw Error('No Endpoint given')
  if (!avatarURL) throw Error('No avatar provided')

  const { buffer } = await fetch(`${c.url}${endpoint}?avatar=${encodeURIComponent(avatarURL)}`)
    .headers({
      'User-Agent': c.useragent
    })
    .send()

  return buffer
}
