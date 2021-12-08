import { envIsDefined, envParseString } from '#lib/env/parser'
import { request as fetch } from '@artiefuzzz/lynx'
import type Client from 'lib/Structures/client'
import c from './constants'
import type { Config, FloofyResponse, Post } from './types'

export default async function request(client: Client, options: Config): Promise<any> {
  switch (options.site) {
    case 'e621': {
      if (!options.tags) throw Error('No tags provided')
      const req = await fetch<{ posts: Post[] }>(
        `https://e621.net/posts.json?tags=limit:${options.limit} order:random -young ${options.tags}`
      )
        .headers({
          'User-Agent': `${c.defaults.useragent} [ID: ${client?.id}]`,
          authorization:
            envIsDefined('E621_USER') && envIsDefined('E621_API_KEY')
              ? `Basic ${Buffer.from(
                `${envParseString('E621_USER')}:${envParseString('E621_API_KEY')}`,
                'binary'
              ).toString('base64')}`
              : ''
        })
        .send()

      return req.json
    }
    case 'floofy': {
      const { json: res } = await fetch<FloofyResponse>('https://api.floofy.dev/yiff')
        .headers({
          'User-Agent': c.defaults.useragent
        })
        .send()
      return res
    }

    default: {
      throw Error('Available: e621 and floofy')
    }
  }
}
