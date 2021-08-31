import { fetch, FetchMethods, FetchResultTypes } from '@sapphire/fetch'
import type Client from 'lib/Structures/client'
import c from './constants'
import type { Config } from './types'
import cfg from '../../config'

export default async function request(client: Client, options: Config): Promise<unknown> {
  switch (options.site) {
    case 'e621': {
      if (!options.limit) throw Error('No tags provided')
      const { posts }: { posts: Record<string, unknown> } = await fetch(
        `https://e621.net/posts.json?tags=limit:${options.limit} order:random -young ${options.tags}`,
        {
          method: FetchMethods.Get,
          headers: {
            'User-Agent': `${c.defaults.useragent} [ID: ${client.id}]`,
            authorization:
              cfg.e621?.username && cfg.e621?.api_key
                ? `Basic ${Buffer.from(`${cfg.e621?.username}:${cfg.e621?.api_key}`, 'binary').toString('base64')}`
                : ''
          }
        },
        FetchResultTypes.JSON
      )
      return posts
    }
    case 'floofy': {
      const res = await fetch(
        'https://api.floofy.dev/yiff',
        {
          method: FetchMethods.Get,
          headers: {
            'User-Agent': c.defaults.useragent
          }
        },
        FetchResultTypes.JSON
      )
      return res
    }
  }
}
